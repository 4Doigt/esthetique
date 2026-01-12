let X=600;
let Y=400;



function setup() {
  createCanvas(X, Y);
  lignes_epaisses()
}

function lignes_epaisses(){
  let N=0,D=0;
  do{
    D=D+1;                               
    N=N+D+1;
    X=X-D-10;     
    Y=Y-D-10;
    strokeWeight(D);
    stroke('red')
    line (N,N,N,Y);
    stroke('purple')
    line (N,Y,X,Y);
    stroke('blue')
    line (X,Y,X,N);
    stroke('green')
    line (X,N,N,N);
    } while(N<=Y);
}
