"use strict";

const joueursView = {
    renderPlayersList(players) {
        const playersList = document.getElementById('players-list');
        playersList.innerHTML = ''; // Clear previous content

        // Check if players is an array before using forEach
        if (Array.isArray(players)) {
            players.forEach(player => {
                // Create a link for each player with a button inside
                const link = document.createElement('a');
                link.href = '#'; // Set a placeholder href

                const button = document.createElement('button');
                button.textContent = `Joueur - ${player.id}`;

                // Add a click event listener to capture the click and redirect
                button.addEventListener('click', function () {
                    // Assuming you have a function to handle the redirection
                    redirectToPlayerInfoPage(player.id);
                });

                // Append the button to the link
                link.appendChild(button);

                // Append the link to the list
                playersList.appendChild(link);
            });
        } else {
            // Handle the case where players is not an array
            console.error("Error: Players data is not in the expected format.");
        }
    },
};