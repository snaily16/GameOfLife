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
  createCanvas(600, 400);
  frameRate(20);
  rows = width / resolution;
  cols = height / resolution;
  //console.log(rows, cols)
  //randomize();
  generateGosperGlider();
  
  //var randomButton = createButton("Randomize");
  //var patternButton = createButton("Patterns");
  toggleButton = createButton("Pause");
  var blankButton = createButton("Blank Screen");
  
  sel = createSelect();
  //sel.position(10, 10);
  sel.option('Random')
  sel.option('Gosper-Glider-Gun')
  sel.option('r-pentomino');
  sel.option('Glider');
  sel.selected('Gosper-Glider-Gun');
  sel.changed(mySelectPattern);
  
  patSel = createSelect();
  patSel.option('Block')
  patSel.option('Beehive');
  patSel.option('Boat');
  patSel.option('Blinker');
  patSel.option('Toad');
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
  if(item == 'Glider'){
    generateGlider();
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

function generateRPentomino(){
  grid =  make2DArray(rows, cols);
  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      grid[i][j] = 0;
    }
  }
  
  x_indices = [0, 1, 0, -1, 0]
  y_indices = [0, 0, 1, 1, 2]
  var a=60;
  var b=40;
  
  for(var i=0;i<5;i++){
    grid[a+x_indices[i]][b+y_indices[i]]=1;
  }
  //noLoop();
}

function generateGosperGlider(){
  grid =  make2DArray(rows, cols);
  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      grid[i][j] = 0;
    }
  }
  var a=10;
  var b=10;
  
  
  x_indices=[24,22,24,12,13,20,21,34,35,11,15,20,21,34,35,0,1,10,16,20,21,0,1,10,14,16,17,22,24,10,16,24,11,15,12,13];
  y_indices=[0,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,6,6,6,7,7,8,8];
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
  
  //noLoop();
}

function generateGlider(){
  grid =  make2DArray(rows, cols);
  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      grid[i][j] = 0;
    }
  }
  var a=60;
  var b=40;
  grid[a][b]=1;
  grid[a+1][b+1]=1;
  grid[a+2][b+1]=1;
  grid[a][b+2]=1;
  grid[a+1][b+2]=1;
  //noLoop();
}

function blankSketch(){
  grid =  make2DArray(rows, cols);
  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      grid[i][j] = 0;
    }
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
  let sum = 0;
  for(let i=-1; i<2; i++){
    for(let j=-1; j<2; j++){
      if(i==0 && j==0){
        continue;
      }
      let live = 0;
      let rx = ((x+i)%rows + rows)%rows;
      let ry = ((y+j)%cols + cols)%cols;
      
      //let val_rows = !(x+i < 0 || x+i >= rows)
      //let val_cols = !(y+j < 0 || y+j >= cols)
      //if (val_rows && val_cols){
        if (grid[rx][ry]>=1){live = 1;}
        sum = sum + live;
      //}
    }
  }
  return sum;
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

function drawPattern(){
  let pattern=patSel.value();
  let xp = ~~(mouseX / resolution);
  let yp = ~~(mouseY / resolution);
  
  if(pattern=="Block"){
    grid[xp][yp]=1;
    if(xp+1<rows)
        grid[xp+1][yp]=1; 
    if(yp+1<cols)
        grid[xp][yp+1]=1; 
  }
  else if(pattern=="Beehive"){
    x_indices=[0,0,1,1,2,2]
    y_indices=[0,2,-1,2,0,1]
    for(var i=0;i<6;i++){
    grid[xp+x_indices[i]][yp+y_indices[i]]=1;
  }
  }
  else if(pattern=="Blinker"){
    grid[xp][yp]=1;
    grid[xp+1][yp]=1;
    grid[xp+2][yp]=1;
  }
  else if(pattern=="Boat"){
    grid[xp][yp]=1;
    grid[xp+1][yp]=1;
    grid[xp][yp+2]=1;
  }
   else if(pattern=="Toad"){
    x_indices=[0,1,2,0,0,0]
    y_indices=[0,0,0,1,2,3]
    for(var i=0;i<6;i++){
    grid[xp+x_indices[i]][yp+y_indices[i]]=1;
    }
  }
}

function draw() {
  background(0);
  for(let i=0; i<rows; i++){
    for(let j=0; j<cols; j++){
      
      let x = i * resolution;
      let y = j * resolution;
      if(mouseIsPressed == true){
       drawPattern();
      }
      if (grid[i][j]>=1){
        var c  = grid[i][j]*2;
        fill(255-c,255-c,255+c);
        stroke(0);
        rect(x,y,resolution-1, resolution-1);
      }
    }
  }
  
 gameOfLife();
}

function gameOfLife(){
   let temp_curr;
  let temp_prev;
  //let new_grid = make2DArray(rows, cols);
  for(let i=0; i<rows; i++){
    temp_curr = new Array(cols).fill(0);
    for(let j=0; j<cols; j++){
      temp_curr[j] = updateCell(i,j);
      //new_grid[i][j] = updateCell(i,j);
    }
    if(i>0){
      grid[i-1] = temp_prev;
    }
    temp_prev = temp_curr;
  }
  grid[rows-1] = temp_prev;
  //grid = new_grid;
}