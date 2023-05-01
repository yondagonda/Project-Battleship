/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

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
      cell.addEventListener('click', (e) => {
        const clickedPos = e.target.dataset.id;
        const result = clickedPos.split(',').map(Number);
        console.log(result);
      });
    }
    playerTable.appendChild(row);
  }
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
// function displayShip(coordinate) {}

// function renderGameboard(gb) {}
