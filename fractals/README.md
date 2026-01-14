**Flocon de Koch Animé avec Particules**

Présentation du projet

Ce projet est une visualisation interactive d’un flocon de Koch, une fractale classique, sur lequel des particules se déplacent continuellement. Les particules suivent les segments de la fractale, créant un effet dynamique et hypnotique, rappelant le mouvement d’électrons dans un circuit.


Points techniques

Construction du flocon de Koch

- Le flocon de Koch est généré récursivement à partir d’un triangle équilatéral.
- Chaque segment du triangle est divisé en 4 sous-segments à chaque niveau de profondeur.
- Un point intermédiaire est calculé pour former le « pic » du flocon, créant ainsi la structure fractale.
- Tous les segments sont stockés dans un tableau kochSegments pour permettre le suivi des particules.
  
Particules

- Les particules sont initialisées aléatoirement sur les segments du flocon.
- Chaque particule connaît :
  - le segment sur lequel elle se trouve
  - la position relative sur le segment (t entre 0 et 1)
- Le déplacement est calculé en interpolant (lerp) la position de la particule sur le segment.
- La vitesse est proportionnelle à la longueur du segment pour un mouvement uniforme.
- Quand une particule atteint la fin d’un segment, elle passe au segment suivant pour continuer son parcours sur tout le flocon.
  
Animation et rendu

- Chaque frame, le flocon est redessiné avec des traits bleus.
- Les particules sont dessinées comme des cercles jaunes se déplaçant le long du flocon.
- Le mouvement continu et fluide des particules crée un effet électrique et dynamique.
  
Concepts clés

- Fractales : La récursion utilisée pour générer le flocon montre comment un motif simple peut se répéter à différentes échelles pour créer une structure complexe.
- Interpolation linéaire (lerp) : Permet de calculer la position exacte d’une particule sur un segment.
- Système de particules : Les particules suivent une structure définie par la fractale, ce qui permet de visualiser un flux ordonné et continu.

  
Crédits

Ce projet a été inspiré par les systèmes électriques et le flux d’électrons dans un circuit. Les particules représentent symboliquement des électrons circulant autour d’un chemin défini, rappelant la beauté et la complexité des mouvements dans la nature et la physique.


