let particules = []; // Tableau des particules
let cols, rangees; // Définition des colonnes et rangées
let cellSize = 20; // Taille des cellules ( ça influence le mouvement )
let flowfield; // Définition du tableau des vecteurs de direction

function setup() {
  createCanvas(600, 600);
  cols = floor(width / cellSize); // Nombre de colonnes de la grille flowfield 
  rangees = floor(height / cellSize); // Nombre de lignes de la grille flowfield
  flowfield = new Array(cols * rangees); // Création de la grille vide flowfield

  // Création des particules
  for (let i = 0; i < 400; i++) { // Boucle 400 fois une pour chaque particule
    particules.push({ // On ajoute une particule au tableau particules
      pos: createVector(random(width), random(height)), // Position aléatoire de la particule
      vel: createVector(0,0), // Vitesse initiale de la particule nulle
      color: color(random(100,255), random(50,200), random(50,150), 150) // Couleur RGBA de la particule aléatoire avec une transparence de 150
    });
  }
}

function draw() {
  background(0, 20); // Couleur du background avec un alpha à 20 pour un effet de traînée
 
  // Création du flowfield
  let yoff = 0; // Décalage pour l'axe y du Perlin Noise
  for (let y = 0; y < rangees; y++) { // Boucle sur toutes les lignes de la grille
    let xoff = 0; // Décalage pour l'axe x du Perlin Noise
    for (let x = 0; x < cols; x++) { // Boucle sur toutes les colonnes de la grille
      let angle = noise(xoff, yoff, frameCount * 0.01) * TWO_PI * 16; // Définition de l'angle du champ
      let v = p5.Vector.fromAngle(angle); // Création vecteur unité directionnel qui dépend de l'angle avec bibliothèque p5
      flowfield[x + y * cols] = v; // Stockage du vecteur dans le tableau flowfield
      xoff += 0.1; // Incrémentation du décalage pour une variation légère du bruit
    }
    yoff += 0.1; // Incrémentation du décalage pour une variation légère du bruit
  }

  // Déplacement des particules selon le flowfield
  for (let part of particules) { // Boucle sur toutes les particules
  let x = constrain(floor(part.pos.x / cellSize), 0, cols - 1); // Position x du vecteur trouvé grâce à la colonne de la grille correspondant à la position de la particule
  let y = constrain(floor(part.pos.y / cellSize), 0, rangees - 1); // Position y du vecteur trouvé grâce à la ligne de la grille correspondant à la position de la particule
  let idx = x + y * cols; // Index du vecteur dans le tableau flowfield
  let force = flowfield[idx]; // Récupère le vecteur de direction à cet endroit
  part.vel = force.copy(); // Copie le vecteur pour l'utiliser comme vitesse de la particule
  part.pos.add(part.vel); // Déplace la particule dans le sens du vecteur

  // Dessine les particules
  fill(part.color); // Couleur de remplissage de la particule
  noStroke(); // Pas de contour
  ellipse(part.pos.x, part.pos.y, 5); // Dessine la particule comme un petit cercle de 5 px

    
  // Rebouclage des particules 
  // Effet boucle
  if (part.pos.x > width) part.pos.x = 0;
  if (part.pos.x < 0) part.pos.x = width;
  if (part.pos.y > height) part.pos.y = 0;
  if (part.pos.y < 0) part.pos.y = height;
  }
}
