'use strict';

const {readData, saveData, writeData} = require("./dataService");

/**
 * Liste toutes les armes.
 *
 * limit Integer Nombre maximum d'éléments à retourner. (optional)
 * page Integer Nombre d'elements à sauter avant de retourner le resultat. (optional)
 * returns List
 **/
exports.armesGET = function (limit, page) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const armes = valorantData.armes;
      const armeList = armes.map(arme => {
        return {
          id: arme.id,
          links: [
            {
              href: `/armes/${arme.id}/`,
              rel: 'self',
              method: 'GET'
            }
          ]
        };
      });

      resolve(armeList);
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des armes.' });
    }
  });
};

/**
 * Ajoute une nouvelle arme.
 *
 * body Arme (optional)
 * no response value expected for this operation
 **/
exports.armesPOST = function (body) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const armes = valorantData.armes;

      // Génère un nouvel identifiant unique pour l'arme
      const newArmeId = (armes.length + 1).toString();

      // Créé la nouvelle arme avec l'identifiant généré
      const newArme = { id: newArmeId, ...body };

      // Ajoute la nouvelle arme à la liste des armes
      armes.push(newArme);

      // Ecrit les données mises à jour dans le fichier
      saveData(valorantData);

      resolve();
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de l\'ajout de la nouvelle arme.' });
    }
  });
};


/**
 * Supprime une arme en fonction de son identifiant.
 *
 * id String L'identifiant de l'arme.
 * no response value expected for this operation
 **/
exports.armesIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const armes = valorantData.armes;
      const armeIndex = armes.findIndex(arme => arme.id === id);

      if (armeIndex !== -1) {
        // Supprime l'arme avec l'identifiant donné
        armes.splice(armeIndex, 1);
        writeData(valorantData);
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune arme.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la suppression de l\'arme.' });
    }
  });
};

/**
 * Liste les informations d'une arme en fonction de son identifiant.
 *
 * id String L'identifiant de l'arme.
 * returns Arme
 **/
exports.armesIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const arme = valorantData.armes.find(arme => arme.id === id);

      if (arme) {
        const links = [
          {
            href: `/armes/${id}/`,
            rel: 'self',
            method: 'DELETE'
          },
          {
            href: `/armes/${id}/`,
            rel: 'self',
            method: 'PUT'
          },
          {
            href: `/armes/${id}/skins/`,
            rel: 'skins',
            method: 'GET'
          },
          {
            href: `/armes/${id}/skins/`,
            rel: 'skins',
            method: 'PUT'
          }
        ];

        const response = { ...arme, links };
        resolve(response);
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune arme.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des informations de l\'arme.' });
    }
  });
};

/**
 * Met à jour les informations de l'arme.
 *
 * body Arme (optional)
 * id String L'identifiant de l'arme.
 * no response value expected for this operation
 **/
exports.armesIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const armes = valorantData.armes;
      const armeIndex = armes.findIndex(arme => arme.id === id);

      if (armeIndex !== -1) {
        // Met à jour les informations de l'arme avec l'identifiant donné
        armes[armeIndex] = { ...armes[armeIndex], ...body };
        writeData(valorantData);
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune arme.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la mise à jour des informations de l\'arme.' });
    }
  });
};