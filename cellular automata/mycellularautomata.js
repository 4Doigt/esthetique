let col = 50; // nombres des colonnes
let rangees = 50; // nombres des rangees
let cellSize = 10; // taille des cellules

let grid; 

function setup() {
  createCanvas(col * cellSize, rangees * cellSize);
  grid = createGrid();
}

function draw() {
  background(220);
  drawGrid();
}

function createGrid() {
  let arr = new Array(col); // creation d'un tableau de taille col

  for (let x = 0; x < col; x++) {
    arr[x] = new Array(rangees);// creation d'un tableau de taille rangees pour chaque élément du tableau col
    for (let y = 0; y < rangees; y++) {
      arr[x][y] = floor(random(2)); // Etat de la cellule égale à 0 ou 1
    }
  }
  return arr;// Tableau 2D avec des cellules à états aléatoires 
}

function drawGrid() {
  for (let x = 0; x < col; x++) {
    for (let y = 0; y < rangees; y++) {
      if (grid[x][y] === 1) {
        fill(0);// cellule morte (blanc)
      } else {
        fill(255);// cellule vivante (noir)
      }
      stroke('grey');// couleur des contours des cellules 
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

