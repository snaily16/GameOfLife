// Conway's Game of Life
// Snehal Gharat

let grid;
let rows;
let cols;
let resolution = 5;
var toggleButton;
var sel, pat_sel;

let start_draw;
function setup() {
  let canv = createCanvas(1200, 500);
  start_draw= false;
  canv.mousePressed(canvasMousePressed);
  canv.mouseOut(canvasMouseOut);
  frameRate(20);
  rows = width / resolution;
  cols = height / resolution;
  generateGosperGlider();
  
  toggleButton = createButton("Pause");
  enableMouseDrag = createButton("Enable Mouse Drag");
  blankButton = createButton("Blank Screen");
  
  enable_mouse_drag = false;
  enableMouseDrag.mousePressed(function(){
    if(enable_mouse_drag){
      enableMouseDrag.html('Enable Mouse Drag');
      enable_mouse_drag=false;
    }
    else{
      enableMouseDrag.html('Disable Mouse Drag');
      enable_mouse_drag=true;
    }
  });
  drawpatterncenterbtn = createButton("Draw Pattern At Center");
  drawpatterncenterbtn.mousePressed(function(){drawPattern(54,40)});
  
  sel = createSelect();
  //sel.position(10, 10);
  sel.option('Random');
  sel.option('Gosper-Glider-Gun');
  sel.option('r-pentomino');
  sel.selected('Gosper-Glider-Gun');
  sel.changed(mySelectPattern);
  
  patSel = createSelect();
  options = ['Block', 'Beehive', 'Beehive2', 'HoneyComb', 'Boat', 'Blinker', 'Toad', 'QueenBee', 'HoneyFarm', 'SpaceShip1', 'Glider', 'Glider-Gun', 'Heart', 'r-pentomino', 'Pulsar'];
  for(var i=0; i<options.length; i++)
    patSel.option(options[i]);
  patSel.selected('Block');
  //patSel.changed(function(){});
  
  //randomButton.mousePressed(randomize);
  toggleButton.mousePressed(playSketch);
  blankButton.mousePressed(blankSketch);
  //patternButton.mousePressed(generatePatternSketch);
}

function mySelectPattern(){
  let item = sel.value();
  if(item == 'Random'){
    randomize();
  }
  if(item == 'r-pentomino'){
    generateRPentomino();
  }
  if(item == 'Gosper-Glider-Gun'){
    generateGosperGlider();
  }
}

function playSketch(){
  if(isLooping()){
    noLoop();
    toggleButton.html("Play");
  }
  else{
    loop();
    toggleButton.html('Pause');
  }
}


function drawPattern(x=0,y=0){
  let pattern=patSel.value();
  if (x!=0) xp=x;
    else xp = ~~(mouseX / resolution);
  if(y!=0) yp=y;
    else yp = ~~(mouseY / resolution);
  //console.log(x,y);
  
  indices = GetPatterns(pattern);
  x_indices = indices[0];
  y_indices = indices[1];

  for(let i=0;i<x_indices.length;i++){
    rx = ((xp+x_indices[i])%rows + rows)%rows;
    ry = ((yp+y_indices[i])%cols + cols)%cols;  
    grid[rx][ry]=1;
  }
}

function draw() {
  background(0);
  colorMode(HSB,360,100,100); // HSB colors with max hue 360, max saturation 100 and max brightness 100
  // https://p5js.org/reference/#/p5/colorMode
  var h1=20,s1=0,b1=100; // start at white
  var h2=40,s2=100,b2=100; // orange-ish
  var ht,st,bt;
  var max_num_generations=15;
  
  strokeWeight(0.1);
  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      
      let x = i * resolution;
      let y = j * resolution;
      if(mouseIsPressed == true && start_draw == true){
       drawPattern();
      }
      if (grid[i][j]>=1){
        var c  = grid[i][j]*2;
        var t = grid[i][j]/max_num_generations;
        if(t>1)t=1;
        ht=t*h2+(1-t)*h1; // convex combination on HSB space
        st=t*s2+(1-t)*s1; // results in smooth colors
        bt=t*b2+(1-t)*b1; // between color1 and color2
        fill(ht,st,bt);
        stroke(ht,st,bt);
        //rect(x,y,resolution-1, resolution-1);
        circle(x,y,resolution);
      }
    }
  }
  
 gameOfLife();
}

function canvasMousePressed(){
  if(enable_mouse_drag==false){
    drawPattern();
  }
  else{
    start_draw=true;
  }
}

function canvasMouseOut(){
  start_draw=false;
}
