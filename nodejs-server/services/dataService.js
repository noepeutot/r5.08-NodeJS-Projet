// service/dataService.js
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'valorant.json');

/**
 * Lis les données du fichier JSON
 * @returns {any}
 */
function readData() {
    const rawData = fs.readFileSync(dataFilePath);
    return JSON.parse(rawData);
}

/**
 * Enregistre les données dans le fichier JSON.
 * @param {Object} data - Les données à enregistrer.
 */
function writeData(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(dataFilePath, jsonData, 'utf8');
        console.log('Données enregistrées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données :', error.message);
    }
}

function saveData(data) {
    const rawData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataFilePath, rawData);
}


module.exports = {
    readData,
    writeData,
    saveData
};