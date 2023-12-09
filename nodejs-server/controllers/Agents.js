'use strict';

const utils = require('../utils/writer.js');
const Agents = require('../services/AgentsService');

module.exports.agentsGET = function agentsGET (req, res, next, limit, page) {
    Agents.agentsGET(limit, page)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.agentsIdCompetencesGET = function agentsIdCompetencesGET (req, res, next, id) {
    Agents.agentsIdCompetencesGET(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.agentsIdCompetencesPUT = function agentsIdCompetencesPUT (req, res, next, body, id) {
    Agents.agentsIdCompetencesPUT(body, id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.agentsIdDELETE = function agentsIdDELETE (req, res, next, id) {
    Agents.agentsIdDELETE(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.agentsIdGET = function agentsIdGET (req, res, next, id) {
    Agents.agentsIdGET(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.agentsIdPUT = function agentsIdPUT (req, res, next, body, id) {
    Agents.agentsIdPUT(body, id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.agentsPOST = function agentsPOST (req, res, next, body) {
    Agents.agentsPOST(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
