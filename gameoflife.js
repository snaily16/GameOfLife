// Game of Life Algorithm

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

function gameOfLife(){
  let temp_curr;
  let temp_prev;
  let temp_0;
  for(let i=0; i<rows; i++){
    temp_curr = new Array(cols).fill(0);
    for(let j=0; j<cols; j++){
      temp_curr[j] = updateCell(i,j);
      //new_grid[i][j] = updateCell(i,j);
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
