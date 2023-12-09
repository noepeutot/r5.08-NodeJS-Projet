'use strict';

const utils = require('../utils/writer.js');
const Maps = require('../services/MapsService');

module.exports.mapsGET = function mapsGET (req, res, next, limit, page) {
  Maps.mapsGET(limit, page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.mapsIdDELETE = function mapsIdDELETE (req, res, next, id) {
  Maps.mapsIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.mapsIdGET = function mapsIdGET (req, res, next, id) {
  Maps.mapsIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.mapsIdOrbes_competenceGET = function mapsIdOrbes_competenceGET (req, res, next, id) {
  Maps.mapsIdOrbes_competenceGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.mapsIdOrbes_competencePUT = function mapsIdOrbes_competencePUT (req, res, next, body, id) {
  Maps.mapsIdOrbes_competencePUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.mapsIdPUT = function mapsIdPUT (req, res, next, body, id) {
  Maps.mapsIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.mapsPOST = function mapsPOST (req, res, next, body) {
  Maps.mapsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
