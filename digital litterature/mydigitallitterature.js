let mots = []; // Tableau vide des mots exploitables pour le poème qu'on remplit avec un appel d'API
let poeme = []; // Tableau vide du poeme qu'on remplit grâce à genererFractale(profondeur)
let polices = [ // Tableau des polices
  "Arial",
  "Arial Black",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Impact",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Comic Sans MS",
  "Lucida Console",
  "Palatino Linotype",
  "Helvetica",
  "Century Gothic",
  "Futura",
  "Franklin Gothic Medium",
  "Didot",
  "Optima"
];
let motsVisuels = [];
let motActif = null;

function setup() {
  createCanvas(800, 600);
  chargerPoeme();// Initialisation du poeme
}

function chargerPoeme() { // Pour récupérer des mots via une API
  fetch("https://poetrydb.org/random") 
    .then(res => res.json())
    .then(data => {
      let texte = data[0].lines.join(" "); // On concatène toutes les lignes du poème récupéré en une seule texte
      construireMots(texte); // Récupérer les mots rangés dans leur niveau de fractal
      genererFractale(0); // Initialisation du poème
      construirePositions();
    })
    .catch(err => console.error(err)); // En cas d'erreur
}

function construireMots(texte) { // Pour récuperer les mots séparées et crée les niveaux fractals
  let tousLesMots = texte
    .toLowerCase() // Transforme tout le texte en minuscule
    .replace(/[^\w\s]/g, "") // Supprime tous les caractères qui ne sont pas lettres,chiffres ou espaces
    .split(/\s+/); // Découpe le texte en tableau contenant tous les mots du texte

  // On crée 5 niveaux fractals dans lesquels on range les mots
  for (let i = 0; i < 5; i++) {
    mots[i] = tousLesMots.filter(m => m.length === i + 4); // On classe les mots par longueur pour les placer dans les niveaux de fractals
  }
}

function genererFractale(profondeur) { // On utilise une fractale pour générer le poème ( fct récursive)
  if (profondeur > 4 || mots[profondeur].length === 0) return; // Condition d'arrêt

  let index = floor(random(mots[profondeur].length)); // On choisit un mot aléatoire du tableau
  let mot = mots[profondeur].splice(index, 1)[0]; // On stocke le mot puis on l'enlève du tableau avec splice pour éviter les répétitions
  poeme.push(mot); // On l'ajoute à poème

  // On crée deux fractales pour avoir deux lignes poétiques
  genererFractale(profondeur + 1); // Appel récursif de la fonction 
  genererFractale(profondeur + 1); // On crée une bifurcation ( Fractale )
}
  
function construirePositions() {
  for (let mot of poeme) {
    motsVisuels.push({
      texte: mot,
      x: random(50, width - 150),
      y: random(50, height - 50),
      font: random(polices),
      size: random(14, 45) // On place les mots du poeme aléatoirement sur le canvas et on les ajoutent avec leur position, police et taille respective dans le tableau motsVisuels
    });
  }
}

function draw() {
  background(245);
  fill(20);
  noStroke();

  for (let m of motsVisuels) { 
    textFont(m.font)
    textSize(m.size)
    text(m.texte, m.x, m.y); // On ecrit chaque mot sur le canvas
  }
}
function mousePressed() {
  // On cherche le mot avec la souris
  for (let i = motsVisuels.length - 1; i >= 0; i--) { // On parcourt motsVisuels de la fin au début du tableau
    let m = motsVisuels[i];
    let w = textWidth(m.texte);
    let h = m.size;

    if (
      mouseX > m.x &&
      mouseX < m.x + w &&
      mouseY < m.y &&
      mouseY > m.y - h      // On regarde si le clic de la souris est sur un mot
    ) {
      motActif = m; // Ce mot devient alors actif
      break; // On sort de la boucle
    }
  }
}

function mouseDragged() {
  if (motActif) { // Si ce mot est actif il va suivre le curseur de la souris (tant qu'il est actif donc tant qu'on clique dessus)
    motActif.x = mouseX; // Il va suivre la position x de la souris 
    motActif.y = mouseY; // Il va suivre la position y de la souris
  }
}

function mouseReleased() {
  motActif = null; // Lorsqu'on relâche le bouton de la souris le mot n'est plus actif
}
