'use strict';

const {readData, saveData, writeData} = require("./dataService");

/**
 * Liste tous les joueurs.
 *
 * limit Integer Nombre maximum d'éléments à retourner. (optional)
 * page Integer Nombre d'elements à sauter avant de retourner le resultat. (optional)
 * returns List
 **/
exports.joueursGET = function (limit, page) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const players = valorantData.joueurs;
      const playerList = players.map(player => {
        return {
          id: player.id,
          links: [
            {
              href: `/joueurs/${player.id}/`,
              rel: 'joueurs',
              method: 'GET'
            }
          ]
        };
      });
      resolve(playerList);
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des joueurs.' });
    }
  });
};

/**
 * Supprime un joueur en fonction de son identifiant.
 *
 * id String L'identifiant du joueur.
 * no response value expected for this operation
 **/
exports.joueursIdDELETE = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const players = valorantData.joueurs;
      const playerIndex = players.findIndex(player => player.id === id);

      if (playerIndex !== -1) {
        // Supprime le joueur avec l'identifiant donné
        players.splice(playerIndex, 1);
        // Met à jour le fichier de données avec les modifications
        writeData(valorantData);
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucun joueur.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la suppression du joueur.' });
    }
  });
};

/**
 * Liste les informations d'un joueur en fonction de son identifiant.
 *
 * id String L'identifiant du joueur.
 * returns Joueur
 **/
exports.joueursIdGET = function (id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const player = valorantData.joueurs.find(player => player.id === id);

      if (player) {
        const links = [
          {
            href: `/joueurs/${id}/`,
            rel: 'self',
            method: 'DELETE'
          },
          {
            href: `/joueurs/${id}/`,
            rel: 'self',
            method: 'PUT'
          },
        ];

        const response = { ...player, links };
        resolve(response);
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucun joueur.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la récupération des informations du joueur.' });
    }
  });
};

/**
 * Met à jour les informations du joueur.
 *
 * body Joueur (optional)
 * id String L'identifiant du joueur.
 * no response value expected for this operation
 **/
exports.joueursIdPUT = function (body, id) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const players = valorantData.joueurs;
      const playerIndex = players.findIndex(player => player.id === id);

      if (playerIndex !== -1) {
        // Met à jour les informations du joueur avec l'identifiant donné
        players[playerIndex] = { ...players[playerIndex], ...body };
        writeData(valorantData); // Ecrit les données mises à jour dans le fichier
        resolve();
      } else {
        reject({ statusCode: 404, message: 'L\'identifiant ne correspond à aucun joueur.' });
      }
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de la mise à jour des informations du joueur.' });
    }
  });
};

/**
 * Ajoute un nouveau joueur.
 *
 * body Joueur (optional)
 * no response value expected for this operation
 **/
exports.joueursPOST = function (body) {
  return new Promise(function (resolve, reject) {
    try {
      const valorantData = readData();
      const players = valorantData.joueurs;

      // Génère un nouvel identifiant unique pour le joueur
      const newPlayerId = (players.length + 1).toString();

      // Crée un nouveau joueur avec l'identifiant généré et les données fournies
      const newPlayer = { id: newPlayerId, ...body };

      // Ajoute le nouveau joueur à la liste
      players.push(newPlayer);

      // Enregistre les données mises à jour dans le fichier
      saveData(valorantData);

      resolve();
    } catch (error) {
      reject({ statusCode: 500, message: 'Erreur lors de l\'ajout du nouveau joueur.' });
    }
  });
};


