"use strict";

const joueursInfosView = {
    renderPlayerInfo(player) {
        document.getElementById('player-id').textContent = `ID: ${player.id}`;
        document.getElementById('player-pseudo').textContent = `Pseudo: ${player.pseudo}`;
        document.getElementById('player-niveau').textContent = `Niveau: ${player.niveau}`;
        document.getElementById('player-rank').textContent = `Rank: ${player.rank}`;
        document.getElementById('agent-selectionne').textContent = `Agent sélectionné: ${player.agentSelectionneId}`;
        document.getElementById('map-selectionnee').textContent = `Map sélectionnée: ${player.mapSelectionneeId}`;
        document.getElementById('arme-selectionnee').textContent = `Arme sélectionnée: ${player.armeSelectionneeId}`;
    },
};
