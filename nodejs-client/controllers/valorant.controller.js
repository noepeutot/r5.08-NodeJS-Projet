"use strict";

let valorant = new ValorantModel();
document.addEventListener("DOMContentLoaded", async function () {
    valorant = await valorant.fetchData();
    valorantView.renderData(valorant);
});
