let kochSegments = []; // Tableau pour stocker tous les segments du flocon de Koch
let particules = [];   // Tableau pour stocker toutes les particules qui vont se déplacer sur le flocon
let speed = 2;         // Vitesse à laquelle les particules se déplacent le long des segments

function setup() {
  createCanvas(600, 600); 
  stroke(255);            // Couleur du trait par défaut
  noFill();               // Pas de remplissage pour les formes (on va juste tracer des lignes)

  // On définit les 3 points du triangle initial pour le flocon de Koch
  let a = createVector(width/2, 100);      // Point supérieur du triangle
  let b = createVector(100, height-100);   // Point inférieur gauche
  let c = createVector(width-100, height-100); // Point inférieur droit

  // On construit le flocon de Koch en appelant la fonction récursive pour chaque côté du triangle
  koch(3, a, b); // côté supérieur gauche
  koch(3, b, c); // côté inférieur
  koch(3, c, a); // côté supérieur droit

  // On crée les particules sur les segments du flocon
  for (let i = 0; i < 200; i++) { 
    // On choisit un segment aléatoire pour placer la particule
    let seg = floor(random(kochSegments.length));
    particules.push({
      segment: seg,  // index du segment sur lequel se trouve la particule
      t: random(1)   // position relative sur le segment (0 = début, 1 = fin)
    });
  }
}

function draw() {
  background(0,50); // On efface l'écran avec un fond noir à chaque frame

  // On dessine le flocon de Koch
  stroke(100, 100, 255); // Couleur bleu clair pour les segments
  strokeWeight(2);       // Épaisseur des lignes
  for (let s of kochSegments) {  // Boucle sur tous les segments
    line(s.p1.x, s.p1.y, s.p2.x, s.p2.y); // On trace la ligne entre p1 et p2
  }

  // On déplace et dessine les particules
  fill(255, 200, 0); // Couleur jaune pour les particules
  noStroke();        // Pas de contour
  for (let p of particules) { // Boucle sur chaque particule
    let seg = kochSegments[p.segment]; // On récupère le segment sur lequel la particule est

    // On calcule la position exacte de la particule sur le segment
    // p.t est entre 0 et 1, p5.Vector.lerp fait l'interpolation linéaire entre p1 et p2
    let pos = p5.Vector.lerp(seg.p1, seg.p2, p.t);

    // On dessine la particule comme un petit cercle
    ellipse(pos.x, pos.y, 5);

    // On avance la particule le long du segment
    // On divise la speed par la longueur du segment pour avoir la même vitesse même si le segment est long
    p.t += speed / p5.Vector.dist(seg.p1, seg.p2);

    // Quand la particule atteint la fin du segment
    if (p.t >= 1) {
      // On passe au segment suivant pour continuer le mouvement sur tout le flocon
      p.segment = (p.segment + 1) % kochSegments.length; // modulo pour revenir au début
      p.t = 0; // recommencer au début du nouveau segment
    }
  }
}

// Fonction récursive pour créer les segments du flocon de Koch
function koch(profondeur, p1, p2) {
  if (profondeur === 0) { // Condition de base : plus de profondeur
    // On ajoute le segment final au tableau
    kochSegments.push({p1: p1.copy(), p2: p2.copy()});
    return; // arrêter la récursion
  }

  // On calcule les points intermédiaires du segment divisé
  let v = p5.Vector.sub(p2, p1);         // vecteur du segment p1→p2
  let a = p1.copy();                      // point de départ
  let b = p1.copy().add(v.copy().mult(1/3)); // point à 1/3
  let d = p1.copy().add(v.copy().mult(2/3)); // point à 2/3
  let e = p2.copy();                      // point de fin

  // On calcule le point du pic pour former le triangle du flocon
  let angle = -PI/3;                      // angle de rotation -60°
  let c = b.copy().add(v.copy().mult(1/3).rotate(angle)); // point au milieu du segment élevé

  // Appels récursifs pour chaque sous-segment
  koch(profondeur-1, a, b);
  koch(profondeur-1, b, c);
  koch(profondeur-1, c, d);
  koch(profondeur-1, d, e);
}
