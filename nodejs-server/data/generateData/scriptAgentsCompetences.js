const fs = require('fs');

// Charger le JSON depuis un fichier
const rawData = fs.readFileSync('alldataToFilter.json');
const data = JSON.parse(rawData);

// Nouvelles structures pour stocker les données filtrées
const filteredData = {
    agents: [],
    competences: []
};

// Compteur pour générer des IDs
let idCounterAgent = 1;
let idCounterCompetences = 1;

// Parcourir chaque élément dans la liste "data"
data.data.forEach(agent => {
    // Vérifier si la propriété 'role' existe
    const roleDisplayName = agent.role ? agent.role.displayName : null;

    // Extraire les informations nécessaires pour l'agent
    const filteredAgent = {
        id: idCounterAgent.toString(), // ID simplifié pour l'agent
        nom: agent.displayName,
        type: roleDisplayName, // Remplacer 'role' par 'type'
        competences: [] // Remplacer 'abilityIds' par 'competences'
    };

    // Ajouter l'agent filtré à la structure de données des agents
    filteredData.agents.push(filteredAgent);

    // Parcourir chaque ability de l'agent
    agent.abilities.forEach(ability => {
        // Générer un ID unique pour l'ability
        const competenceId = idCounterCompetences.toString(); // ID simplifié pour la compétence

        // Ajouter l'ID de la compétence à la liste associée à l'agent
        filteredAgent.competences.push(competenceId);

        // Extraire les informations nécessaires pour la compétence
        const filteredCompetence = {
            id: competenceId,
            nom: ability.displayName,
            description: ability.description
        };

        // Ajouter la compétence filtrée à la structure de données des compétences
        filteredData.competences.push(filteredCompetence);

        // Incrémenter le compteur d'IDs
        idCounterCompetences++;
    });

    // Incrémenter le compteur d'IDs pour l'agent lui-même
    idCounterAgent++;
});

// Écrire les données filtrées dans un nouveau fichier JSON
fs.writeFileSync('resultat_agents_competences.json', JSON.stringify(filteredData, null, 2));

console.log("Filtrage terminé. Les données filtrées ont été enregistrées dans 'resultat_agents_competences.json'.");