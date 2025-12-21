Rapport de Projet Web : Find Your Anime

Objectif:

Nous avons voulu concevoir un site web responsive permettant d'explorer l'univers de l'animation japonaise. 
Le site propose deux fonctionnalités principales : consulter les tendances du moments et découvrir un anime au hasard.

Choix de l'API:
Nous avons choisi d'utiliser Jikan API, qui est une version publique de la base de données MyAnimeList.

Pourquoi ? ---> Elle est gratuite, ne nécessite pas de clé d'API et fournit des données très complètes (images, synopsis, genres, rank).

On interroge deux "endpoints" : /top/anime pour le classement et /random/anime pour la fonction "Surprends-moi".

Au début du projet, tout le code était dans un seul fichier. C'est vite devenu difficile à lire et à corriger. Nous avons donc décidé de séparé le code en plusieurs fichiers, rangés dans un dossier js/ :

api.js : Ce fichier contient uniquement la configuration de base (l'URL de JikanAPI). C'est pratique car si l'URL change, on ne la modifie qu'à un seul endroit.

top.js et random.js : Nous avons séparé la logique : un fichier gère la boucle de création de la liste des tendances, l'autre gère l'affichage unique du résultat aléatoire.

script.js : Notre fichier principal. Il détecte sur quelle page l'utilisateur se trouve et lance les fonctions  depuis les autres fichiers.

Cette organisation nous as permis de mieux nous y retrouver et d'éviter que le code de la page "Top" ne s'exécute par erreur sur la page "Random".

Difficultés rencontrées :

Creation des AnimeCard:

La partie la plus complexe en JavaScript a été la creation des cartes d'animes. Nous avons decidé d'utiliser document.createElement(). Il fallait bien faire attention. Pour la liste des genres par exemple, nous avons dû imbriquer une boucle forEach à l'intérieur de la création de la carte principale, ce qui demandait une bonne logique pour ne pas mélanger les éléments.

Les données manquantes : L'API ne renvoie pas toujours toutes les infos. Nous avons dû ajouter des conditions pour gérer les cas où le score ou le nombre d'épisodes est inconnu, afin d'éviter d'afficher "undefined". Nous avons égalément ajouté un sfw car l'API générait des contenues explicites.

Responsive et CSS:

Rendre le site responsive sur telephone et pc a été un peu chronophage.

Difficultés rencontrées :

L'alignement des cartes : Sur la page "Tendances", les titres des animes n'ont pas tous la même longueur. Au début, cela décalait toutes les cartes. Nous avons donc fixé des hauteurs et utiliseé Flexbox pour que tout reste aligné proprement.

Sur PC, les cartes sont en ligne  avec flex-direction: row. Sur telephone, nous avons dû basculer en column et adapter la taille des images avec scale-down pour qu'elles ne soient ni trop grandes, ni trop petites.

Ce projet a été super enrichissant et nous a permis de façonner et personnaliser notre propre site web en manipulant une API.

Romeo & Romana 
TD1