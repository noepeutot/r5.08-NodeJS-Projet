"use strict";

let valorant = new ValorantModel();

document.addEventListener("DOMContentLoaded", async function () {
    // Extract player ID from the query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playerId = urlParams.get('id');
    await valorant.fetchPlayerData(playerId);

    // Render player information using the view
    joueursInfosView.renderPlayerInfo(valorant.getJoueur());
});
