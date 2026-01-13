Ce projet est un automate cellulaire interactif et artistique, inspiré du jeu de la vie, des effets visuels des explosions dans le jeu MegaBonk et qui modélise artistiquement la propagation d'une epidemie. 
On génère au départ des motifs organiques dynamiques où les cellules vivent, vieillissent et interagissent visuellement avec leur environnement. Puis on offre la possibilité de cliquer dans l'environnement pour
ajouter une cellule infectée qui va contaminer ses voisins.

L’automate fonctionne sur une grille 2D, où chaque cellule peut être vivante ou morte et possède un âge et un type (infectée ou normale), qui influence son apparence. 
Les règles principales s’inspirent du jeu de la vie : une cellule naît si elle a 3 voisins, meurt si elle est trop isolée ou surpeuplée, et peut parfois se régénérer aléatoirement.
Mais il y a en plus une dimension d'âge et d'épidémie.

Pour expliquer ce code il faut revenir sur plusieurs points clés :

- Grille 2D et calcul des voisins avec modulo :
Pour que l’automate soit infini, les positions des voisins sont calculées avec des modulo sur les colonnes et les rangées. Cela évite les bordures mortes et crée un effet continu.

- Traînées avec background() semi-transparent :
Pour accentuer le rendu artistique et fluide, j’ai utilisé un fond semi-transparent (alpha = 5). Cela permet de conserver une mémoire visuelle des générations précédentes, donnant un effet de mouvement continu.

- Gestion de la taille et du vieillissement :
Les cellules vieillissent et leur taille évolue grâce à map(), ce qui a permis de créer des motifs dynamiques.

- Couleurs HSB + alpha et sat variable :
La couleur des cellules évolue avec l’âge, principalement la saturation et la transparence. Les cellules jeunes apparaissent plus claires et translucides, tandis que les plus âgées deviennent saturées
et opaques, créant un gradient dynamique et vivant.

- Ellipses qui changent de forme :
Au lieu de simples carrés ou cercles, on utilise des ellipses dont la hauteur augmente avec le nombre de voisins. Cela donne un rendu organique et fluide, où les cellules en groupe s’allongent, évoquant
des explosions ou des ondulations similaires aux effets visuels de MegaBonk.

- Paramètres de l'ellipse :

x * cellSize + cellSize / 2 et y * cellSize + cellSize / 2 positionnent le centre de l’ellipse au milieu de la cellule de la grille
Dans ce projet, height varie selon le nombre de voisins, ce qui fait que les cellules entourées s’allongent, créant un effet organique et dynamique

- Auto-régénération : 

Certaines cellules mortes peuvent renaître aléatoirement si elles ont 2 voisins, avec 10 % de chance (random() < 0.1). Cela empêche la grille de mourir complètement et ajoute un effet vivant et 
imprévisible, renforçant le rendu organique et dynamique de l’automate.

- Utilisation de floor :

La fonction floor() convertit un nombre flottant en entier inférieur. Ici, elle est utilisée pour initialiser chaque cellule avec 0 (morte) ou 1 (vivante), garantissant que l’état de la cellule est toujours un entier simple.

- Grille parralèle de type :

  Elle permet de stocker quelle cellule était infectée ou non dans les générations précédentes pour créer les prochaines générations.


Credit :

Jeu de la vie (Conway) :
Les règles fondamentales de naissance, mort et survie des cellules sont directement inspirées du célèbre automate cellulaire. Cela permet de générer des comportements complexes à partir de règles simples.

Explosions dans MegaBonk :
L’effet visuel des ellipses qui s’étendent et interagissent avec leurs voisines rappelle les explosions dans ce jeu vidéo, où l’énergie se diffuse dans un espace de manière organique et colorée. 
L’idée était de recréer ce côté dynamique et visuellement frappant dans un contexte artistique.
