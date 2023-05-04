/* eslint-disable import/no-cycle */
import './style.css';
import { Gameboard, CreateShip, Player } from './factory';
import { generateGrid, renderShip, hideGrid } from './DOMInteraction';

generateGrid('player');
generateGrid('opponent');

// enable some kind of 'Start Game' popup button here
// once that button is clicked, then hide player1 grid as seen below:
hideGrid('player'); // player1s grid starts hidden at first

const player1gb = Gameboard();
export const player1 = Player('Johny', player1gb);
player1.myTurn = true; // player1 always starts first move
const player2gb = Gameboard();
export const player2 = Player('Computer', player2gb);

console.log(player1);
console.log(player2);

const carrier = CreateShip(5);
const battleship = CreateShip(4);
const cruiser = CreateShip(3);
const submarine = CreateShip(2);
const sinkboat = CreateShip(1);

const p1carrier = player1.myGameboard.placeShip(carrier, [1, 10]);
renderShip(p1carrier, 'player');
const p1battleship = player1.myGameboard.placeShip(battleship, [3, 4]);
renderShip(p1battleship, 'player');
const p1cruiser = player1.myGameboard.placeShip(cruiser, [5, 8]);
renderShip(p1cruiser, 'player');
const p1submarine = player1.myGameboard.placeShip(submarine, [10, 10]);
renderShip(p1submarine, 'player');
const p1sinkboat = player1.myGameboard.placeShip(sinkboat, [10, 1]);
renderShip(p1sinkboat, 'player');

const p2carrier = player2.myGameboard.placeShip(carrier, [6, 8]);
renderShip(p2carrier, 'opponent');
const p2battleship = player2.myGameboard.placeShip(battleship, [4, 6]);
renderShip(p2battleship, 'opponent');
const p2cruiser = player2.myGameboard.placeShip(cruiser, [10, 4]);
renderShip(p2cruiser, 'opponent');
const p2submarine = player2.myGameboard.placeShip(submarine, [1, 4]);
renderShip(p2submarine, 'opponent');
const p2sinkboat = player2.myGameboard.placeShip(sinkboat, [2, 10]);
renderShip(p2sinkboat, 'opponent');

// THINGS TO DO:
// focus on cleaning up our code/program, make it more clear/efficient for now

// obscure opponent ship locations
// put ObscureComputerShips() here? the function will set the computer side cells background color to white

// make a function that randomly place ships on behalf of the user on refresh, then allow drag and drop?
// e.g. randomiseShips(playerOrComputersGrid)
