'use strict';

const utils = require('../utils/writer.js');
const Valorant = require('../services/ValorantService');

module.exports.rootGET = function rootGET (req, res, next) {
  Valorant.rootGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
