// Array functions

function make2DArray(rows, cols){
  let arr = new Array(rows);
  for(let i=0; i<rows; i++){
    arr[i] = new Array(cols);
  }
  return arr;
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
