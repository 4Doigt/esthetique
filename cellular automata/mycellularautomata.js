let cols = 50; // nombres des colonnes
let rangees = 50; // nombres des rangees
let cellSize = 10; // taille des cellules

let grid; 
let gridType; // Grille du type de cellule : 0 si normale 1 si infectée

function setup() {
  createCanvas(cols * cellSize, rangees * cellSize);
  colorMode(HSB, 360, 100, 100); // Utilisé pour la saturation des cellules en fct de l'âge de celle-ci
  grid = createGrid();
}

function draw() {
  background(220,5); // L'alpha est à 5 pour créer un effet de traînée pour avoir un rendu plus fluide
  drawGrid();
  nextGeneration();
  frameRate(7) // FrameRate optimale pour un resultat fluide et agréable
}

function createGrid() { // Fonction utile pour les grilles initiales
  let arr = new Array(cols); // creation d'un tableau de taille col
  gridType = new Array(cols); 
  for (let x = 0; x < cols; x++) {
    arr[x] = new Array(rangees);// creation d'un tableau de taille rangees pour chaque élément du tableau col
    gridType[x] = new Array(rangees);// creation du tableau de type de cellule
    for (let y = 0; y < rangees; y++) {
      arr[x][y] = floor(random(2)); // Etat initial de la cellule égale à 0 ou 1
      gridType[x][y] = 0; // Toutes les cellules sont normales au depart
    }
  }
  return arr;// Tableau 2D avec des cellules à états aléatoires 
}

function createEmptyGrid() {
  let arr = new Array(cols);
  for (let x = 0; x < cols; x++) {
    arr[x] = new Array(rangees).fill(0);
  }
  return arr;
}

function drawGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rangees; y++) {
      let age = grid[x][y];
      let sat = min(age * 10, 100);
      let alpha = map(age, 0, 20, 50, 255); // Plus la cellule est vielle plus elle est opaque
      let size = map(age*10, 0, 20, cellSize * 0.5, cellSize*1.3); // Plus elle est jeune plus elle est petite
      let width = size;
      let height = size + countNeighbors(x, y)*0.7; // Plus la cellule a des voisins plus elle s'allonge
      if (age > 0) {
        if (gridType[x][y] === 1) { 
          fill(0, sat, 100, alpha); // Rouge vif si la cellule est infecté
        }
        else { 
          fill(210, sat, 80, alpha); // Bleuâtre si la cellule est normale
        } 
    } else {
        fill(0, 0, 95, 0); 
      }

      noStroke();
      ellipse(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, width, height); // cf ReadMe
    }
  }
}


function countNeighbors(x, y) {
  let sum = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) { // On regarde aux alentours de la cellule
      let col = (x + i + cols) % cols; // Position des voisins sur l'axe horizontal
      let rangee = (y + j + rangees) % rangees; // Position des voisins sur l'axe vertical
      sum += grid[col][rangee]; // On compte les cellules voisines vivantes
    }
  }

  sum -= grid[x][y]; // on enlève la cellule elle-même
  return sum;
}

function countEpidemicNeighbors(x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = (x + i + cols) % cols;
      let rangee = (y + j + rangees) % rangees;
      sum += gridType[col][rangee];
    }
  }
  sum -= gridType[x][y];
  return sum;
}

function nextGeneration() {
  let next = createEmptyGrid(); // Creation de la grille de la prochaine génération
  let nextType = createEmptyGrid() // Creation de la grille de type de la prochaine génération
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rangees; y++) {
      nextType[x][y] = gridType[x][y]; // On remplit la grille de type de la prochaine génération par l'actuelle
      let etat = grid[x][y]; // Etat des cellules de la génération actuelle
      let neighbors = countNeighbors(x, y); // Nombre de voisins

      // Définition des règles
      // Modification d'état des cellules de la génération suivante en fct des règles
      if (etat === 0 && neighbors === 3) {
        next[x][y] = 1; // La cellule naît
      } else if (etat === 0 && neighbors === 2 && random() < 0.1) { // Chance d'auto-régénération
          next[x][y] = 1; 
      } else if (etat > 0 && (neighbors < 1 || neighbors > 4)) {
        next[x][y] = 0; // La cellule meurt
      } else if (etat > 0 && neighbors > 0){
         next[x][y] = etat + 1; // La cellule vieillit   
          // Propagation épidémique
          if (gridType[x][y] === 0 && countEpidemicNeighbors(x, y) > 0 && random() < 0.3) {
            nextType[x][y] = 1; // La cellule s'infecte
        } else {
            nextType[x][y] = gridType[x][y];
          }    
      } else {
        next[x][y] = etat; // La cellule reste morte
      }
    }
  }

  grid = next; // La grille de la génération actuelle est remplacé par la grille de la prochaine génération
  gridType = nextType; // La grille de type de la génération actuelle est remplacé par la grille de la prochaine génération
}

function mousePressed() {
  let x = floor(mouseX / cellSize); // Conversion du clic en coordonées de grille
  let y = floor(mouseY / cellSize);
  if (x >= 0 && x < cols && y >= 0 && y < rangees) { // Empêche de cliquer en dehors de l'aperçu
    grid[x][y] = 1;       // on la rend vivante
    gridType[x][y] = 1;   // on la marque comme épidémie
  }
}
