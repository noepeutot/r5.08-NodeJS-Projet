'use strict';

const {readData, saveData, writeData} = require("./dataService");

/**
 * Liste tous les skins.
 *
 * limit Integer Nombre maximum d'éléments à retourner. (optional)
 * page Integer Nombre d'elements à sauter avant de retourner le resultat. (optional)
 * returns List
 **/
exports.skinsGET = function (limit, page) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const skins = valorantData.skins;

      const skinList = skins.map(skin => {
        return {
          id: skin.id,
          links: [
            {
              href: `/skins/${skin.id}/`,
              rel: 'self',
              method: 'GET'
            },
          ]
        };
      });

      resolve(skinList);
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des skins.' });
    }
  });
};

/**
 * Ajoute un nouveau skin.
 *
 * body Skin (optional)
 * no response value expected for this operation
 **/
exports.skinsPOST = function (body) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const skins = valorantData.skins;

      // Générez un nouvel identifiant unique pour le nouveau skin (vous pouvez utiliser une bibliothèque comme uuid)
      const newSkinId = (skins.length + 1).toString();

      // Ajoute le nouvel agent avec l'identifiant généré
      const newSkin = { id: newSkinId, ...body };

      skins.push(newSkin);
      saveData(valorantData); // Ecrit les données mises à jour dans le fichier

      resolve();
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de l\'ajout d\'un nouveau skin.' });
    }
  });
};


/**
 * Supprime un skin en fonction de son identifiant.
 *
 * id String L'identifiant du skin.
 * no response value expected for this operation
 **/
exports.skinsIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const skins = valorantData.skins;
      const skinIndex = skins.findIndex(skin => skin.id === id);

      if (skinIndex !== -1) {
        skins.splice(skinIndex, 1);
        writeData(valorantData); // Assurez-vous d'écrire les données mises à jour dans le fichier
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucun skin.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la suppression du skin.' });
    }
  });
};

/**
 * Liste les informations d'un skin en fonction de son identifiant.
 *
 * id String L'identifiant du skin.
 * returns Skin
 **/
exports.skinsIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const skin = valorantData.skins.find(skin => skin.id === id);

      if (skin) {
        const links = [
          {
            href: `/skins/${id}/`,
            rel: 'self',
            method: 'DELETE'
          },
          {
            href: `/skins/${id}/`,
            rel: 'self',
            method: 'PUT'
          }
        ];

        const response = { ...skin, links };
        resolve(response);
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucun skin.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des informations du skin.' });
    }
  });
};

/**
 * Met à jour les informations du skin.
 *
 * body Skin (optional)
 * id String L'identifiant du skin.
 * no response value expected for this operation
 **/
exports.skinsIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const skins = valorantData.skins;
      const skinIndex = skins.findIndex(skin => skin.id === id);

      if (skinIndex !== -1) {
        // Met à jour les informations du skin avec l'identifiant donné
        skins[skinIndex] = { ...skins[skinIndex], ...body };
        writeData(valorantData); // Assurez-vous d'écrire les données mises à jour dans le fichier
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucun skin.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la mise à jour des informations du skin.' });
    }
  });
};

/**
 * Met à jour les skins d'une arme.
 *
 * body Array La liste des identifiants de skins.
 * id String L'identifiant d'une arme.
 * no response value expected for this operation
 **/
exports.armesIdSkinsPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const armes = valorantData.armes;
      const armeIndex = armes.findIndex(arme => arme.id === id);

      if (armeIndex !== -1) {
        // Met à jour la liste des skins de l'arme avec l'identifiant donné
        armes[armeIndex].skins = body;
        writeData(valorantData); // Ecrit les données mises à jour dans le fichier
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune arme.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la mise à jour des skins de l\'arme.' });
    }
  });
};

/**
 * Liste tous les skins d'une arme.
 *
 * limit Integer Nombre maximum d'éléments à retourner. (optional)
 * page Integer Nombre d'elements à sauter avant de retourner le resultat. (optional)
 * id String L'identifiant d'une arme.
 * returns List
 **/
exports.armesIdSkinsGET = function (limit, page, id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const armes = valorantData.armes;
      const arme = armes.find(arme => arme.id === id);

      if (arme) {
        // Vous pouvez appliquer des filtres ici en fonction de limit et page si nécessaire
        const skinList = arme.skins.map(skinId => {
          return {
            id: skinId,
            links: [
              {
                href: `/skins/${skinId}/`,
                rel: 'self',
                method: 'GET'
              }
            ]
          };
        });

        resolve(skinList);
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucune arme.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des skins de l\'arme.' });
    }
  });
};
