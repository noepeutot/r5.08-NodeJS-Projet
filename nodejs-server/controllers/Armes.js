'use strict';

var utils = require('../utils/writer.js');
var Armes = require('../services/ArmesService');

module.exports.armesGET = function armesGET (req, res, next, limit, page) {
  Armes.armesGET(limit, page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.armesIdDELETE = function armesIdDELETE (req, res, next, id) {
  Armes.armesIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.armesIdGET = function armesIdGET (req, res, next, id) {
  Armes.armesIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.armesIdPUT = function armesIdPUT (req, res, next, body, id) {
  Armes.armesIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.armesPOST = function armesPOST (req, res, next, body) {
  Armes.armesPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
