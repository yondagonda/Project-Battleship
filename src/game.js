/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { player1, player2 } from '.';
import { hideGrid, revealGrid } from './DOMInteraction';

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
        player2.hitAboveSquare() // should rename to hitAboveSquare? cos technically not targetting adjacent squares
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
        player2.hitBelowSquare()
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
  }, '200');
}

export function whoseTurnIsIt() {
  if (player1.myTurn === true) {
    hideGrid('player');
    return 'player';
  }
  hideGrid('opponent');
  return 'opponent';
}

export function returnRandomCoordinate() {
  return [
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 10) + 1,
  ];
}
