import './style.css';
import { Gameboard, createShip } from './factory';

const carrier = createShip(5);
const battleship = createShip(4);

const game1 = Gameboard();
console.log(game1.placeShip(carrier, [1, 5]));
console.log(game1.placeShip(battleship, [3, 5]));

console.log(game1.receiveAttack([3, 4]));
console.log(game1.receiveAttack([3, 7]));

console.log(game1.checkifAllSunk());
