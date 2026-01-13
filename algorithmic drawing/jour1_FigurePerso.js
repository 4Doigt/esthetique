let X=600;
let Y=400;



function setup() {
  createCanvas(X, Y);
  frameRate(10) // Limitation des frames pour un rendu plus agréable
}

function draw() {

  // Création de l'effet de traînée via un calque noir transparent qui apparait à chaque frame
  fill(0, 30);
  rect(0, 0, width, height);

  // Génération de couleur aléatoire soft
  let r = random(150, 255);
  let g = random(100, 200);
  let b = random(150, 255);

  fill(r, g, b,150);
  noStroke(); // Suppression du contour des formes pour résultat plus doux et fluide
  
  // Génération de forme aléatoire ( avec paramètres aléatoires )
  let forme = floor(random(3));
  if (forme === 0) {
    ellipse(mouseX, mouseY, random(10,90), random(40,60));
  } else if (forme === 1) {
    rect(mouseX, mouseY, random(10,50), random(20,40));
  } else {
    let taille = random(10,50) // carré
    rect(mouseX, mouseY, taille, taille);
  }
  
}
