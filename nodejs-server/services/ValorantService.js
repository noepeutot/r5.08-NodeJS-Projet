'use strict';

const {readData, saveData, writeData} = require("./dataService");

/**
 * Liste les informations de Valorant
 *
 * return List
 */
exports.rootGET = function () {
  return new Promise(async function (resolve, reject) {
    try {
      const valorantData = await readData();
      const ValoInformations = valorantData.informations;

      if (ValoInformations) {
        const links = [
          {
            href: '/joueurs/',
            rel: 'joueurs',
            method: 'GET'
          },
          {
            href: '/joueurs/',
            rel: 'joueurs',
            method: 'PUT'
          },
          {
            href: '/armes/',
            rel: 'armes',
            method: 'GET'
          },
          {
            href: '/armes/',
            rel: 'armes',
            method: 'PUT'
          },
          {
            href: '/skins/',
            rel: 'skins',
            method: 'GET'
          },
          {
            href: '/skins/',
            rel: 'skins',
            method: 'PUT'
          },
          {
            href: '/maps/',
            rel: 'maps',
            method: 'GET'
          },
          {
            href: '/maps/',
            rel: 'maps',
            method: 'PUT'
          },
          {
            href: '/agents/',
            rel: 'agents',
            method: 'GET'
          },
          {
            href: '/agents/',
            rel: 'agents',
            method: 'PUT'
          },
          {
            href: '/competences/',
            rel: 'competences',
            method: 'GET'
          },
          {
            href: '/competences/',
            rel: 'competences',
            method: 'PUT'
          }
        ];

        const response = {...ValoInformations, links};
        resolve(response);
      } else {
        reject({statusCode: 404, message: 'Aucune information sur Valorant a été trouvé.'});
      }
    } catch (error) {
      reject({statusCode: 500, message: 'Erreur lors de la récupération des informations de Valorant.'});
    }
  });
};