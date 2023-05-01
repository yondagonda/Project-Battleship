import './style.css';
import { Gameboard, CreateShip, Player } from './factory';
import { generateGrid, renderShip } from './DOMInteraction';

generateGrid('player');
generateGrid('opponent');

const carrier = CreateShip(5);
const battleship = CreateShip(4);

const player1gb = Gameboard();
const player1 = Player('Johny', player1gb);
const player2gb = Gameboard();
const player2 = Player('Computer', player2gb);
console.log(player1);
console.log(player2);

const p1carrier = player1.myGameboard.placeShip(carrier, [1, 5]);
renderShip(p1carrier, 'player');
const p1battleship = player1.myGameboard.placeShip(battleship, [3, 5]);
renderShip(p1battleship, 'player');

console.log(player1.myGameboard.getAllShips());

// console.log(player1.myGameboard.receiveAttack([3, 4]));
// console.log(player1.myGameboard.receiveAttack([3, 7]));
// // console.log(player1.myGameboard.receiveAttack([3, 5]));
// // console.log(player1.myGameboard.receiveAttack([3, 3]));
// // console.log(player1.myGameboard.receiveAttack([3, 2]));

// console.log(player1.myGameboard.checkifAllSunk());
// console.log(player1.makeRandomMove());
// console.log(player1.makeRandomMove());
// console.log(player1.makeRandomMove());
