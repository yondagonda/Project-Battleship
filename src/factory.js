/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

export function createShip(shipLength) {
  return {
    shipLength,
    hitsTaken: 0,
    sunk: false,
    hit() {
      // hit only registers when clicked on the DOM, it is actually a part of the ship being clicked on
      // e.g. if (clickedLocation === shipCoordinate) return this.hitsTaken++
      // or alternatively, make it so hit() only executes when a specific part of the DOM is pressed
      return this.hitsTaken++;
    },
    checkIfSunk() {
      if (this.hitsTaken === shipLength) {
        this.sunk = true;
        console.log('ship has been sunk');
      } else console.log('not sunk yet'); // take methods outside of factory function?
    },
  };
}

export function Gameboard() {
  const carrier = createShip(5);
  console.log(carrier);
  const battleship = createShip(4);
  const allShips = []; // this will contain coordinates of all the ships that are currently present on the gameboard
  const missedAttacks = [];
  return {
    placeShip(shipType, coordinates) {
      const value = shipType.shipLength;
      console.log(`placing ship at [${coordinates}]`);
      // for the coordinates parameter, the value would actually be the clicked square on the DOM
      const shipsTail = [coordinates[0], coordinates[1] - (value - 1)];

      if (shipsTail[0] < 1 || shipsTail[1] < 1)
        return console.log('ship placement out of bounds');

      console.log(`tail of ship will be [${shipsTail}]`);

      const shipArea = [coordinates];

      while (coordinates[1] !== shipsTail[1]) {
        coordinates = [coordinates[0], coordinates[1] - 1]; // if statements gonna be needed here?
        shipArea.push(coordinates); // this is only for vertical alignment, need another while loop for horizontal?
      }
      allShips.push(shipArea);
      return shipArea;
    },
    receiveAttack(coordinates) {
      console.log(allShips);
      let found = false;
      for (let i = 0; i < allShips.length; i++) {
        for (let j = 0; j < allShips[i].length; j++) {
          console.log(allShips[i][j]);
          if (
            allShips[i][j][0] === coordinates[0] &&
            allShips[i][j][1] === coordinates[1]
          ) {
            console.log(allShips[i]);
            if (allShips[i].length === 5) {
              carrier.hit();
              console.log(carrier);
              console.log('youve hit the Carrier');
              found = true;
            }
            if (allShips[i].length === 4) {
              battleship.hit();
              console.log(battleship);
              console.log('youve hit the Battleship');
              found = true;
            } // put the remaining if statements for the other ship types below
          }
        }
      }
      if (found) return 'the hit was successful';

      missedAttacks.push(coordinates);
      console.log(`missed attacks so far:`, missedAttacks);
      return 'the attack did not hit anything';
    },
    checkifAllSunk() {
      console.log(allShips);
      if (allShips.length === 0) return 'All ships have been sunk';
      return 'Ships stil remaining';
    },
  };
}

// Game function: ships can only be placed vertically at first, with a rotate button available after
// ships need to have a 'head' of sorts, which will serve as its axis point of rotation and cursor placeholder

// Carrier: length 5
// Battleship: length 4
// Cruiser: length 3
// Submarine: length 3
// Destroyer: length 2
