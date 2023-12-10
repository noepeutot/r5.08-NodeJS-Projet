"use strict";

const valorantView = {
    /**
     * Méthode pour afficher les informations du modèle dans la vue
     * @param model
     */
    renderData(model) {
        // Met à jour les éléments HTML avec les données du modèle
        document.getElementById('nom').textContent += model.nom;
        document.getElementById('dateCreation').textContent += model.dateCreation;
        document.getElementById('modeDeJeu').textContent += model.modeDeJeu;
        document.getElementById('editeur').textContent += model.editeur;
        document.getElementById('plateforme').textContent += model.plateforme;

        const linksList = document.getElementById('links-list');
        linksList.innerHTML = ''; // Supprime le contenu précédant

        model.links.forEach(link => {
            // regarde si la méthode est GET
            if (link.method === "GET") {
                // Crée un button pour chaque GET
                const button = document.createElement('button');
                button.textContent = `${link.rel.toUpperCase()}`;

                // Ajoute un eventListener correspondant au fichier associé
                button.addEventListener('click', () => {
                    const htmlFileName = link.href.replace(/\//g, '');
                    window.location.href = `htmls/${htmlFileName}.html`;
                });

                // Crée une liste et pour y ajouter le bouton
                const listItem = document.createElement('li');
                listItem.appendChild(button);
                linksList.appendChild(listItem);
            }
        });
    },

};