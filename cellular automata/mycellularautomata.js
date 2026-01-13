let cols = 50; // nombres des colonnes
let rangees = 50; // nombres des rangees
let cellSize = 10; // taille des cellules

let grid; 

function setup() {
  createCanvas(cols * cellSize, rangees * cellSize);
  colorMode(HSB, 360, 100, 100); // Utilisé pour la saturation des cellules en fct de l'âge de celle-ci
  grid = createGrid();
}

function draw() {
  background(220);
  drawGrid();
  nextGeneration();
  frameRate(2)
}

function createGrid() {
  let arr = new Array(cols); // creation d'un tableau de taille col

  for (let x = 0; x < cols; x++) {
    arr[x] = new Array(rangees);// creation d'un tableau de taille rangees pour chaque élément du tableau col
    for (let y = 0; y < rangees; y++) {
      arr[x][y] = floor(random(2)); // Etat de la cellule égale à 0 ou 1
    }
  }
  return arr;// Tableau 2D avec des cellules à états aléatoires 
}

function drawGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rangees; y++) {

      let age = grid[x][y]; // âge de la cellule
      let sat = min(age * 5, 100) // saturation calculé en fonction de l'âge
      
      if (age > 0) {
        fill(255, sat, 80);// saturation de la cellule dépend de son âge
      } else {
        fill(0, 0, 95);// cellule morte (blanc)
      }

      stroke('grey');
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
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

function nextGeneration() {
  let next = createGrid(); // Creation de la grille de la prochaine génération

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rangees; y++) {
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
      } else if (etat > 0){
       next[x][y] = etat + 1; // La cellule vieillit   
      } else {
        next[x][y] = etat;
      }
    }
  }

  grid = next; // La grille de la génération actuelle est remplacé par la grille de la prochaine génération
}
