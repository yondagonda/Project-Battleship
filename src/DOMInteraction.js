/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
import { player1, player2 } from '.';
import { changeTurns, commenceComputerAttack } from './game';

let playerTable = document.querySelector('.player-square');

export function generateGrid(playerOrOpponent) {
  if (playerOrOpponent === 'opponent') {
    playerTable = document.querySelector('.opponent-square');
  }
  for (let i = 1; i <= 10; i++) {
    const row = document.createElement('tr');
    for (let j = 1; j <= 10; j++) {
      const cell = document.createElement('td');
      row.appendChild(cell);
      cell.className = 'player-td';
      if (playerOrOpponent === 'opponent') {
        cell.className = 'opponent-td';
      }
      cell.dataset.id = [i, j];
      enableCellFunctionality(cell);
    }
    playerTable.appendChild(row);
  }
}

function enableCellFunctionality(cell) {
  cell.addEventListener('click', (e) => {
    const clickedPos = e.target.dataset.id;
    const result = clickedPos.split(',').map(Number);

    if (player1.myTurn === true) {
      player2.myGameboard.receiveAttack(result);
      hideGrid('opponent');
      revealGrid('player');
    }
    changeTurns();
    commenceComputerAttack();
  });
}

export function endGame() {
  const cells = document.querySelectorAll('td');
  cells.forEach((cell) => {
    cell.style.pointerEvents = 'none';
  });
  // enable some kind of popup here, to ask if play again, etc.
}

export function hideGrid(grid) {
  let cells = document.querySelectorAll('.player-td');
  let theGrid = document.querySelector('.player-square');

  if (grid === 'opponent') {
    cells = document.querySelectorAll('.opponent-td');
    theGrid = document.querySelector('.opponent-square');
    theGrid.style.pointerEvents = 'none';
  }
  theGrid.style.pointerEvents = 'none';
  cells.forEach((cell) => {
    cell.style.border = '1px solid rgba(0, 0, 0, 0.05)';
  });
}

export function revealGrid(grid) {
  let cells = document.querySelectorAll('.player-td');
  let theGrid = document.querySelector('.player-square');

  if (grid === 'opponent') {
    cells = document.querySelectorAll('.opponent-td');
    theGrid = document.querySelector('.opponent-square');
    theGrid.style.pointerEvents = 'auto';
  }
  theGrid.style.pointerEvents = 'auto';
  cells.forEach((cell) => {
    cell.style.border = '1px solid rgb(0, 0, 0, 0.5)';
  });
}

export function renderShip(shipPositions, playerOrOpponent) {
  let cells = document.querySelectorAll('.player-td');
  if (playerOrOpponent === 'opponent')
    cells = document.querySelectorAll('.opponent-td');

  cells.forEach((cell) => {
    shipPositions.forEach((element) => {
      const result = element.join(',');
      if (result === cell.dataset.id) {
        cell.style.backgroundColor = 'lightblue';
      }
    });
  });
}

export function displayMissedAttacks(arr, playerOrOpponent) {
  let cells = document.querySelectorAll('.opponent-td');
  if (playerOrOpponent === 'opponent')
    cells = document.querySelectorAll('.player-td');

  cells.forEach((cell) => {
    arr.forEach((element) => {
      const result = element.join(',');
      if (result === cell.dataset.id) {
        cell.style.backgroundColor = 'red';
        cell.style.pointerEvents = 'none';
      }
    });
  });
}

export function displaySuccessfulHits(coordinate, playerOrOpponent) {
  let cells = document.querySelectorAll('.opponent-td');
  if (playerOrOpponent === 'opponent')
    cells = document.querySelectorAll('.player-td');

  const result = coordinate.join(',');
  cells.forEach((cell) => {
    if (result === cell.dataset.id) {
      cell.style.backgroundColor = 'black';
      cell.style.pointerEvents = 'none';
    }
  });
}
