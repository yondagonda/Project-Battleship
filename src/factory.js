/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

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
        console.log('ship has been sunk');
      } else console.log('not sunk yet');
    },
  };
}

export function Gameboard() {
  const carrier = CreateShip(5);
  const battleship = CreateShip(4);
  const allShips = []; // this will contain coordinates of all the ships that are currently present on the gameboard
  const missedAttacks = []; // stores all attacks missed
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
      console.log('The current positions of all ships on the board:', allShips);
      let found = false;
      for (let i = 0; i < allShips.length; i++) {
        for (let j = 0; j < allShips[i].length; j++) {
          // console.log(allShips[i][j]);
          if (
            allShips[i][j][0] === coordinates[0] &&
            allShips[i][j][1] === coordinates[1]
          ) {
            console.log('This attack hits a part of the ship:', allShips[i]);
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
      console.log(`Missed attacks so far:`, missedAttacks);
      return 'the attack did not hit anything';
    },
    checkifAllSunk() {
      carrier.checkIfSunk();
      battleship.checkIfSunk(); // do the same for the rest of the other ship types
      if (battleship.sunk && carrier.sunk) return 'All ships have been sunk!';
      return 'There are still ships remaining';
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

export function Player(name, myGameboard) {
  const returnedCoordinates = []; // ensure random moves made wont repeat
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
  }; // put OpponentGameBoard as another function parameter?
}
