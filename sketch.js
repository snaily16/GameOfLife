// Conway's Game of Life
// Snehal Gharat
function make2DArray(rows, cols){
  let arr = new Array(rows);
  for(let i=0; i<rows; i++){
    arr[i] = new Array(cols);
  }
  return arr;
}

let grid;
let rows;
let cols;
let resolution = 5;
var toggleButton;
var sel, pat_sel;

function setup() {
  createCanvas(1200, 500);
  frameRate(20);
  rows = width / resolution;
  cols = height / resolution;
  generateGosperGlider();
  toggleButton = createButton("Pause");
  enableMouseDrag = createButton("Enable Mouse Drag");
  var blankButton = createButton("Blank Screen");
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
  sel.option('Random')
  sel.option('Gosper-Glider-Gun')
  sel.option('r-pentomino');
  sel.selected('Gosper-Glider-Gun');
  sel.changed(mySelectPattern);
  
  patSel = createSelect();
  options = ['Block', 'Beehive', 'Beehive2', 'HoneyComb', 'Boat', 'Blinker', 'Toad', 'QueenBee', 'HoneyFarm', 'SpaceShip1', 'Glider', 'Glider-Gun', 'Heart', 'r-pentomino'];
  for(var i=0; i<options.length; i++)
    patSel.option(options[i]);
  patSel.selected('Block');
  patSel.changed(drawPattern);
  
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
// create random 2d array
function randomize(){
  grid =  make2DArray(rows, cols);
  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      grid[i][j] = floor(random(2));
    }
  }
}

// create blank 2d array
function blankSketch(){
  grid =  make2DArray(rows, cols);
  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      grid[i][j] = 0;
    }
  }
  return grid;
}

function generateRPentomino(){
  grid = blankSketch();
  indices = GetPatterns('r-pentomino');
  x_indices = indices[0];
  y_indices = indices[1];
  var a=60;
  var b=40;
  
  for(var i=0;i<x_indices.length;i++){
    grid[a+x_indices[i]][b+y_indices[i]]=1;
  }
  //noLoop();
}

function generateGosperGlider(){
  grid = blankSketch();
  var a=10;
  var b=10;
  
  indices = GetPatterns('Glider-Gun');
  x_indices = indices[0];
  y_indices = indices[1];
  for(var i=0;i<36;i++){
    grid[a+x_indices[i]][b+y_indices[i]]=1;
  }
  a=100;
  b=10;
  for(var i=0;i<36;i++){
    grid[a-x_indices[i]][b+y_indices[i]]=1;
  }
  a=10;
  b=70;
  for(var i=0;i<36;i++){
    grid[a+x_indices[i]][b-y_indices[i]]=1;
  }
  a=100;
  b=70;
  for(var i=0;i<36;i++){
    grid[a-x_indices[i]][b-y_indices[i]]=1;
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

function countNeighbours(grid, x,y){
  let alivenbrs = 0;
  for(let i=-1; i<2; i++){
    for(let j=-1; j<2; j++){
      if(i==0 && j==0){
        continue;
      }
      let rx = ((x+i)%rows + rows)%rows;
      let ry = ((y+j)%cols + cols)%cols;    
    
      if (grid[rx][ry]>=1){alivenbrs = alivenbrs + 1;}

    }
  }
  return alivenbrs;
}

function updateCell(i,j){
  let liveNB =  countNeighbours(grid, i,j);
  let curr_state = grid[i][j];
  let new_state = curr_state;
  if(curr_state <= 0 && liveNB == 3){
    new_state = 1;
  }
  else if(curr_state<=0){
    new_state -= 1;
  }
  else if (curr_state>=1 && (liveNB<2 || liveNB >3)){
      new_state = 0;
  }
  else if (curr_state>=1){
    new_state += 1;
  }
  return new_state;
}

function drawPattern(x=0,y=0){
  let pattern=patSel.value();
  if (x!=0) xp=x;
    else xp = ~~(mouseX / resolution);
  if(y!=0) yp=y;
    else yp = ~~(mouseY / resolution);
  
  indices = GetPatterns(pattern);
  x_indices = indices[0];
  y_indices = indices[1];

  for(let i=0;i<x_indices.length;i++)
     grid[xp+x_indices[i]][yp+y_indices[i]]=1;
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
      if(mouseIsPressed == true && enable_mouse_drag == true){
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
function mousePressed(){
  if (enable_mouse_drag == false){
    drawPattern();
  }
}
function gameOfLife(){
   let temp_curr;
  let temp_prev;
    let temp_0;
  for(let i=0; i<rows; i++){
    temp_curr = new Array(cols).fill(0);
    for(let j=0; j<cols; j++){
      temp_curr[j] = updateCell(i,j);
    }
    if(i>1){
      grid[i-1] = temp_prev;
    }
    temp_prev = temp_curr;
    if(i==0)
      temp_0 = temp_curr;
  }
  grid[rows-1] = temp_prev;
  grid[0] = temp_0;
}
