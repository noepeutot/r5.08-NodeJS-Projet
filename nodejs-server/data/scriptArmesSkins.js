/**
 *
 * Script Js pour générer le json concernant les armes et les skins.
 *
 **/

const fs = require('fs');

// Charger le fichier JSON
const allData = JSON.parse(fs.readFileSync('otherAllData.json'));

// Nouvelle structure pour stocker les données filtrées des armes et des skins
const filteredData = {
    armes: [],
    skins: []
};

// Prix de chacunes des armes
const armesPrix = [
    {"nom": "Classic", "prix": 0},
    {"nom": "Shorty", "prix": 200},
    {"nom": "Frenzy", "prix": 500},
    {"nom": "Ghost", "prix": 500},
    {"nom": "Sheriff", "prix": 900},
    {"nom": "Stinger", "prix": 1100},
    {"nom": "Spectre", "prix": 1600},
    {"nom": "Bulldog", "prix": 2100},
    {"nom": "Bucky", "prix": 900},
    {"nom": "Guardian", "prix": 2400},
    {"nom": "Phantom", "prix": 2900},
    {"nom": "Vandal", "prix": 2900},
    {"nom": "Marshal", "prix": 1000},
    {"nom": "Operator", "prix": 4500},
    {"nom": "Ares", "prix": 1600},
    {"nom": "Odin", "prix": 3200},
];

// Compteur pour les identifiants séquentiels
let weaponIDCounter = 1;
let skinIDCounter = 1;

/**
 * Fonction pour obtenir le type d'une arme
 * @param weaponName
 * @returns {string}
 */
function getWeaponType(weaponName) {
    const sidearmList = ["Classic", "Shorty", "Frenzy", "Ghost", "Sheriff"];
    const smgList = ["Stinger", "Spectre"];
    const shotgunList = ["Bucky", "Judge"];
    const rifleList = ["Bulldog", "Guardian", "Phantom", "Vandal"];
    const sniperList = ["Marshal", "Operator"];
    const machineGunList = ["Ares", "Odin"];

    if (sidearmList.includes(weaponName)) return "Sidearm";
    if (smgList.includes(weaponName)) return "SMG";
    if (shotgunList.includes(weaponName)) return "Shotgun";
    if (rifleList.includes(weaponName)) return "Rifle";
    if (sniperList.includes(weaponName)) return "Sniper Rifle";
    if (machineGunList.includes(weaponName)) return "Machine Gun";

    return "Unknown";
}

// Parcourir chaque arme dans la liste "Equips"
allData.Equips.forEach(weapon => {
    // Extraire les informations nécessaires pour l'arme
    const filteredWeapon = {
        id: weaponIDCounter.toString(), // ID séquentiel
        nom: weapon.nom,
        type: getWeaponType(weapon.nom),
        prix: weapon.cost,
        skins: [] // Tableau pour stocker les identifiants de skins associés
    };

    // Parcourir chaque skin pour trouver ceux associés à l'arme actuelle
    allData.Skins.forEach(skin => {
        if (skin.nom.includes(filteredWeapon.nom)) {
            // Générer un prix aléatoire par tranche de 100 entre 500 et 3500
            const randomPrice = Math.floor(Math.random() * 31) * 100 + 500;

            // Ajouter l'identifiant du skin à la liste des skins de l'arme
            const filteredSkin = {
                id: skinIDCounter.toString(), // ID séquentiel pour le skin
                nom: skin.nom,
                prix: randomPrice, // Prix aléatoire
                armeId: filteredWeapon.id // ID de l'arme correspondante
            };
            // Ajouter le skin filtré à la structure de données des skins
            filteredData.skins.push(filteredSkin);
            // Ajouter l'identifiant du skin à la liste des skins de l'arme
            filteredWeapon.skins.push(filteredSkin.id);
            // Incrémenter le compteur des identifiants de skins
            skinIDCounter++;
        }
    });

    // Ajouter l'arme filtrée à la structure de données des armes
    filteredData.armes.push(filteredWeapon);
    // Incrémenter le compteur des identifiants d'armes
    weaponIDCounter++;
});

// Parcourir chaque arme filtrée
filteredData.armes.forEach(filteredWeapon => {
    // Trouver l'arme correspondante dans le nouveau JSON
    const weaponPriceInfo = armesPrix.find(weapon => weapon.nom === filteredWeapon.nom);

    if (weaponPriceInfo) {
        // Ajouter le prix à l'arme filtrée
        filteredWeapon.prix = weaponPriceInfo.prix;
    }
});

// Écrire les données filtrées des armes et des skins dans un nouveau fichier JSON
fs.writeFileSync('resultat_armes_skins.json', JSON.stringify(filteredData, null, 2));


console.log("Filtrage terminé. Les données filtrées des armes avec les identifiants de skins associés ont été enregistrées dans 'resultat_armes_skins.json'.");