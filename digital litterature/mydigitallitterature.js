let mots = [                          // Tableau des mots exploitables pour le poème, plus on descend en profondeur dans le tableau plus les mots sont "poétiques"
  ["racine", "terre", "origine"],
  ["souffle", "ligne", "élan"],
  ["mémoire", "fracture", "écho"],
  ["vertige", "brume", "silence"],
  ["absence", "invisible", "rêve"]
];

let poeme = []; // Tableau vide du poeme qu'on remplit grâce à genererFractale(profondeur)

function setup() {
  createCanvas(800, 600);
  textFont("Georgia"); // Choix de la police d'écriture
  textSize(16); // Taille du texte
  noLoop(); 

  // Appel Initial pour commencer le poème
  genererFractale(0);
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
  if (profondeur > 4) return; // Condition d'arrêt

  let mot = random(mots[profondeur]); // On prend un mot au hasard dans la bonne profondeur
  poeme.push(mot); // On l'ajoute à poème

  // On crée deux fractales pour avoir deux lignes poétiques
  genererFractale(profondeur + 1); // Appel récursif de la fonction 
  genererFractale(profondeur + 1); // On crée une bifurcation ( Fractale )
}
