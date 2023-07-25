function GetPatterns(pattern){
    if(pattern == 'Glider-Gun'){
        xs=[24,22,24,12,13,20,21,34,35,11,15,20,21,34,35,0,1,10,16,20,21,0,1,10,14,16,17,22,24,10,16,24,11,15,12,13];
        ys=[0,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,6,6,6,7,7,8,8];
    }
    else if(pattern == 'r-pentomino'){
        xs = [0, 1, 0, -1, 0];
        ys = [0, 0, 1, 1, 2];
    }
    else if(pattern=="Block"){
       xs = [0,0,1,1];
       ys = [0,1,0,1];
    }
    else if(pattern=="SpaceShip1"){
        xs=[0,3,4,0,4,1,2,3,4];
        ys=[0,0,1,2,2,3,3,3,3];
    }
    else if(pattern=="Beehive"){
       xs=[0,0,1,1,2,2]
       ys=[0,2,-1,2,0,1]
    }
    else if(pattern=="Blinker"){
        xs=[0,1,2];
        ys=[0,0,0];
    }
    else if(pattern=="Beehive2"){
        xs=[1,2,0,3,1,2];
        ys=[0,0,1,1,2,2];
    }
    else if(pattern=="HoneyComb"){
        xs=[2,3,1,4,0,2,3,5,1,4,2,3];
        ys=[0,0,1,1,2,2,2,2,3,3,4,4];
    }
    else if(pattern=="Boat"){
        xs=[0,0,1,2,1];
        ys=[0,1,0,1,2];
    }
    else if(pattern=="QueenBee"){
        xs=[0,0,2,1,3,1,4,1,3,0,2,0];
        ys=[0,1,1,2,2,3,3,4,4,5,5,6];
    }
    else if(pattern=="Toad"){
        xs=[0,1,2,0,0,0]
        ys=[0,0,0,1,2,3]
    }
    else if(pattern=="HoneyFarm"){
        xs=[0,1,2,3,4,5,6];
        ys=[0,0,0,0,0,0,0];
    }
    else if(pattern=="Glider"){
        xs=[0,1,2,0,1];
        ys=[0,1,1,2,2];
    }
    else if(pattern=="Heart"){
        xs=[6,7,5,7,2,5,7,8,1,3,5,9,2,5,9,10,11,5,11,6,7,8,9,10,8,7,9,8];
        ys=[0,0,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,5,5,6,6,6,6,6,8,9,9,10];
    }
    else if(pattern=="Pulsar"){
        xs=[2,3,4,8,9,10,0,5,7,12,0,5,7,12,0,5,7,12,2,3,4,8,9,10];
        xs = xs.concat(xs);
        ys=[0,0,0,0,0,0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,5,5,7,7,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,12,12,12,12,12,12];
    }
  return [xs,ys];
};

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
  for(let i=0;i<36;i++){
    grid[a+x_indices[i]][b+y_indices[i]]=1;
  }
  a=100;
  b=10;
  for(let i=0;i<36;i++){
    grid[a-x_indices[i]][b+y_indices[i]]=1;
  }
  a=10;
  b=70;
  for(let i=0;i<36;i++){
    grid[a+x_indices[i]][b-y_indices[i]]=1;
  }
  a=100;
  b=70;
  for(let i=0;i<36;i++){
    grid[a-x_indices[i]][b-y_indices[i]]=1;
  }
}

