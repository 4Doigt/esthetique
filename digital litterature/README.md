***Poème Fractal Interactif***

Ce projet génère des poèmes aléatoires à partir d’une API de poésie et les dispose sur un canvas de manière fractale et chaotique. Chaque mot est unique, interactif et visuellement distinct grâce à des polices et tailles variées.

Ce projet explore la poésie numérique en donnant vie aux mots : le poème devient un espace interactif et vivant, où l’utilisateur peut déplacer les mots et observer des compositions poétiques imprévisibles.



**Fonctionnalités et points techniques**

- Récupération de poèmes via une API :

Le code utilise fetch pour faire un requête à PoetryDB et récupérer un poème aléatoire.

Toutes les lignes du poème sont combinées en un seul texte pour être traitées par la suite.

- Construction et classification des mots :

La fonction construireMots(texte) transforme le texte en minuscule et supprime la ponctuation.

Les mots sont découpés et classés dans 5 niveaux fractals selon leur longueur (de 4 à 8 lettres), ce qui sert de base pour la génération fractale.

Cette classification permet de créer une structure hiérarchique dans le poème.

- Génération fractale du poème :

La fonction récursive genererFractale(profondeur) choisit un mot au hasard dans le niveau correspondant à la profondeur actuelle.

Le mot est retiré du tableau initial avec splice() pour éviter toute répétition.

Deux appels récursifs sont effectués à chaque niveau pour créer des bifurcations, donnant au poème une structure arborescente.

Cette approche permet d’avoir des poèmes différents à chaque exécution, tout en respectant une certaine cohérence visuelle et structurelle.

- Placement aléatoire des mots sur le canvas :

La fonction construirePositions() attribue à chaque mot une position aléatoire sur le canvas, une police choisie aléatoirement dans une liste de 20 polices et une taille aléatoire.

Cela introduit un effet visuel chaotique, où chaque mot possède une identité unique.

- Interaction avec les mots :

Les mots deviennent interactifs grâce aux fonctions mousePressed(), mouseDragged() et mouseReleased().

Lorsqu’on clique sur un mot, il devient actif (motActif) et suit la position de la souris tant que le clic est maintenu.

Cela permet à l’utilisateur de réarranger librement le poème et d’explorer différentes compositions visuelles.

- Dimension visuelle et vivante :

Chaque mot possède sa propre police, sa taille et sa position, créant un rendu visuel vivant et dynamique.

La combinaison de la génération fractale, des positions aléatoires et des interactions utilisateur transforme le poème en un espace poétique vivant, où les mots semblent animés et capables de se déplacer spontanément.



**Objectif artistique**

Au-delà de la génération chaotique et interactive, le projet cherche à donner vie aux mots.
L’idée est que le poème ne soit pas seulement lu, mais exploré et manipulé par l’utilisateur, créant une expérience immersive où le texte devient vivant et unique à chaque interaction.
