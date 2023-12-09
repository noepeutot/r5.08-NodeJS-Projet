'use strict';

var utils = require('../utils/writer.js');
var Skins = require('../services/SkinsService');

module.exports.armesIdSkinsGET = function armesIdSkinsGET (req, res, next, limit, page, id) {
  Skins.armesIdSkinsGET(limit, page, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.armesIdSkinsPUT = function armesIdSkinsPUT (req, res, next, body, id) {
  Skins.armesIdSkinsPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.skinsGET = function skinsGET (req, res, next, limit, page) {
  Skins.skinsGET(limit, page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.skinsIdDELETE = function skinsIdDELETE (req, res, next, id) {
  Skins.skinsIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.skinsIdGET = function skinsIdGET (req, res, next, id) {
  Skins.skinsIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.skinsIdPUT = function skinsIdPUT (req, res, next, body, id) {
  Skins.skinsIdPUT(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.skinsPOST = function skinsPOST (req, res, next, body) {
  Skins.skinsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
