# Projet : Réalisation d'un serveur REST

## Introduction

Ce projet est un serveur REST sur le jeu Valorant. Ce dernier permet de lister différentes informations.

## Spécification du système

Le système est basé sur ce diagramme de classes. Valorant est la classe mère qui répertorie les informations de base de Valorant. La classe Map possède les cartes dans Valorant. Chaque carte possède des orbes de compétences.
Valorant possède des agents et eux aussi possèdent des compétences.
Il y a les joueurs. Ils ont sélectionné une arme, une carte et un agent.
Chaque arme possède des skins qui lui appartiennent.

![Modele de donnees](img/ModèleDeDonnées.drawio.svg)

### Jeu de données

Les données utilisées sont des données officielles pour les maps, agents, compétences, armes et skins.
Des recherches approfondies ont permis de trouver toutes les informations nécessaires (API, documentations de Valorant, ...)

L'écriture de scripts a permis d'extraire dans les jsons les données pour correspondre à mon diagramme de classe.
Pour raison de simplicité, toutes les données et caractéristiques n'ont pas été ajoutés pour éviter toute complexité et usage de millier de données. Certaines informations ne sont pas 100% précise.
Pour le prix d'un skin, je n'ai pas pu les récupérer. Pour simplifier, j'ai fait générer un nombre en 500 et 3500 par
tranche de 100.

ChatGPT a aidé pour certaines générations d'informations comme pour les joueurs.

## Lancement du serveur

Pour lancer le serveur, se placer dans le repertoire nodejs-server et initialiser node :

```
npm install
```

Lancer le serveur avec la commande suivante :

```
nodemon index.js
```

Accéder à l'interface sur le navigateur sur ce lien :

```
http://localhost:8080/
```

Il est possible de voir la spécification à cette adresse pour se repérer : 

```
http://localhost:8080/docs/
```

Les liens HATEOAS sont aussi réalisés pour savoir quelles méthodes utiliser sur chacune des routes.

### Routes

Comment utiliser les différentes routes et les types des paramètres : 

#### POST - Ajouter
Type de json pour ajouter un nouveau joueur (l'id est automatiquement généré) :
```
{
"pseudo": "pseudo",
"niveau": "1000",
"rank": "Bronze",
"agentSelectionneId": "1",
"mapSelectionneeId": "1",
"armeSelectionneeId": "1"
}
```

Type de json pour ajouter une nouvelle arme (l'id est automatiquement généré) :
```
{
"nom": "nom",
"type": "type",
"prix": 1000,
"skins": ["1", "2"]
}
```

Type de json pour ajouter un nouveau skin (l'id est automatiquement généré) :
```
{
"nom": "nom",
"prix": 3000,
"armeId": "1"
}
```

Type de json pour ajouter un nouveau map (l'id est automatiquement généré) :
```
{
"nom": "nom",
"lieu": "lieu",
"type": "type",
"orbesDeCompetence": ["999", "998"]
}
```
Type de json pour ajouter un nouvel agent (l'id est automatiquement généré) :
```
{
"nom": "nom",
"type": "type",
"competences": ["999", "998", "997", "996"]
}
```
Type de json pour ajouter une nouvelle compétence (l'id est automatiquement généré) :
```
{
"nom": "nom",
"description": "la description"
}
```

#### PUT - Modifier

Il faut juste se placer sur la page d'un object avec son id par exemple :
```http://localhost:8080/agents/1/```

Et pour modifier, on peut simplement changer une partie donc en reprenant ses attributs : id, nom, type, competences.
Si on veut modifier son nom uniquement, on peut mettre uniquement : 

```
{
"nom": "nouveauNom",
}
```

#### DELETE - Supprimer

Pour supprimer, il faut simplement être sur la route avec l'identifiant de notre objet qu'on veut supprimer et c'est tout.

## Lancement du client

/!\ **Pour informations, le client n'est pas entièrement développé.** /!\

Avant d'accèder à l'interface client, il faut avoir préalablement installé l'extension Allow CORS : Access-Control-Allow-Origin qui permet d'activer CORS. Dans le cas contraire, il n'est pas possible de faire fonctionner l'interface.

Extension Google Chrome [ici](https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)

Extension Mozilla Firefox [ici](https://addons.mozilla.org/en-US/firefox/addon/access-control-allow-origin/)
(Malheureusement, elle ne marche pas dans mon cas. Je ne sais pas pourquoi.)

Se placer dans le répertoire nodejs-client, et ouvrer dans le navigateur le fichier index.html avec le Absolute Path.

## Méthodologie suivie

La spécification OpenAPI a été réalisée avant le serveur.
Cela permettait de mettre le cadre global en listant toutes les routes qu'il fallait.
De ce fait, la réalisation du serveur, dont le squelette a été généré par Swagger, a été plus simple comme les
différentes routes ont été préalablement définies.

