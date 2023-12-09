'use strict';

const utils = require('../utils/writer.js');
const Joueurs = require('../services/JoueursService');

// Utilitaire pour gérer les réponses
function handleResponse(res, promise) {
    promise
        .then(response => utils.writeJson(res, response))
        .catch(response => utils.writeJson(res, response));
}

// Liste tous les joueurs
module.exports.joueursGET = function joueursGET(req, res, next, limit, page) {
    handleResponse(res, Joueurs.joueursGET(limit, page));
};

// Supprime un joueur en fonction de son identifiant
module.exports.joueursIdDELETE = function joueursIdDELETE(req, res, next, id) {
    handleResponse(res, Joueurs.joueursIdDELETE(id));
};

// Liste les informations d'un joueur en fonction de son identifiant
module.exports.joueursIdGET = function joueursIdGET(req, res, next, id) {
    handleResponse(res, Joueurs.joueursIdGET(id));
};

// Met à jour les informations du joueur
module.exports.joueursIdPUT = function joueursIdPUT(req, res, next, body, id) {
    handleResponse(res, Joueurs.joueursIdPUT(body, id));
};

// Ajoute un nouveau joueur
module.exports.joueursPOST = function joueursPOST(req, res, next, body) {
    handleResponse(res, Joueurs.joueursPOST(body));
};
