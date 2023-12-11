"use strict";

let valorant = new ValorantModel();
document.addEventListener("DOMContentLoaded", async function () {
    await valorant.fetchJoueursData();
    joueursView.renderPlayersList(valorant.getJoueurs());
});

function redirectToPlayerInfoPage(playerId) {
    // Assuming you have a function to handle the redirection
    // Redirect to joueursInfo.html with the playerId in the query string
    window.location.href = `joueurInfos.html?id=${playerId}`;
}