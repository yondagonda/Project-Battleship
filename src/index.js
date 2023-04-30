import './style.css';
import { Gameboard, CreateShip, Player } from './factory';

const carrier = CreateShip(5);
const battleship = CreateShip(4);

const player1gb = Gameboard();
const player1 = Player('Johny', player1gb);
console.log(player1);

console.log(player1.myGameboard.placeShip(carrier, [1, 5]));
console.log(player1.myGameboard.placeShip(battleship, [3, 5]));

console.log(player1.myGameboard.receiveAttack([3, 4]));
console.log(player1.myGameboard.receiveAttack([3, 7]));
// console.log(player1.myGameboard.receiveAttack([3, 5]));
// console.log(player1.myGameboard.receiveAttack([3, 3]));
// console.log(player1.myGameboard.receiveAttack([3, 2]));

console.log(player1.myGameboard.checkifAllSunk());
console.log(player1.makeRandomMove());
console.log(player1.makeRandomMove());
console.log(player1.makeRandomMove());
