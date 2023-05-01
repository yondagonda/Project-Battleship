/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { displayMissedAttacks, displaySuccessfulHits } from './DOMInteraction';
import { whoseTurnIsIt } from './game';

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
        console.log('SHIP HAS BEEN SUNK');
        // put function here to do something to the sunken ship
      }
    },
  };
}

export function Gameboard() {
  const carrier = CreateShip(5);
  const battleship = CreateShip(4);
  const allShips = [];
  const missedAttacks = [];
  return {
    placeShip(shipType, coordinates) {
      const value = shipType.shipLength;
      console.log(`placing ship at [${coordinates}]`);
      const shipsTail = [coordinates[0], coordinates[1] - (value - 1)];

      if (shipsTail[0] < 1 || shipsTail[1] < 1)
        return console.log('ship placement out of bounds');

      const shipArea = [coordinates];

      while (coordinates[1] !== shipsTail[1]) {
        coordinates = [coordinates[0], coordinates[1] - 1]; // if statements gonna be needed here?
        shipArea.push(coordinates); // this is only for vertical alignment, need another while loop for horizontal?
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
              console.log('You have hit the Carrier');
              found = true;
            }
            if (allShips[i].length === 4) {
              battleship.hit();
              battleship.checkIfSunk();
              console.log('You have hit the Battleship');
              found = true;
            } // put the remaining if statements for the other ship types below
          }
        }
      }
      if (this.checkifAllSunk()) {
        alert(`${whoseTurnIsIt()} has won!`);
      }
      if (found) return 'the hit was successful';

      missedAttacks.push(coordinates);
      // console.log(`Missed attacks:`, missedAttacks);
      if (whoseTurnIsIt() === 'player') {
        displayMissedAttacks(missedAttacks, 'player');
      } else {
        displayMissedAttacks(missedAttacks, 'opponent');
      }

      return 'the attack did not hit anything';
    },
    checkifAllSunk() {
      carrier.checkIfSunk();
      battleship.checkIfSunk(); // do the same for the rest of the other ship types
      if (battleship.sunk && carrier.sunk) return true;
      return false;
    },
    getAllShips() {
      return allShips;
    },
  };
}

export function Player(name, myGameboard) {
  const returnedCoordinates = [];
  return {
    name,
    myTurn: false,
    myGameboard,
    makeRandomMove() {
      let randomCoordinate = [
        Math.floor(Math.random() * 10) + 1,
        Math.floor(Math.random() * 10) + 1,
      ];
      while (returnedCoordinates.includes(JSON.stringify(randomCoordinate))) {
        randomCoordinate = [
          Math.floor(Math.random() * 10) + 1,
          Math.floor(Math.random() * 10) + 1,
        ];
      }
      returnedCoordinates.push(JSON.stringify(randomCoordinate));
      return randomCoordinate;
    },
  };
}
