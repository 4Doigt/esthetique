Dans cette oeuvre, une traînée aléatoire de figure à paramètres aléatoires suit le curseur de la souris à travers une environnement noir. 
Les couleurs des figures sont choisis aléatoirement parmis une palette de couleur soft et la fréquence d'apparition des figures est limitée pour une expérience utilisateur plus douce et agréable.

Pour expliquer ce code il faut revenir sur plusieurs points clés : 

- Utilisation de la fonction draw pour l'animation :

  Le code utilise la fonction draw pour permettre une animation en continue d'environ 60 fps qu'on limitera dans setup() à 10 avec frameRate(10) comme expliqué plus haut.

- Création de l'effet de traînée :

  Dans le code, fill(0,30) va définir la couleur de remplissage du rectangle rect(0,0,width,height)( qui définit le background ).
  La couleur sera donc noire ( le 0 représentant la couleur noire ) et l'alpha donc la transparence sera à 30 pour créer cette effet de traînée ( plus le nombre est petit plus la forme est transparente ).
  Le résultat est le suivant, au lieu d'effacer l'écran complètement, on ajoute un voile semi-transparent noir donc les formes précédentes laissent des traînées qui disparaissent doucement.

- noStroke() :

  On utilise noStroke() pour supprimer le contour des formes pour un résultat plus fluide et doux.

- Choix des formes :

  On utilise une variable aléaoire forme qui décide de la forme qui sera crée via des séries de test.

- Paramétrage et couleur des formes :

  Tout est choisi aléatoirement via la fonction random.

- Suivi de la souris :

  Pour que les formes suivent la souris on les fait apparaître aux coordonnées x et y de la souris avec mouseX et mouseY.


  Maintenant concernant les crédits pour cette oeuvre je me suis inspiré de l'introduction du film Monstre et Cie que j'ai revisité en ajoutant des formes circulaires. On y retrouve le style de Saul Bass dans c'est introduction
  de film.
