# Conway's Game of Life

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. 
It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. 
It is Turing complete and can simulate a universal constructor or any other Turing machine.

(Reference: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

Demo of Code: https://editor.p5js.org/snaily16/full/cxIbSOh3Y

## Rules:
Each cell has two possible states, live or dead (or populated and unpopulated, respectively). 
Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent.
1. Any live cell with two or three live neighbours survives.
2. Any dead cell with three live neighbours becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

## Patterns in code:
1. Gosper Glider Gun
2. r-pentomino
3. Glider Gun

### Still-life patterns
1. Block
2. Bee-hive
3. Blinker
4. Boat
5. Toad