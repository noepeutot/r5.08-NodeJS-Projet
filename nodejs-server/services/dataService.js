/**
 * Service qui permet de lire et sauvegarder les données du fichier json
 **/

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'valorant.json');

/**
 * Lis les données du fichier JSON
 * @returns {Promise<any>}
 */
exports.readData = async function (limit, page) {
    try {
        const rawData = await fs.readFileSync(dataFilePath);
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Erreur lors de la lecture des données : ', error.message);
        throw error; // Propage l'erreur à l'appelant
    }
}

/**
 * Enregistre les données dans le fichier JSON.
 * @param {Object} data - Les données à enregistrer.
 * @returns {Promise<void>}
 */
exports.writeData = async function (data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFileSync(dataFilePath, jsonData, 'utf8');
        console.log('Données enregistrées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données : ', error.message);
        throw error; // Propage l'erreur à l'appelant
    }
}

/**
 *
 * @param data
 * @returns {Promise<void>}
 */
exports.saveData = async function (data) {
    try {
        const rawData = JSON.stringify(data, null, 2);
        await fs.writeFileSync(dataFilePath, rawData);
        console.log('Données enregistrées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données : ', error.message);
        throw error; // Propage l'erreur à l'appelant
    }
}