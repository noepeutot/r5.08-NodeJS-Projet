'use strict';

const {readData, saveData, writeData} = require("./dataService");
/**
 * Liste toutes les compétences.
 *
 * limit Integer Nombre maximum d'éléments à retourner. (optional)
 * page Integer Nombre d'elements à sauter avant de retourner le resultat. (optional)
 * returns List
 **/
exports.competencesGET = function (limit, page) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const competences = valorantData.competences;

      const competenceList = competences.map(competence => {
        return {
          id: competence.id,
          links: [
            {
              href: `/competences/${competence.id}/`,
              rel: 'self',
              method: 'GET'
            },
          ]
        };
      });

      resolve(competenceList);
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des compétences.' });
    }
  });
};

/**
 * Supprime une compétence en fonction de son identifiant.
 *
 * id String L'identifiant de la compétence.
 * no response value expected for this operation
 **/
exports.competencesIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const competences = valorantData.competences;
      const competenceIndex = competences.findIndex(competence => competence.id === id);

      if (competenceIndex !== -1) {
        competences.splice(competenceIndex, 1);
        writeData(valorantData);
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune compétence.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la suppression de la compétence.' });
    }
  });
};

/**
 * Liste les informations d'une compétence en fonction de son identifiant.
 *
 * id String L'identifiant de la compétence.
 * returns Competence
 **/
exports.competencesIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const competence = valorantData.competences.find(competence => competence.id === id);

      if (competence) {
        const links = [
          {
            href: `/competences/${id}/`,
            rel: 'self',
            method: 'DELETE'
          },
          {
            href: `/competences/${id}/`,
            rel: 'self',
            method: 'PUT'
          }
        ];

        const response = {
          ...competence,
          links
        };
        resolve(response);
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune compétence.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des informations de la compétence.' });
    }
  });
};

/**
 * Met à jour les informations de la compétence.
 *
 * body Competence (optional)
 * id String L'identifiant de la compétence.
 * no response value expected for this operation
 **/
exports.competencesIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const competences = valorantData.competences;
      const competenceIndex = competences.findIndex(competence => competence.id === id);

      if (competenceIndex !== -1) {
        competences[competenceIndex] = { ...competences[competenceIndex], ...body };
        writeData(valorantData);
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune compétence.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la mise à jour des informations de la compétence.' });
    }
  });
};

/**
 * Ajoute une nouvelle compétence.
 *
 * body Competence (optional)
 * no response value expected for this operation
 **/
exports.competencesPOST = function (body) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const competences = valorantData.competences;

      // Génère un nouvel identifiant unique pour la compétence
      const newCompetencetId = (competences.length + 1).toString();

      // Ajoute le nouvel agent avec l'identifiant généré
      const newCompetence = { id: newCompetencetId, ...body };
      competences.push(newCompetence);
      saveData(valorantData); // Ecrit les données mises à jour dans le fichier

      resolve();
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de l\'ajout d\'une nouvelle compétence.' });
    }
  });
};
