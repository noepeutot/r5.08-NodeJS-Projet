'use strict';

const {readData, saveData, writeData} = require("./dataService");

/**
 * Liste tous les agents.
 *
 * limit Integer Nombre maximum d'éléments à retourner. (optional)
 * page Integer Nombre d'elements à sauter avant de retourner le resultat. (optional)
 * returns List
 **/
exports.agentsGET = function (limit, page) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const agents = valorantData.agents;
      const agentList = agents.map(agent => {
        return {
          id: agent.id,
          links: [
            {
              href: `/agents/${agent.id}/`,
              rel: 'agents',
              method: 'GET'
            }
          ]
        };
      });
      resolve(agentList);
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des agents.' });
    }
  });
};

/**
 * Ajoute un nouvel agent.
 *
 * body Agent (optional)
 * no response value expected for this operation
 **/
exports.agentsPOST = function (body) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const agents = valorantData.agents;

      // Génère un nouvel identifiant unique pour l'agent
      const newAgentId = (agents.length + 1).toString();

      // Ajoute le nouvel agent avec l'identifiant généré
      const newAgent = { id: newAgentId, ...body };
      agents.push(newAgent);
      saveData(valorantData); // Ecrit les données mises à jour dans le fichier

      resolve();
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de l\'ajout du nouvel agent.' });
    }
  });
};

/**
 * Supprime un agent en fonction de son identifiant.
 *
 * id String L'identifiant de l'agent.
 * no response value expected for this operation
 **/
exports.agentsIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const agents = valorantData.agents;
      const agentIndex = agents.findIndex(agent => agent.id === id);

      if (agentIndex !== -1) {
        // Supprime l'agent avec l'identifiant donné
        agents.splice(agentIndex, 1);
        writeData(valorantData); // Ecrit les données mises à jour dans le fichier
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucun agent.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la suppression de l\'agent.' });
    }
  });
};

/**
 * Liste les informations d'un agent en fonction de son identifiant.
 *
 * id String L'identifiant de l'agent.
 * returns Agent
 **/
exports.agentsIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const agent = valorantData.agents.find(agent => agent.id === id);

      if (agent) {
        const links = [
          {
            href: `/agents/${id}/`,
            rel: 'self',
            method: 'DELETE'
          },
          {
            href: `/agents/${id}/`,
            rel: 'self',
            method: 'PUT'
          },
          {
            href: `/agents/${id}/competences/`,
            rel: 'competences',
            method: 'GET'
          },
          {
            href: `/agents/${id}/competences/`,
            rel: 'competences',
            method: 'PUT'
          },
        ];

        const response = { ...agent, links };
        resolve(response);
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucun agent.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des informations de l\'agent.' });
    }
  });
};

/**
 * Met à jour les informations de l'agent.
 *
 * body Agent (optional)
 * id String L'identifiant de l'agent.
 * no response value expected for this operation
 **/
exports.agentsIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const agents = valorantData.agents;
      const agentIndex = agents.findIndex(agent => agent.id === id);

      if (agentIndex !== -1) {
        // Met à jour les informations de l'agent avec l'identifiant donné
        agents[agentIndex] = { ...agents[agentIndex], ...body };
        writeData(valorantData); // Ecrit les données mises à jour dans le fichier
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucun agent.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la mise à jour des informations de l\'agent.' });
    }
  });
};

/**
 * Met à jour les compétences d'un agent en fonction de son identifiant.
 *
 * body Array Une collection d'identifiants de compétences.
 * id String L'identifiant de l'agent.
 * no response value expected for this operation
 **/
exports.agentsIdCompetencesPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const agents = valorantData.agents;
      const agentIndex = agents.findIndex(agent => agent.id === id);

      if (agentIndex !== -1) {
        // Met à jour les compétences de l'agent avec l'identifiant donné
        agents[agentIndex].competences = body;
        writeData(valorantData); // Ecrit les données mises à jour dans le fichier
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucun agent.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la mise à jour des compétences de l\'agent.' });
    }
  });
};

/**
 * Liste les compétences d'un agent en fonction de son identifiant.
 *
 * id String L'identifiant de l'agent.
 * returns List
 **/
exports.agentsIdCompetencesGET = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const agent = valorantData.agents.find(agent => agent.id === id);

      if (agent) {
        const competences = agent.competences || [];

        // Ajoute des liens aux compétences
        const competenceList = competences.map(competenceId => {
          return {
            id: competenceId,
            links: [
              {
                href: `/competences/${competenceId}/`,
                rel: 'competences',
                method: 'GET'
              }
            ]
          };
        });

        resolve(competenceList);
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucun agent.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des compétences de l\'agent.' });
    }
  });
};