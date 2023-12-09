'use strict';

var utils = require('../utils/writer.js');
var Competences = require('../services/CompetencesService');

module.exports.competencesGET = function competencesGET (req, res, next, limit, page) {
  Competences.competencesGET(limit, page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.competencesIdDELETE = function competencesIdDELETE (req, res, next, id) {
  Competences.competencesIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.competencesIdGET = function competencesIdGET (req, res, next, id) {
  Competences.competencesIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.competencesIdPUT = function competencesIdPUT (req, res, next, body, id) {
  Competences.competencesIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.competencesPOST = function competencesPOST (req, res, next, body) {
  Competences.competencesPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
