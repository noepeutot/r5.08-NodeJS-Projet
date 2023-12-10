"use strict";

class ValorantModel {

    _joueurs = [];
    constructor() {
        this.nom = "";
        this.dateCreation = "";
        this.modeDeJeu = "";
        this.editeur = "";
        this.plateforme = "";
        this.links = [];
    }

    async fetchData() {
        try {
            const response = await fetch('http://localhost:8080/');
            const data = await response.json();

            // Assign data to model attributes
            this.nom = data.nom;
            this.dateCreation = data.dateCreation;
            this.modeDeJeu = data.modeDeJeu;
            this.editeur = data.editeur;
            this.plateforme = data.plateforme;
            this.links = data.links;

            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    /**
     * Méthode pour récupérer les données des joueurs
     * @returns {Promise<void>}
     */
    async fetchJoueursData() {
        try {
            const joueursData = await fetch('http://localhost:8080/joueurs/');
            this._joueurs = await joueursData.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }

    }

    /**
     * Retourne une liste de joueurs
     * @returns {[]}
     */
    get joueurs() {
        return this._joueurs;
    }
}