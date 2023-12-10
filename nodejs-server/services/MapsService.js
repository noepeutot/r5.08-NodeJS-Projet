'use strict';

const {readData, saveData, writeData} = require("./dataService");

/**
 * Liste toutes les maps.
 *
 * limit Integer Nombre maximum d'éléments à retourner. (optional)
 * page Integer Nombre d'elements à sauter avant de retourner le resultat. (optional)
 * returns List
 **/
exports.mapsGET = function (limit, page) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const maps = valorantData.maps;

      // Appliquez des filtres ici en fonction de limit et page si nécessaire

      const mapList = maps.map(map => {
        return {
          id: map.id,
          links: [
            {
              href: `/maps/${map.id}/`,
              rel: 'self',
              method: 'GET'
            }
          ]
        };
      });

      resolve(mapList);
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des maps.' });
    }
  });
};

/**
 * Ajoute une nouvelle map.
 *
 * body Map (optional)
 * no response value expected for this operation
 **/
exports.mapsPOST = function (body) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const maps = valorantData.maps;
      // Génère un nouvel identifiant unique pour l'agent
      const newMapId = (maps.length + 1).toString();

      // Ajoute le nouvel agent avec l'identifiant généré
      const newMap = { id: newMapId, ...body };

      maps.push(newMap);
      saveData(valorantData); // Ecrit les données mises à jour dans le fichier

      resolve();
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de l\'ajout d\'une nouvelle map.' });
    }
  });
};
/**
 * Supprime une map en fonction de son identifiant.
 *
 * id String L'identifiant de la map.
 * no response value expected for this operation
 **/
exports.mapsIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const maps = valorantData.maps;
      const mapIndex = maps.findIndex(map => map.id === id);

      if (mapIndex !== -1) {
        // Supprime la map avec l'identifiant donné
        maps.splice(mapIndex, 1);
        writeData(valorantData); // Assurez-vous d'écrire les données mises à jour dans le fichier
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune map.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la suppression de la map.' });
    }
  });
};

/**
 * Liste les informations d'une map en fonction de son identifiant.
 *
 * id String L'identifiant de la map.
 * returns Map
 **/
exports.mapsIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const map = valorantData.maps.find(map => map.id === id);

      if (map) {
        const links = [
          {
            href: `/maps/${id}/`,
            rel: 'self',
            method: 'DELETE'
          },
          {
            href: `/maps/${id}/`,
            rel: 'self',
            method: 'PUT'
          },
          {
            href: `/maps/${id}/orbes_competence/`,
            rel: 'competences',
            method: 'GET'
          },
          {
            href: `/maps/${id}/orbes_competence/`,
            rel: 'competences',
            method: 'PUT'
          }
        ];

        const response = { ...map, links };
        resolve(response);
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune map.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des informations de la map.' });
    }
  });
};

/**
 * Met à jour les informations de la map.
 *
 * body Map (optional)
 * id String L'identifiant de la map.
 * no response value expected for this operation
 **/
exports.mapsIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const maps = valorantData.maps;
      const mapIndex = maps.findIndex(map => map.id === id);

      if (mapIndex !== -1) {
        // Met à jour les informations de la map avec l'identifiant donné
        maps[mapIndex] = { ...maps[mapIndex], ...body };
        writeData(valorantData); // Assurez-vous d'écrire les données mises à jour dans le fichier
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune map.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la mise à jour des informations de la map.' });
    }
  });
};

/**
 * Liste tous les orbes de compétence d'une map en fonction de son identifiant.
 *
 * id String L'identifiant de la map.
 * returns List
 **/
exports.mapsIdOrbes_competenceGET = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const map = valorantData.maps.find(map => map.id === id);

      if (map) {
        const orbesCompetence = map.orbesDeCompetence || [];

        const orbesCompetenceList = orbesCompetence.map(orbeId => {
          return {
            id: orbeId,
            links: [
              {
                href: `/competences/${orbeId}/`,
                rel: 'competences',
                method: 'GET'
              }
            ]
          };
        });

        resolve(orbesCompetenceList);
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune map.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des orbes de compétence de la map.' });
    }
  });
}

/**
 * Met à jour les orbes de compétence d'une map en fonction de son identifiant.
 *
 * body List (optional)
 * id String L'identifiant de la map.
 * no response value expected for this operation
 **/
exports.mapsIdOrbes_competencePUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const maps = valorantData.maps;
      const mapIndex = maps.findIndex(map => map.id === id);

      if (mapIndex !== -1) {
        // Met à jour les orbes de compétence de la map avec l'identifiant donné
        maps[mapIndex].orbesDeCompetence = body;
        writeData(valorantData); // Assurez-vous d'écrire les données mises à jour dans le fichier
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune map.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la mise à jour des orbes de compétence de la map.' });
    }
  });
}
