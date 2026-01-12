let X=600;
let Y=400;

function setup() {
  createCanvas(X, Y);
  figure5()
}

function figure5(){
  A=X/2
  B=Y/2
  for (let I=1;I<12;I++){
    Rmax=Y
    R=Y*0.7
    let from=color(0,180,120)
    let to=color(0,255,150)
      for (let W=PI/4;W<3.6;W=W+0.05){
        let col=lerpColor(from, to, R/Rmax);
        X=R*cos(W)
        Y=R*sin(W)
        stroke(col)
        line (A+X,B-Y,A-Y,B-X)
        line (A-Y,B-X,A-X,B+X)
        line (A-X,B+Y,A+X,B-Y)
        line (A-X,B+Y,A+Y,B+X)
        line (A+Y,B+X,A+X,B-Y)
        R=R*0.94
      }  
    }
    R=R/0.94
    for(let W=3.6;W<PI/4;W=W-0.05){
      col=lerpColor(from, to, R/Rmax);
      X=R*cos(W)
      Y=R*sin(W)
      stroke(col)
      line (A+X,B-Y,A-Y,B-X)
      line (A-Y,B-X,A-X,B+X)
      line (A-X,B+Y,A+X,B-Y)
      line (A-X,B+Y,A+Y,B+X)
      line (A+Y,B+X,A+X,B-Y)
      R=R/0.94
    }
  }
