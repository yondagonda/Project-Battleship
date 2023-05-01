/* eslint-disable import/no-cycle */
import './style.css';
import { Gameboard, CreateShip, Player } from './factory';
import { generateGrid, renderShip } from './DOMInteraction';

generateGrid('player');
generateGrid('opponent');

const carrier = CreateShip(5);
const battleship = CreateShip(4);

const player1gb = Gameboard();
export const player1 = Player('Johny', player1gb);
player1.myTurn = true; // player1 always starts first move

const player2gb = Gameboard();
export const player2 = Player('Computer', player2gb);

console.log(player1);
console.log(player2);

const p1carrier = player1.myGameboard.placeShip(carrier, [1, 5]);
renderShip(p1carrier, 'player');
const p1battleship = player1.myGameboard.placeShip(battleship, [3, 5]);
renderShip(p1battleship, 'player');
console.log(player1.myGameboard.getAllShips());

const p2carrier = player2.myGameboard.placeShip(carrier, [6, 8]);
renderShip(p2carrier, 'opponent');
const p2battleship = player2.myGameboard.placeShip(battleship, [4, 6]);
renderShip(p2battleship, 'opponent');
console.log(player2.myGameboard.getAllShips());

console.log(player2.makeRandomMove());
// need to make it so receiveAttack(player2.makeRandomMove()), but only execute when its computers turn

// Game function: ships can only be placed vertically at first, with a rotate button available after
// ships need to have a 'head' of sorts, which will serve as its axis point of rotation and cursor placeholder
// Carrier: length 5
// Battleship: length 4
// Cruiser: length 3
// Submarine: length 3
// Destroyer: length 2
