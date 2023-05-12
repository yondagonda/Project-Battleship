/* eslint-disable import/no-cycle */
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
        coordinates = [coordinates[0], coordinates[1] - 1];
        shipArea.push(coordinates);
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
      return randomCoordinate;
    },
    hitAdjacentSquare(direction) {
      const coordsReturnedSoFar = returnedCoordinates.map((str) =>
        JSON.parse(str)
      );
      const lastCoordValue =
        coordsReturnedSoFar[coordsReturnedSoFar.length - 1];
      adjacentHitsSoFar.push(lastCoordValue);
      const origin = adjacentHitsSoFar[0];
      // IF TARGETTING THE SQUARE BELOW
      if (direction === 'above') {
        let aboveSquare = [lastCoordValue[0], lastCoordValue[1] + 1];
        while (
          returnedCoordinates.includes(JSON.stringify(aboveSquare)) ||
          aboveSquare[1] > 10
        ) {
          const blockLower = [origin[0], origin[1] - 1];
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
        returnedCoordinates.push(JSON.stringify(aboveSquare));
        return aboveSquare;
      }
      // IF TARGETTING THE SQUARE ABOVE
      if (direction === 'below') {
        let belowSquare = [lastCoordValue[0], lastCoordValue[1] - 1];
        while (returnedCoordinates.includes(JSON.stringify(belowSquare))) {
          const blockLower = [origin[0], origin[1] - 1];
          if (returnedCoordinates.includes(JSON.stringify(blockLower))) {
            belowSquare = returnRandomCoordinate();
          } else {
            belowSquare = blockLower;
          }
        }
        while (belowSquare[1] < 1) {
          belowSquare = returnRandomCoordinate();
          while (returnedCoordinates.includes(JSON.stringify(belowSquare))) {
            belowSquare = returnRandomCoordinate();
          }
        }
        returnedCoordinates.push(JSON.stringify(belowSquare));
        return belowSquare;
      }
    },
  };
}
