/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { player1, player2 } from '.';

export function changeTurns() {
  if (player1.myTurn === true) {
    player1.myTurn = false;
    player2.myTurn = true;
  } else {
    player2.myTurn = false;
    player1.myTurn = true;
  }
}

// function deactivateGrid(grid) { // ENABLE THIS FUNCTION AFTER FIGURING OUT TURNS WITH THE COMPUTER
//   let cells = document.querySelectorAll('.player-td');
//   if (grid === 'opponent') {
//     cells = document.querySelectorAll('.opponent-td');
//   }
//   cells.forEach((cell) => {
//     cell.style.border = '1px solid rgba(0, 0, 0, 0.1)';
//     cell.style.pointerEvents = ''
//   });
// }

export function whoseTurnIsIt() {
  if (player1.myTurn === true) {
    // deactivateGrid('player');
    return 'player';
  }
  //   deactivateGrid('opponent');
  return 'opponent';
}
