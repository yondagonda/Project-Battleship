/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import {
  displayMissedAttacks,
  displaySuccessfulHits,
  endGame,
} from './DOMInteraction';
import { whoseTurnIsIt, returnRandomCoordinate } from './game';

export function CreateShip(shipLength) {
  return {
    shipLength,
    hitsTaken: 0,
    sunk: false,
    hit() {
      return this.hitsTaken++;
    },
    checkIfSunk() {
      if (this.hitsTaken === shipLength) {
        this.sunk = true;
        // console.log('SHIP HAS BEEN SUNK');
        // enable some kind of css styling to the sunken ship here?
      }
    },
  };
}

export function Gameboard() {
  const carrier = CreateShip(5);
  const battleship = CreateShip(4);
  const cruiser = CreateShip(3);
  const submarine = CreateShip(2);
  const sinkboat = CreateShip(1);
  const allShips = [];
  const missedAttacks = [];
  return {
    placeShip(shipType, coordinates) {
      const value = shipType.shipLength;
      const shipsTail = [coordinates[0], coordinates[1] - (value - 1)];

      if (shipsTail[0] < 1 || shipsTail[1] < 1)
        return console.log('ship placement out of bounds');

      const shipArea = [coordinates];

      while (coordinates[1] !== shipsTail[1]) {
        coordinates = [coordinates[0], coordinates[1] - 1]; // if statements gonna be needed here?
        shipArea.push(coordinates); // this is ONLY FOR VERTICAL alignment, need another while loop for horizontal?
      }
      allShips.push(shipArea);
      return shipArea;
    },
    receiveAttack(coordinates) {
      let found = false;
      for (let i = 0; i < allShips.length; i++) {
        for (let j = 0; j < allShips[i].length; j++) {
          if (
            allShips[i][j][0] === coordinates[0] &&
            allShips[i][j][1] === coordinates[1]
          ) {
            if (whoseTurnIsIt() === 'player') {
              displaySuccessfulHits(coordinates, 'player');
            } else {
              displaySuccessfulHits(coordinates, 'opponent');
            }
            if (allShips[i].length === 5) {
              carrier.hit();
              carrier.checkIfSunk();
              found = true;
            }
            if (allShips[i].length === 4) {
              battleship.hit();
              battleship.checkIfSunk();
              found = true;
            }
            if (allShips[i].length === 3) {
              cruiser.hit();
              cruiser.checkIfSunk();
              found = true;
            }
            if (allShips[i].length === 2) {
              submarine.hit();
              submarine.checkIfSunk();
              found = true;
            }
            if (allShips[i].length === 1) {
              sinkboat.hit();
              sinkboat.checkIfSunk();
              found = true;
            }
          }
        }
      }
      if (this.checkifAllSunk()) {
        console.log(`${whoseTurnIsIt()} has won!`);
        endGame();
      }
      if (found) return 'the hit was successful';

      missedAttacks.push(coordinates);
      if (whoseTurnIsIt() === 'player') {
        displayMissedAttacks(missedAttacks, 'player');
      } else {
        displayMissedAttacks(missedAttacks, 'opponent');
      }
      return 'the attack did not hit anything';
    },
    checkifAllSunk() {
      carrier.checkIfSunk();
      battleship.checkIfSunk();
      cruiser.checkIfSunk();
      submarine.checkIfSunk();
      sinkboat.checkIfSunk();
      if (
        battleship.sunk &&
        carrier.sunk &&
        cruiser.sunk &&
        submarine.sunk &&
        sinkboat.sunk
      )
        return true;
      return false;
    },
  };
}

export function Player(name, myGameboard) {
  const returnedCoordinates = [];
  let adjacentHitsSoFar = [];
  return {
    name,
    myTurn: false,
    myGameboard,
    makeRandomMove() {
      adjacentHitsSoFar = [];
      let randomCoordinate = returnRandomCoordinate();
      while (returnedCoordinates.includes(JSON.stringify(randomCoordinate))) {
        randomCoordinate = returnRandomCoordinate();
      }
      returnedCoordinates.push(JSON.stringify(randomCoordinate));
      console.log(returnedCoordinates);
      return randomCoordinate;
    },
    hitAboveSquare() {
      const coordsReturnedSoFar = returnedCoordinates.map((str) =>
        JSON.parse(str)
      );
      const lastCoordValue =
        coordsReturnedSoFar[coordsReturnedSoFar.length - 1];

      adjacentHitsSoFar.push(lastCoordValue); // use this array to get the first adj hit value, so that we can target below square
      console.log(adjacentHitsSoFar);

      let aboveSquare = [lastCoordValue[0], lastCoordValue[1] + 1];
      console.log(aboveSquare);
      const origin = adjacentHitsSoFar[0];
      console.log(`Origin point is: ${origin}`);

      while (
        returnedCoordinates.includes(JSON.stringify(aboveSquare)) ||
        aboveSquare[1] > 10
      ) {
        const blockLower = [origin[0], origin[1] - 1];
        console.log(blockLower);
        if (returnedCoordinates.includes(JSON.stringify(blockLower))) {
          aboveSquare = returnRandomCoordinate();
        } else {
          aboveSquare = blockLower;
        }
      }
      while (aboveSquare[1] < 1) {
        aboveSquare = returnRandomCoordinate();
        while (returnedCoordinates.includes(JSON.stringify(aboveSquare))) {
          aboveSquare = returnRandomCoordinate();
        }
      }
      console.log(aboveSquare);

      returnedCoordinates.push(JSON.stringify(aboveSquare));
      console.log(returnedCoordinates);
      return aboveSquare;
    },
    hitBelowSquare() {
      const coordsReturnedSoFar = returnedCoordinates.map((str) =>
        JSON.parse(str)
      );
      const lastCoordValue =
        coordsReturnedSoFar[coordsReturnedSoFar.length - 1];

      adjacentHitsSoFar.push(lastCoordValue);
      console.log(adjacentHitsSoFar);

      let belowSquare = [lastCoordValue[0], lastCoordValue[1] - 1];
      console.log(belowSquare);
      while (returnedCoordinates.includes(JSON.stringify(belowSquare))) {
        const origin = adjacentHitsSoFar[0];
        const blockLower = [origin[0], origin[1] - 1];
        if (returnedCoordinates.includes(JSON.stringify(blockLower))) {
          belowSquare = returnRandomCoordinate();
        } else {
          belowSquare = blockLower;
        }
      }
      while (belowSquare[1] < 1) {
        console.log('we going sub zero');
        belowSquare = returnRandomCoordinate();
        while (returnedCoordinates.includes(JSON.stringify(belowSquare))) {
          belowSquare = returnRandomCoordinate();
        }
      }
      console.log(belowSquare);

      returnedCoordinates.push(JSON.stringify(belowSquare));
      console.log(returnedCoordinates);
      return belowSquare;
    },
  };
}
