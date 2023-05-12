/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import { player1, player2 } from '.';
import { hideGrid, revealGrid, renderShip } from './DOMInteraction';
import { CreateShip } from './factory';

export function changeTurns() {
  if (player1.myTurn === true) {
    player1.myTurn = false;
    player2.myTurn = true;
  }
}
let aimForAboveSquare;
let aimforBelowSquare;

export function commenceComputerAttack() {
  setTimeout(() => {
    if (aimForAboveSquare) {
      const compAdjAttack = player1.myGameboard.receiveAttack(
        player2.hitAdjacentSquare('above')
      );
      if (compAdjAttack === 'the hit was successful') {
        player1.myTurn = true;
        player2.myTurn = false;
        hideGrid('player');
        revealGrid('opponent');
        aimForAboveSquare = true;
        return;
      }
      if (compAdjAttack === 'the attack did not hit anything') {
        player1.myTurn = true;
        player2.myTurn = false;
        hideGrid('player');
        revealGrid('opponent');
        aimForAboveSquare = false;
        aimforBelowSquare = true;
        return;
      }
    }
    if (aimforBelowSquare) {
      const compBelowAttack = player1.myGameboard.receiveAttack(
        player2.hitAdjacentSquare('below')
      );
      if (compBelowAttack === 'the hit was successful') {
        player1.myTurn = true;
        player2.myTurn = false;
        hideGrid('player');
        revealGrid('opponent');
        aimForAboveSquare = false;
        aimforBelowSquare = true;
        return;
      }
      if (compBelowAttack === 'the attack did not hit anything') {
        player1.myTurn = true;
        player2.myTurn = false;
        hideGrid('player');
        revealGrid('opponent');
        aimForAboveSquare = false;
        aimforBelowSquare = false;
        return;
      }
    }
    aimForAboveSquare = false;
    aimforBelowSquare = false;
    const compAttack = player1.myGameboard.receiveAttack(
      player2.makeRandomMove()
    );
    if (compAttack === 'the hit was successful') {
      aimForAboveSquare = true; // ensures above block will be targeted on next click
    }
    player1.myTurn = true;
    player2.myTurn = false;
    hideGrid('player');
    revealGrid('opponent');
  }, '400');
}

export function randomlyPlaceShips(playerOrComputer) {
  const carrier = CreateShip(5);
  const battleship = CreateShip(4);
  const cruiser = CreateShip(3);
  const submarine = CreateShip(2);
  const sinkboat = CreateShip(1);

  if (playerOrComputer === 'player') {
    const p1carrier = player1.myGameboard.placeShip(
      carrier,
      getRandomCoordinate(5)
    );
    renderShip(p1carrier, 'player');
    const p1battleship = player1.myGameboard.placeShip(
      battleship,
      getRandomCoordinate(4)
    );
    renderShip(p1battleship, 'player');
    const p1cruiser = player1.myGameboard.placeShip(
      cruiser,
      getRandomCoordinate(3)
    );
    renderShip(p1cruiser, 'player');
    const p1submarine = player1.myGameboard.placeShip(
      submarine,
      getRandomCoordinate(2)
    );
    renderShip(p1submarine, 'player');
    const p1sinkboat = player1.myGameboard.placeShip(
      sinkboat,
      getRandomCoordinate(1)
    );
    renderShip(p1sinkboat, 'player');
  }
  if (playerOrComputer === 'computer') {
    const p2carrier = player2.myGameboard.placeShip(
      carrier,
      getRandomCoordinate(5)
    );
    renderShip(p2carrier, 'opponent');
    const p2battleship = player2.myGameboard.placeShip(
      battleship,
      getRandomCoordinate(4)
    );
    renderShip(p2battleship, 'opponent');
    const p2cruiser = player2.myGameboard.placeShip(
      cruiser,
      getRandomCoordinate(3)
    );
    renderShip(p2cruiser, 'opponent');
    const p2submarine = player2.myGameboard.placeShip(
      submarine,
      getRandomCoordinate(2)
    );
    renderShip(p2submarine, 'opponent');
    const p2sinkboat = player2.myGameboard.placeShip(
      sinkboat,
      getRandomCoordinate(1)
    );
    renderShip(p2sinkboat, 'opponent');
  }
}

export function whoseTurnIsIt() {
  if (player1.myTurn === true) {
    hideGrid('player');
    return 'player';
  }
  hideGrid('opponent');
  return 'Computer';
}

export function returnRandomCoordinate() {
  return [
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 10) + 1,
  ];
}

const usedCoordinates = [];

function getRandomCoordinate(shipLength) {
  const possibleCoordinates = [];
  for (let x = 1; x <= 10; x++) {
    for (let y = 1; y <= 10; y++) {
      let valid = true;
      if (y + 1 - shipLength >= 1) {
        // ensure ship tail wont go out of bounds, e.g. Coord[1] =/= -1
        for (let i = 0; i < shipLength; i++) {
          const coordinate = [x, y - i];
          if (isCoordinateUsed(coordinate) || hasAdjacentShip(coordinate)) {
            valid = false;
            break;
          }
        }
      } else {
        valid = false;
      }
      if (valid) {
        possibleCoordinates.push([x, y]);
      }
    }
  }
  const index = Math.floor(Math.random() * possibleCoordinates.length);
  const coordinate = possibleCoordinates[index];
  for (let i = 0; i < shipLength; i++) {
    const [x, y] = [coordinate[0], coordinate[1] - i]; // causes error sometimes on refresh
    usedCoordinates.push([x, y]);
  }
  return coordinate;
}

function isCoordinateUsed(coordinate) {
  for (let i = 0; i < usedCoordinates.length; i++) {
    const [x, y] = usedCoordinates[i];
    if (x === coordinate[0] && y === coordinate[1]) {
      return true;
    }
  }
  return false;
}

function hasAdjacentShip(coordinate) {
  const [x, y] = coordinate;
  const adjacentCoordinates = [
    [x, y + 1],
    [x, y - 1],
    [x + 1, y],
    [x - 1, y],
  ];
  for (let i = 0; i < adjacentCoordinates.length; i++) {
    const [adjX, adjY] = adjacentCoordinates[i];
    if (isCoordinateUsed([adjX, adjY])) {
      return true;
    }
  }
  return false; // this function ensures the ships generated have atleast one-block distance from eachother
}
