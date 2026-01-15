let mots = []; // Tableau vide des mots exploitables pour le poème qu'on remplit avec un appel d'API
let poeme = []; // Tableau vide du poeme qu'on remplit grâce à genererFractale(profondeur)

function setup() {
  createCanvas(800, 600);
  textFont("Georgia"); // Choix de la police d'écriture
  textSize(16); // Taille du texte
  noLoop(); // Ne pas relancer draw() après le premier passage

  chargerPoeme();// Initialisation du poeme
}

function chargerPoeme() { // Pour récupérer des mots via une API
  fetch("https://poetrydb.org/random") 
    .then(res => res.json())
    .then(data => {
      let texte = data[0].lines.join(" "); // On concatène toutes les lignes du poème récupéré en une seule texte
      construireMots(texte); // Récupérer les mots rangés dans leur niveau de fractal
      genererFractale(0); // Initialisation du poème
      redraw(); // NoLoop() empêche draw() de se lancer automatiquement donc on le force à se relancer une seule fois
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

function draw() {
  background(245);
  fill(20);
  noStroke(); // Pas de contour pour le texte

  let y = 50; // Position initial du premier mot du poème
  for (let ligne of poeme) {
    if (y<560){ // On limite la taille vertical du poème
    text(ligne, 50, y); // On crée du texte en x=50
    y += 24; // Espace vertical entre les mots du poème
    }
    else{
      break
    }
  }
}

function genererFractale(profondeur) { // On utilise une fractale pour générer le poème ( fct récursive)
  if (profondeur > 4 || mots[profondeur].length === 0) return; // Condition d'arrêt

  let mot = random(mots[profondeur]); // On prend un mot au hasard dans la bonne profondeur
  poeme.push(mot); // On l'ajoute à poème

  // On crée deux fractales pour avoir deux lignes poétiques
  genererFractale(profondeur + 1); // Appel récursif de la fonction 
  genererFractale(profondeur + 1); // On crée une bifurcation ( Fractale )
}
