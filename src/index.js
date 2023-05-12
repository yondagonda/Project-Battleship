/* eslint-disable import/no-cycle */
import './style.css';
import { Gameboard, Player } from './factory';
import { generateGrid, hideGrid, ObscureComputerShips } from './DOMInteraction';
import { randomlyPlaceShips } from './game';

generateGrid('player');
generateGrid('opponent');

hideGrid('opponent');

const player1gb = Gameboard();
export const player1 = Player('Player', player1gb);
player1.myTurn = true;

const player2gb = Gameboard();
export const player2 = Player('Computer', player2gb);

randomlyPlaceShips('player');
randomlyPlaceShips('computer');

ObscureComputerShips();
