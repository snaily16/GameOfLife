# Conway's Game of Life

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. 
It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. 
It is Turing complete and can simulate a universal constructor or any other Turing machine.

(Reference: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## Rules:
Each cell has two possible states, live or dead (or populated and unpopulated, respectively). 
Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent.
1. Any live cell with two or three live neighbours survives.
2. Any dead cell with three live neighbours becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

## Patterns in code:
1. Gosper Glider Gun
2. r-pentomino
3. HoneyComb
4. QueenBee
5. HoneyFarm
6. SpaceShip 
7. Glider
8. Glider-Gun
9. Heart

### Still-life patterns
1. Block
2. Bee-hive
3. Blinker
4. Boat
5. Toad

### Code
Demo of Code: https://editor.p5js.org/snaily16/full/yYPBNmpRk

I have used *p5js* to implement Game of Life.
Patterns are added in ```pattern.js``` file with its x and y co-ordinates. 
You can add your own pattern co-ordinates to this file and edit the ```options``` list by adding pattern name in ```sketch.js (line no: 50)``` 
