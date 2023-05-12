/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMInteraction.js":
/*!*******************************!*\
  !*** ./src/DOMInteraction.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObscureComputerShips": () => (/* binding */ ObscureComputerShips),
/* harmony export */   "displayMissedAttacks": () => (/* binding */ displayMissedAttacks),
/* harmony export */   "displaySuccessfulHits": () => (/* binding */ displaySuccessfulHits),
/* harmony export */   "endGame": () => (/* binding */ endGame),
/* harmony export */   "generateGrid": () => (/* binding */ generateGrid),
/* harmony export */   "hideGrid": () => (/* binding */ hideGrid),
/* harmony export */   "renderShip": () => (/* binding */ renderShip),
/* harmony export */   "revealGrid": () => (/* binding */ revealGrid)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */


const startButton = document.querySelector('.start-game');
startButton.addEventListener('click', startGame);
function startGame() {
  startButton.style.display = 'none';
  document.querySelector('.randomise-ships').style.display = 'none';
  hideGrid('player');
  revealGrid('opponent');
  const cell = document.querySelectorAll('td');
  cell.forEach(box => {
    box.addEventListener('click', e => {
      const clickedPos = e.target.dataset.id;
      const result = clickedPos.split(',').map(Number);
      if (___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn === true) {
        ___WEBPACK_IMPORTED_MODULE_0__.player2.myGameboard.receiveAttack(result);
        hideGrid('opponent');
        revealGrid('player');
      }
      (0,_game__WEBPACK_IMPORTED_MODULE_1__.changeTurns)();
      (0,_game__WEBPACK_IMPORTED_MODULE_1__.commenceComputerAttack)();
    });
  });
}
document.querySelector('.randomise-ships').addEventListener('click', () => {
  location.reload();
});
let playerTable = document.querySelector('.player-square');
function generateGrid(playerOrOpponent) {
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
    }
    playerTable.appendChild(row);
  }
}
function endGame() {
  const cells = document.querySelectorAll('td');
  cells.forEach(cell => {
    cell.style.pointerEvents = 'none';
  });
  enablePopup();
}
function hideGrid(grid) {
  let cells = document.querySelectorAll('.player-td');
  let theGrid = document.querySelector('.player-square');
  if (grid === 'opponent') {
    cells = document.querySelectorAll('.opponent-td');
    theGrid = document.querySelector('.opponent-square');
    theGrid.style.pointerEvents = 'none';
  }
  theGrid.style.pointerEvents = 'none';
  cells.forEach(cell => {
    cell.style.border = '1px solid rgba(0, 0, 0, 0.05)';
  });
}
function revealGrid(grid) {
  let cells = document.querySelectorAll('.player-td');
  let theGrid = document.querySelector('.player-square');
  if (grid === 'opponent') {
    cells = document.querySelectorAll('.opponent-td');
    theGrid = document.querySelector('.opponent-square');
    theGrid.style.pointerEvents = 'auto';
  }
  theGrid.style.pointerEvents = 'auto';
  cells.forEach(cell => {
    cell.style.border = '1px solid rgb(0, 0, 0, 0.5)';
  });
}
function renderShip(shipPositions, playerOrOpponent) {
  let cells = document.querySelectorAll('.player-td');
  if (playerOrOpponent === 'opponent') cells = document.querySelectorAll('.opponent-td');
  cells.forEach(cell => {
    shipPositions.forEach(element => {
      const result = element.join(',');
      if (result === cell.dataset.id) {
        cell.style.backgroundColor = 'rgb(90, 90, 224)';
      }
    });
  });
}
function displayMissedAttacks(arr, playerOrOpponent) {
  let cells = document.querySelectorAll('.opponent-td');
  if (playerOrOpponent === 'opponent') cells = document.querySelectorAll('.player-td');
  cells.forEach(cell => {
    arr.forEach(element => {
      const result = element.join(',');
      if (result === cell.dataset.id) {
        cell.style.pointerEvents = 'none';
        cell.innerHTML = 'x';
      }
    });
  });
}
function displaySuccessfulHits(coordinate, playerOrOpponent) {
  let cells = document.querySelectorAll('.opponent-td');
  if (playerOrOpponent === 'opponent') cells = document.querySelectorAll('.player-td');
  const result = coordinate.join(',');
  cells.forEach(cell => {
    if (result === cell.dataset.id) {
      cell.style.backgroundColor = 'red';
      cell.style.pointerEvents = 'none';
      cell.innerHTML = 'x';
    }
  });
}
function ObscureComputerShips() {
  const cells = document.querySelectorAll('.opponent-td');
  cells.forEach(cell => {
    cell.style.backgroundColor = 'white';
  });
}
function enablePopup() {
  const popup = document.querySelector('.popup');
  popup.style.display = 'block';
  const popupText = document.querySelector('.popup-text');
  popupText.innerHTML = `${(0,_game__WEBPACK_IMPORTED_MODULE_1__.whoseTurnIsIt)().toUpperCase()} has won!`;
}
const playAgain = document.querySelector('.play-again');
playAgain.addEventListener('click', () => {
  location.reload();
});

/***/ }),

/***/ "./src/factory.js":
/*!************************!*\
  !*** ./src/factory.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateShip": () => (/* binding */ CreateShip),
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard),
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMInteraction */ "./src/DOMInteraction.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* eslint-disable import/no-cycle */


function CreateShip(shipLength) {
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
    }
  };
}
function Gameboard() {
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
      if (shipsTail[0] < 1 || shipsTail[1] < 1) return console.log('ship placement out of bounds');
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
          if (allShips[i][j][0] === coordinates[0] && allShips[i][j][1] === coordinates[1]) {
            if ((0,_game__WEBPACK_IMPORTED_MODULE_1__.whoseTurnIsIt)() === 'player') {
              (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.displaySuccessfulHits)(coordinates, 'player');
            } else {
              (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.displaySuccessfulHits)(coordinates, 'opponent');
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
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.endGame)();
      }
      if (found) return 'the hit was successful';
      missedAttacks.push(coordinates);
      if ((0,_game__WEBPACK_IMPORTED_MODULE_1__.whoseTurnIsIt)() === 'player') {
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.displayMissedAttacks)(missedAttacks, 'player');
      } else {
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.displayMissedAttacks)(missedAttacks, 'opponent');
      }
      return 'the attack did not hit anything';
    },
    checkifAllSunk() {
      carrier.checkIfSunk();
      battleship.checkIfSunk();
      cruiser.checkIfSunk();
      submarine.checkIfSunk();
      sinkboat.checkIfSunk();
      if (battleship.sunk && carrier.sunk && cruiser.sunk && submarine.sunk && sinkboat.sunk) return true;
      return false;
    }
  };
}
function Player(name, myGameboard) {
  const returnedCoordinates = [];
  let adjacentHitsSoFar = [];
  return {
    name,
    myTurn: false,
    myGameboard,
    makeRandomMove() {
      adjacentHitsSoFar = [];
      let randomCoordinate = (0,_game__WEBPACK_IMPORTED_MODULE_1__.returnRandomCoordinate)();
      while (returnedCoordinates.includes(JSON.stringify(randomCoordinate))) {
        randomCoordinate = (0,_game__WEBPACK_IMPORTED_MODULE_1__.returnRandomCoordinate)();
      }
      returnedCoordinates.push(JSON.stringify(randomCoordinate));
      return randomCoordinate;
    },
    hitAdjacentSquare(direction) {
      const coordsReturnedSoFar = returnedCoordinates.map(str => JSON.parse(str));
      const lastCoordValue = coordsReturnedSoFar[coordsReturnedSoFar.length - 1];
      adjacentHitsSoFar.push(lastCoordValue);
      const origin = adjacentHitsSoFar[0];
      // IF TARGETTING THE SQUARE BELOW
      if (direction === 'above') {
        let aboveSquare = [lastCoordValue[0], lastCoordValue[1] + 1];
        while (returnedCoordinates.includes(JSON.stringify(aboveSquare)) || aboveSquare[1] > 10) {
          const blockLower = [origin[0], origin[1] - 1];
          if (returnedCoordinates.includes(JSON.stringify(blockLower))) {
            aboveSquare = (0,_game__WEBPACK_IMPORTED_MODULE_1__.returnRandomCoordinate)();
          } else {
            aboveSquare = blockLower;
          }
        }
        while (aboveSquare[1] < 1) {
          aboveSquare = (0,_game__WEBPACK_IMPORTED_MODULE_1__.returnRandomCoordinate)();
          while (returnedCoordinates.includes(JSON.stringify(aboveSquare))) {
            aboveSquare = (0,_game__WEBPACK_IMPORTED_MODULE_1__.returnRandomCoordinate)();
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
            belowSquare = (0,_game__WEBPACK_IMPORTED_MODULE_1__.returnRandomCoordinate)();
          } else {
            belowSquare = blockLower;
          }
        }
        while (belowSquare[1] < 1) {
          belowSquare = (0,_game__WEBPACK_IMPORTED_MODULE_1__.returnRandomCoordinate)();
          while (returnedCoordinates.includes(JSON.stringify(belowSquare))) {
            belowSquare = (0,_game__WEBPACK_IMPORTED_MODULE_1__.returnRandomCoordinate)();
          }
        }
        returnedCoordinates.push(JSON.stringify(belowSquare));
        return belowSquare;
      }
    }
  };
}

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeTurns": () => (/* binding */ changeTurns),
/* harmony export */   "commenceComputerAttack": () => (/* binding */ commenceComputerAttack),
/* harmony export */   "randomlyPlaceShips": () => (/* binding */ randomlyPlaceShips),
/* harmony export */   "returnRandomCoordinate": () => (/* binding */ returnRandomCoordinate),
/* harmony export */   "whoseTurnIsIt": () => (/* binding */ whoseTurnIsIt)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMInteraction */ "./src/DOMInteraction.js");
/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factory */ "./src/factory.js");
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */



function changeTurns() {
  if (___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn === true) {
    ___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn = false;
    ___WEBPACK_IMPORTED_MODULE_0__.player2.myTurn = true;
  }
}
let aimForAboveSquare;
let aimforBelowSquare;
function commenceComputerAttack() {
  setTimeout(() => {
    if (aimForAboveSquare) {
      const compAdjAttack = ___WEBPACK_IMPORTED_MODULE_0__.player1.myGameboard.receiveAttack(___WEBPACK_IMPORTED_MODULE_0__.player2.hitAdjacentSquare('above'));
      if (compAdjAttack === 'the hit was successful') {
        ___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn = true;
        ___WEBPACK_IMPORTED_MODULE_0__.player2.myTurn = false;
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.hideGrid)('player');
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.revealGrid)('opponent');
        aimForAboveSquare = true;
        return;
      }
      if (compAdjAttack === 'the attack did not hit anything') {
        ___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn = true;
        ___WEBPACK_IMPORTED_MODULE_0__.player2.myTurn = false;
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.hideGrid)('player');
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.revealGrid)('opponent');
        aimForAboveSquare = false;
        aimforBelowSquare = true;
        return;
      }
    }
    if (aimforBelowSquare) {
      const compBelowAttack = ___WEBPACK_IMPORTED_MODULE_0__.player1.myGameboard.receiveAttack(___WEBPACK_IMPORTED_MODULE_0__.player2.hitAdjacentSquare('below'));
      if (compBelowAttack === 'the hit was successful') {
        ___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn = true;
        ___WEBPACK_IMPORTED_MODULE_0__.player2.myTurn = false;
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.hideGrid)('player');
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.revealGrid)('opponent');
        aimForAboveSquare = false;
        aimforBelowSquare = true;
        return;
      }
      if (compBelowAttack === 'the attack did not hit anything') {
        ___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn = true;
        ___WEBPACK_IMPORTED_MODULE_0__.player2.myTurn = false;
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.hideGrid)('player');
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.revealGrid)('opponent');
        aimForAboveSquare = false;
        aimforBelowSquare = false;
        return;
      }
    }
    aimForAboveSquare = false;
    aimforBelowSquare = false;
    const compAttack = ___WEBPACK_IMPORTED_MODULE_0__.player1.myGameboard.receiveAttack(___WEBPACK_IMPORTED_MODULE_0__.player2.makeRandomMove());
    if (compAttack === 'the hit was successful') {
      aimForAboveSquare = true; // ensures above block will be targeted on next click
    }

    ___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn = true;
    ___WEBPACK_IMPORTED_MODULE_0__.player2.myTurn = false;
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.hideGrid)('player');
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.revealGrid)('opponent');
  }, '400');
}
function randomlyPlaceShips(playerOrComputer) {
  const carrier = (0,_factory__WEBPACK_IMPORTED_MODULE_2__.CreateShip)(5);
  const battleship = (0,_factory__WEBPACK_IMPORTED_MODULE_2__.CreateShip)(4);
  const cruiser = (0,_factory__WEBPACK_IMPORTED_MODULE_2__.CreateShip)(3);
  const submarine = (0,_factory__WEBPACK_IMPORTED_MODULE_2__.CreateShip)(2);
  const sinkboat = (0,_factory__WEBPACK_IMPORTED_MODULE_2__.CreateShip)(1);
  if (playerOrComputer === 'player') {
    const p1carrier = ___WEBPACK_IMPORTED_MODULE_0__.player1.myGameboard.placeShip(carrier, getRandomCoordinate(5));
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.renderShip)(p1carrier, 'player');
    const p1battleship = ___WEBPACK_IMPORTED_MODULE_0__.player1.myGameboard.placeShip(battleship, getRandomCoordinate(4));
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.renderShip)(p1battleship, 'player');
    const p1cruiser = ___WEBPACK_IMPORTED_MODULE_0__.player1.myGameboard.placeShip(cruiser, getRandomCoordinate(3));
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.renderShip)(p1cruiser, 'player');
    const p1submarine = ___WEBPACK_IMPORTED_MODULE_0__.player1.myGameboard.placeShip(submarine, getRandomCoordinate(2));
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.renderShip)(p1submarine, 'player');
    const p1sinkboat = ___WEBPACK_IMPORTED_MODULE_0__.player1.myGameboard.placeShip(sinkboat, getRandomCoordinate(1));
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.renderShip)(p1sinkboat, 'player');
  }
  if (playerOrComputer === 'computer') {
    const p2carrier = ___WEBPACK_IMPORTED_MODULE_0__.player2.myGameboard.placeShip(carrier, getRandomCoordinate(5));
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.renderShip)(p2carrier, 'opponent');
    const p2battleship = ___WEBPACK_IMPORTED_MODULE_0__.player2.myGameboard.placeShip(battleship, getRandomCoordinate(4));
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.renderShip)(p2battleship, 'opponent');
    const p2cruiser = ___WEBPACK_IMPORTED_MODULE_0__.player2.myGameboard.placeShip(cruiser, getRandomCoordinate(3));
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.renderShip)(p2cruiser, 'opponent');
    const p2submarine = ___WEBPACK_IMPORTED_MODULE_0__.player2.myGameboard.placeShip(submarine, getRandomCoordinate(2));
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.renderShip)(p2submarine, 'opponent');
    const p2sinkboat = ___WEBPACK_IMPORTED_MODULE_0__.player2.myGameboard.placeShip(sinkboat, getRandomCoordinate(1));
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.renderShip)(p2sinkboat, 'opponent');
  }
}
function whoseTurnIsIt() {
  if (___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn === true) {
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.hideGrid)('player');
    return 'player';
  }
  (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.hideGrid)('opponent');
  return 'Computer';
}
function returnRandomCoordinate() {
  return [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
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
  const adjacentCoordinates = [[x, y + 1], [x, y - 1], [x + 1, y], [x - 1, y]];
  for (let i = 0; i < adjacentCoordinates.length; i++) {
    const [adjX, adjY] = adjacentCoordinates[i];
    if (isCoordinateUsed([adjX, adjY])) {
      return true;
    }
  }
  return false; // this function ensures the ships generated have atleast one-block distance from eachother
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "player1": () => (/* binding */ player1),
/* harmony export */   "player2": () => (/* binding */ player2)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factory */ "./src/factory.js");
/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOMInteraction */ "./src/DOMInteraction.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* eslint-disable import/no-cycle */




(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.generateGrid)('player');
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.generateGrid)('opponent');
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.hideGrid)('opponent');
const player1gb = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
const player1 = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Player)('Player', player1gb);
player1.myTurn = true;
const player2gb = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
const player2 = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Player)('Computer', player2gb);
(0,_game__WEBPACK_IMPORTED_MODULE_3__.randomlyPlaceShips)('player');
(0,_game__WEBPACK_IMPORTED_MODULE_3__.randomlyPlaceShips)('computer');
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.ObscureComputerShips)();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Rubik&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: var(--ff-primary);\n}\n\n:root {\n  --clr-primary: rgb(64, 64, 235);\n  --clr-accent: rgb(23, 23, 184);\n  --ff-primary: 'Rubik', sans-serif;\n  --ff-secondary: Arial, Helvetica, sans-serif;\n}\n\nh1 {\n  text-align: center;\n  font-family: var(--ff-secondary);\n  padding: 0.8em;\n}\n\n.header {\n  margin-bottom: 4em;\n  background-color: rgb(235, 229, 229);\n  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;\n}\n\nmain {\n  display: flex;\n  gap: 3em;\n  justify-content: center;\n  min-width: 750px;\n}\n\ntd {\n  border: 1px solid rgb(0, 0, 0, 0.5);\n  height: 35px;\n  width: 35px;\n  text-align: center;\n  transform: rotate(270deg);\n  font-size: 1.5em;\n  color: black;\n}\n\ntd:hover {\n  background-color: rgb(190, 188, 188);\n}\n\n.player-square,\n.opponent-square {\n  transform: rotate(270deg);\n  border: 1px thin rgb(29, 28, 28);\n  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;\n}\n\n.buttons {\n  margin-top: 3em;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 1em;\n  width: clamp(10%, 20%, 200px);\n  margin-inline: auto;\n}\n\n.board-name {\n  padding-top: 0.5em;\n}\n\n.randomise-ships,\n.start-game {\n  border: 0;\n  background-color: var(--clr-primary);\n  color: white;\n  padding: 1em;\n  border-radius: 4px;\n  font-weight: bold;\n  font-family: var(--ff-secondary);\n  min-width: 100%;\n  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;\n}\n\n.randomise-ships:hover,\n.start-game:hover {\n  background-color: var(--clr-accent);\n}\n\n.popup {\n  border: 1px solid black;\n  border-radius: 6px;\n  width: 40%;\n  text-align: center;\n  padding: 2em;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: var(--clr-primary);\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,\n    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  gap: 0.8em;\n  display: none;\n}\n\n.popup-text {\n  font-weight: bold;\n}\n\n.play-again {\n  border: 1px solid white;\n  background: transparent;\n  color: white;\n  padding: 0.5em 1.8em;\n  border-radius: 4px;\n  margin-top: 0.8em;\n  font-weight: bold;\n}\n\n.play-again:hover {\n  background-color: var(--clr-accent);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;;;EAGE,sBAAsB;AACxB;;AAEA;EACE,SAAS;EACT,UAAU;EACV,8BAA8B;AAChC;;AAEA;EACE,+BAA+B;EAC/B,8BAA8B;EAC9B,iCAAiC;EACjC,4CAA4C;AAC9C;;AAEA;EACE,kBAAkB;EAClB,gCAAgC;EAChC,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,oCAAoC;EACpC,4EAA4E;AAC9E;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;EACE,mCAAmC;EACnC,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,yBAAyB;EACzB,gBAAgB;EAChB,YAAY;AACd;;AAEA;EACE,oCAAoC;AACtC;;AAEA;;EAEE,yBAAyB;EACzB,gCAAgC;EAChC,4EAA4E;AAC9E;;AAEA;EACE,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,QAAQ;EACR,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;;EAEE,SAAS;EACT,oCAAoC;EACpC,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,gCAAgC;EAChC,eAAe;EACf,4EAA4E;AAC9E;;AAEA;;EAEE,mCAAmC;AACrC;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,UAAU;EACV,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,oCAAoC;EACpC;0CACwC;EACxC,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,UAAU;EACV,aAAa;AACf;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,uBAAuB;EACvB,uBAAuB;EACvB,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,mCAAmC;AACrC","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: var(--ff-primary);\n}\n\n:root {\n  --clr-primary: rgb(64, 64, 235);\n  --clr-accent: rgb(23, 23, 184);\n  --ff-primary: 'Rubik', sans-serif;\n  --ff-secondary: Arial, Helvetica, sans-serif;\n}\n\nh1 {\n  text-align: center;\n  font-family: var(--ff-secondary);\n  padding: 0.8em;\n}\n\n.header {\n  margin-bottom: 4em;\n  background-color: rgb(235, 229, 229);\n  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;\n}\n\nmain {\n  display: flex;\n  gap: 3em;\n  justify-content: center;\n  min-width: 750px;\n}\n\ntd {\n  border: 1px solid rgb(0, 0, 0, 0.5);\n  height: 35px;\n  width: 35px;\n  text-align: center;\n  transform: rotate(270deg);\n  font-size: 1.5em;\n  color: black;\n}\n\ntd:hover {\n  background-color: rgb(190, 188, 188);\n}\n\n.player-square,\n.opponent-square {\n  transform: rotate(270deg);\n  border: 1px thin rgb(29, 28, 28);\n  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;\n}\n\n.buttons {\n  margin-top: 3em;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 1em;\n  width: clamp(10%, 20%, 200px);\n  margin-inline: auto;\n}\n\n.board-name {\n  padding-top: 0.5em;\n}\n\n.randomise-ships,\n.start-game {\n  border: 0;\n  background-color: var(--clr-primary);\n  color: white;\n  padding: 1em;\n  border-radius: 4px;\n  font-weight: bold;\n  font-family: var(--ff-secondary);\n  min-width: 100%;\n  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;\n}\n\n.randomise-ships:hover,\n.start-game:hover {\n  background-color: var(--clr-accent);\n}\n\n.popup {\n  border: 1px solid black;\n  border-radius: 6px;\n  width: 40%;\n  text-align: center;\n  padding: 2em;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: var(--clr-primary);\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,\n    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  gap: 0.8em;\n  display: none;\n}\n\n.popup-text {\n  font-weight: bold;\n}\n\n.play-again {\n  border: 1px solid white;\n  background: transparent;\n  color: white;\n  padding: 0.5em 1.8em;\n  border-radius: 4px;\n  margin-top: 0.8em;\n  font-weight: bold;\n}\n\n.play-again:hover {\n  background-color: var(--clr-accent);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL0RPTUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3J5LmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB7IHBsYXllcjEsIHBsYXllcjIgfSBmcm9tICcuJztcbmltcG9ydCB7IGNoYW5nZVR1cm5zLCBjb21tZW5jZUNvbXB1dGVyQXR0YWNrLCB3aG9zZVR1cm5Jc0l0IH0gZnJvbSAnLi9nYW1lJztcblxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtZ2FtZScpO1xuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIHN0YXJ0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb21pc2Utc2hpcHMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBoaWRlR3JpZCgncGxheWVyJyk7XG4gIHJldmVhbEdyaWQoJ29wcG9uZW50Jyk7XG5cbiAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJyk7XG4gIGNlbGwuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNsaWNrZWRQb3MgPSBlLnRhcmdldC5kYXRhc2V0LmlkO1xuICAgICAgY29uc3QgcmVzdWx0ID0gY2xpY2tlZFBvcy5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xuICAgICAgaWYgKHBsYXllcjEubXlUdXJuID09PSB0cnVlKSB7XG4gICAgICAgIHBsYXllcjIubXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyZXN1bHQpO1xuICAgICAgICBoaWRlR3JpZCgnb3Bwb25lbnQnKTtcbiAgICAgICAgcmV2ZWFsR3JpZCgncGxheWVyJyk7XG4gICAgICB9XG4gICAgICBjaGFuZ2VUdXJucygpO1xuICAgICAgY29tbWVuY2VDb21wdXRlckF0dGFjaygpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhbmRvbWlzZS1zaGlwcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBsb2NhdGlvbi5yZWxvYWQoKTtcbn0pO1xuXG5sZXQgcGxheWVyVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNxdWFyZScpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVHcmlkKHBsYXllck9yT3Bwb25lbnQpIHtcbiAgaWYgKHBsYXllck9yT3Bwb25lbnQgPT09ICdvcHBvbmVudCcpIHtcbiAgICBwbGF5ZXJUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcHBvbmVudC1zcXVhcmUnKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8PSAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ3BsYXllci10ZCc7XG4gICAgICBpZiAocGxheWVyT3JPcHBvbmVudCA9PT0gJ29wcG9uZW50Jykge1xuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdvcHBvbmVudC10ZCc7XG4gICAgICB9XG4gICAgICBjZWxsLmRhdGFzZXQuaWQgPSBbaSwgal07XG4gICAgfVxuICAgIHBsYXllclRhYmxlLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuZEdhbWUoKSB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGQnKTtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgfSk7XG4gIGVuYWJsZVBvcHVwKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlR3JpZChncmlkKSB7XG4gIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcbiAgbGV0IHRoZUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNxdWFyZScpO1xuXG4gIGlmIChncmlkID09PSAnb3Bwb25lbnQnKSB7XG4gICAgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtdGQnKTtcbiAgICB0aGVHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wcG9uZW50LXNxdWFyZScpO1xuICAgIHRoZUdyaWQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgfVxuICB0aGVHcmlkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA1KSc7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZWFsR3JpZChncmlkKSB7XG4gIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcbiAgbGV0IHRoZUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNxdWFyZScpO1xuXG4gIGlmIChncmlkID09PSAnb3Bwb25lbnQnKSB7XG4gICAgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtdGQnKTtcbiAgICB0aGVHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wcG9uZW50LXNxdWFyZScpO1xuICAgIHRoZUdyaWQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgfVxuICB0aGVHcmlkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiKDAsIDAsIDAsIDAuNSknO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNoaXAoc2hpcFBvc2l0aW9ucywgcGxheWVyT3JPcHBvbmVudCkge1xuICBsZXQgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyLXRkJyk7XG4gIGlmIChwbGF5ZXJPck9wcG9uZW50ID09PSAnb3Bwb25lbnQnKVxuICAgIGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wcG9uZW50LXRkJyk7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIHNoaXBQb3NpdGlvbnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZWxlbWVudC5qb2luKCcsJyk7XG4gICAgICBpZiAocmVzdWx0ID09PSBjZWxsLmRhdGFzZXQuaWQpIHtcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDkwLCA5MCwgMjI0KSc7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheU1pc3NlZEF0dGFja3MoYXJyLCBwbGF5ZXJPck9wcG9uZW50KSB7XG4gIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcHBvbmVudC10ZCcpO1xuICBpZiAocGxheWVyT3JPcHBvbmVudCA9PT0gJ29wcG9uZW50JylcbiAgICBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgYXJyLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGVsZW1lbnQuam9pbignLCcpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gY2VsbC5kYXRhc2V0LmlkKSB7XG4gICAgICAgIGNlbGwuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgY2VsbC5pbm5lckhUTUwgPSAneCc7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVN1Y2Nlc3NmdWxIaXRzKGNvb3JkaW5hdGUsIHBsYXllck9yT3Bwb25lbnQpIHtcbiAgbGV0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wcG9uZW50LXRkJyk7XG4gIGlmIChwbGF5ZXJPck9wcG9uZW50ID09PSAnb3Bwb25lbnQnKVxuICAgIGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllci10ZCcpO1xuXG4gIGNvbnN0IHJlc3VsdCA9IGNvb3JkaW5hdGUuam9pbignLCcpO1xuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgaWYgKHJlc3VsdCA9PT0gY2VsbC5kYXRhc2V0LmlkKSB7XG4gICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgY2VsbC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgY2VsbC5pbm5lckhUTUwgPSAneCc7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9ic2N1cmVDb21wdXRlclNoaXBzKCkge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcHBvbmVudC10ZCcpO1xuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZW5hYmxlUG9wdXAoKSB7XG4gIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJyk7XG4gIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gIGNvbnN0IHBvcHVwVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC10ZXh0Jyk7XG4gIHBvcHVwVGV4dC5pbm5lckhUTUwgPSBgJHt3aG9zZVR1cm5Jc0l0KCkudG9VcHBlckNhc2UoKX0gaGFzIHdvbiFgO1xufVxuXG5jb25zdCBwbGF5QWdhaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheS1hZ2FpbicpO1xucGxheUFnYWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBsb2NhdGlvbi5yZWxvYWQoKTtcbn0pO1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQge1xuICBkaXNwbGF5TWlzc2VkQXR0YWNrcyxcbiAgZGlzcGxheVN1Y2Nlc3NmdWxIaXRzLFxuICBlbmRHYW1lLFxufSBmcm9tICcuL0RPTUludGVyYWN0aW9uJztcbmltcG9ydCB7IHdob3NlVHVybklzSXQsIHJldHVyblJhbmRvbUNvb3JkaW5hdGUgfSBmcm9tICcuL2dhbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlU2hpcChzaGlwTGVuZ3RoKSB7XG4gIHJldHVybiB7XG4gICAgc2hpcExlbmd0aCxcbiAgICBoaXRzVGFrZW46IDAsXG4gICAgc3VuazogZmFsc2UsXG4gICAgaGl0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0c1Rha2VuKys7XG4gICAgfSxcbiAgICBjaGVja0lmU3VuaygpIHtcbiAgICAgIGlmICh0aGlzLmhpdHNUYWtlbiA9PT0gc2hpcExlbmd0aCkge1xuICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIGNvbnN0IGNhcnJpZXIgPSBDcmVhdGVTaGlwKDUpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gQ3JlYXRlU2hpcCg0KTtcbiAgY29uc3QgY3J1aXNlciA9IENyZWF0ZVNoaXAoMyk7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IENyZWF0ZVNoaXAoMik7XG4gIGNvbnN0IHNpbmtib2F0ID0gQ3JlYXRlU2hpcCgxKTtcbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcbiAgY29uc3QgbWlzc2VkQXR0YWNrcyA9IFtdO1xuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcChzaGlwVHlwZSwgY29vcmRpbmF0ZXMpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gc2hpcFR5cGUuc2hpcExlbmd0aDtcbiAgICAgIGNvbnN0IHNoaXBzVGFpbCA9IFtjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0gLSAodmFsdWUgLSAxKV07XG5cbiAgICAgIGlmIChzaGlwc1RhaWxbMF0gPCAxIHx8IHNoaXBzVGFpbFsxXSA8IDEpXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnc2hpcCBwbGFjZW1lbnQgb3V0IG9mIGJvdW5kcycpO1xuXG4gICAgICBjb25zdCBzaGlwQXJlYSA9IFtjb29yZGluYXRlc107XG4gICAgICB3aGlsZSAoY29vcmRpbmF0ZXNbMV0gIT09IHNoaXBzVGFpbFsxXSkge1xuICAgICAgICBjb29yZGluYXRlcyA9IFtjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0gLSAxXTtcbiAgICAgICAgc2hpcEFyZWEucHVzaChjb29yZGluYXRlcyk7XG4gICAgICB9XG4gICAgICBhbGxTaGlwcy5wdXNoKHNoaXBBcmVhKTtcbiAgICAgIHJldHVybiBzaGlwQXJlYTtcbiAgICB9LFxuICAgIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxTaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFsbFNoaXBzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgYWxsU2hpcHNbaV1bal1bMF0gPT09IGNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBhbGxTaGlwc1tpXVtqXVsxXSA9PT0gY29vcmRpbmF0ZXNbMV1cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh3aG9zZVR1cm5Jc0l0KCkgPT09ICdwbGF5ZXInKSB7XG4gICAgICAgICAgICAgIGRpc3BsYXlTdWNjZXNzZnVsSGl0cyhjb29yZGluYXRlcywgJ3BsYXllcicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGlzcGxheVN1Y2Nlc3NmdWxIaXRzKGNvb3JkaW5hdGVzLCAnb3Bwb25lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxTaGlwc1tpXS5sZW5ndGggPT09IDUpIHtcbiAgICAgICAgICAgICAgY2Fycmllci5oaXQoKTtcbiAgICAgICAgICAgICAgY2Fycmllci5jaGVja0lmU3VuaygpO1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsU2hpcHNbaV0ubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICAgIGJhdHRsZXNoaXAuaGl0KCk7XG4gICAgICAgICAgICAgIGJhdHRsZXNoaXAuY2hlY2tJZlN1bmsoKTtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbFNoaXBzW2ldLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgICBjcnVpc2VyLmhpdCgpO1xuICAgICAgICAgICAgICBjcnVpc2VyLmNoZWNrSWZTdW5rKCk7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxTaGlwc1tpXS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgc3VibWFyaW5lLmhpdCgpO1xuICAgICAgICAgICAgICBzdWJtYXJpbmUuY2hlY2tJZlN1bmsoKTtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbFNoaXBzW2ldLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICBzaW5rYm9hdC5oaXQoKTtcbiAgICAgICAgICAgICAgc2lua2JvYXQuY2hlY2tJZlN1bmsoKTtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY2hlY2tpZkFsbFN1bmsoKSkge1xuICAgICAgICBlbmRHYW1lKCk7XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiAndGhlIGhpdCB3YXMgc3VjY2Vzc2Z1bCc7XG5cbiAgICAgIG1pc3NlZEF0dGFja3MucHVzaChjb29yZGluYXRlcyk7XG4gICAgICBpZiAod2hvc2VUdXJuSXNJdCgpID09PSAncGxheWVyJykge1xuICAgICAgICBkaXNwbGF5TWlzc2VkQXR0YWNrcyhtaXNzZWRBdHRhY2tzLCAncGxheWVyJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwbGF5TWlzc2VkQXR0YWNrcyhtaXNzZWRBdHRhY2tzLCAnb3Bwb25lbnQnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAndGhlIGF0dGFjayBkaWQgbm90IGhpdCBhbnl0aGluZyc7XG4gICAgfSxcbiAgICBjaGVja2lmQWxsU3VuaygpIHtcbiAgICAgIGNhcnJpZXIuY2hlY2tJZlN1bmsoKTtcbiAgICAgIGJhdHRsZXNoaXAuY2hlY2tJZlN1bmsoKTtcbiAgICAgIGNydWlzZXIuY2hlY2tJZlN1bmsoKTtcbiAgICAgIHN1Ym1hcmluZS5jaGVja0lmU3VuaygpO1xuICAgICAgc2lua2JvYXQuY2hlY2tJZlN1bmsoKTtcbiAgICAgIGlmIChcbiAgICAgICAgYmF0dGxlc2hpcC5zdW5rICYmXG4gICAgICAgIGNhcnJpZXIuc3VuayAmJlxuICAgICAgICBjcnVpc2VyLnN1bmsgJiZcbiAgICAgICAgc3VibWFyaW5lLnN1bmsgJiZcbiAgICAgICAgc2lua2JvYXQuc3Vua1xuICAgICAgKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUGxheWVyKG5hbWUsIG15R2FtZWJvYXJkKSB7XG4gIGNvbnN0IHJldHVybmVkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgbGV0IGFkamFjZW50SGl0c1NvRmFyID0gW107XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBteVR1cm46IGZhbHNlLFxuICAgIG15R2FtZWJvYXJkLFxuICAgIG1ha2VSYW5kb21Nb3ZlKCkge1xuICAgICAgYWRqYWNlbnRIaXRzU29GYXIgPSBbXTtcbiAgICAgIGxldCByYW5kb21Db29yZGluYXRlID0gcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgd2hpbGUgKHJldHVybmVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkocmFuZG9tQ29vcmRpbmF0ZSkpKSB7XG4gICAgICAgIHJhbmRvbUNvb3JkaW5hdGUgPSByZXR1cm5SYW5kb21Db29yZGluYXRlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm5lZENvb3JkaW5hdGVzLnB1c2goSlNPTi5zdHJpbmdpZnkocmFuZG9tQ29vcmRpbmF0ZSkpO1xuICAgICAgcmV0dXJuIHJhbmRvbUNvb3JkaW5hdGU7XG4gICAgfSxcbiAgICBoaXRBZGphY2VudFNxdWFyZShkaXJlY3Rpb24pIHtcbiAgICAgIGNvbnN0IGNvb3Jkc1JldHVybmVkU29GYXIgPSByZXR1cm5lZENvb3JkaW5hdGVzLm1hcCgoc3RyKSA9PlxuICAgICAgICBKU09OLnBhcnNlKHN0cilcbiAgICAgICk7XG4gICAgICBjb25zdCBsYXN0Q29vcmRWYWx1ZSA9XG4gICAgICAgIGNvb3Jkc1JldHVybmVkU29GYXJbY29vcmRzUmV0dXJuZWRTb0Zhci5sZW5ndGggLSAxXTtcbiAgICAgIGFkamFjZW50SGl0c1NvRmFyLnB1c2gobGFzdENvb3JkVmFsdWUpO1xuICAgICAgY29uc3Qgb3JpZ2luID0gYWRqYWNlbnRIaXRzU29GYXJbMF07XG4gICAgICAvLyBJRiBUQVJHRVRUSU5HIFRIRSBTUVVBUkUgQkVMT1dcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdhYm92ZScpIHtcbiAgICAgICAgbGV0IGFib3ZlU3F1YXJlID0gW2xhc3RDb29yZFZhbHVlWzBdLCBsYXN0Q29vcmRWYWx1ZVsxXSArIDFdO1xuICAgICAgICB3aGlsZSAoXG4gICAgICAgICAgcmV0dXJuZWRDb29yZGluYXRlcy5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShhYm92ZVNxdWFyZSkpIHx8XG4gICAgICAgICAgYWJvdmVTcXVhcmVbMV0gPiAxMFxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBibG9ja0xvd2VyID0gW29yaWdpblswXSwgb3JpZ2luWzFdIC0gMV07XG4gICAgICAgICAgaWYgKHJldHVybmVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoYmxvY2tMb3dlcikpKSB7XG4gICAgICAgICAgICBhYm92ZVNxdWFyZSA9IHJldHVyblJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWJvdmVTcXVhcmUgPSBibG9ja0xvd2VyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoYWJvdmVTcXVhcmVbMV0gPCAxKSB7XG4gICAgICAgICAgYWJvdmVTcXVhcmUgPSByZXR1cm5SYW5kb21Db29yZGluYXRlKCk7XG4gICAgICAgICAgd2hpbGUgKHJldHVybmVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoYWJvdmVTcXVhcmUpKSkge1xuICAgICAgICAgICAgYWJvdmVTcXVhcmUgPSByZXR1cm5SYW5kb21Db29yZGluYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybmVkQ29vcmRpbmF0ZXMucHVzaChKU09OLnN0cmluZ2lmeShhYm92ZVNxdWFyZSkpO1xuICAgICAgICByZXR1cm4gYWJvdmVTcXVhcmU7XG4gICAgICB9XG4gICAgICAvLyBJRiBUQVJHRVRUSU5HIFRIRSBTUVVBUkUgQUJPVkVcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdiZWxvdycpIHtcbiAgICAgICAgbGV0IGJlbG93U3F1YXJlID0gW2xhc3RDb29yZFZhbHVlWzBdLCBsYXN0Q29vcmRWYWx1ZVsxXSAtIDFdO1xuICAgICAgICB3aGlsZSAocmV0dXJuZWRDb29yZGluYXRlcy5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShiZWxvd1NxdWFyZSkpKSB7XG4gICAgICAgICAgY29uc3QgYmxvY2tMb3dlciA9IFtvcmlnaW5bMF0sIG9yaWdpblsxXSAtIDFdO1xuICAgICAgICAgIGlmIChyZXR1cm5lZENvb3JkaW5hdGVzLmluY2x1ZGVzKEpTT04uc3RyaW5naWZ5KGJsb2NrTG93ZXIpKSkge1xuICAgICAgICAgICAgYmVsb3dTcXVhcmUgPSByZXR1cm5SYW5kb21Db29yZGluYXRlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJlbG93U3F1YXJlID0gYmxvY2tMb3dlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGJlbG93U3F1YXJlWzFdIDwgMSkge1xuICAgICAgICAgIGJlbG93U3F1YXJlID0gcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgICAgIHdoaWxlIChyZXR1cm5lZENvb3JkaW5hdGVzLmluY2x1ZGVzKEpTT04uc3RyaW5naWZ5KGJlbG93U3F1YXJlKSkpIHtcbiAgICAgICAgICAgIGJlbG93U3F1YXJlID0gcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm5lZENvb3JkaW5hdGVzLnB1c2goSlNPTi5zdHJpbmdpZnkoYmVsb3dTcXVhcmUpKTtcbiAgICAgICAgcmV0dXJuIGJlbG93U3F1YXJlO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgeyBwbGF5ZXIxLCBwbGF5ZXIyIH0gZnJvbSAnLic7XG5pbXBvcnQgeyBoaWRlR3JpZCwgcmV2ZWFsR3JpZCwgcmVuZGVyU2hpcCB9IGZyb20gJy4vRE9NSW50ZXJhY3Rpb24nO1xuaW1wb3J0IHsgQ3JlYXRlU2hpcCB9IGZyb20gJy4vZmFjdG9yeSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VUdXJucygpIHtcbiAgaWYgKHBsYXllcjEubXlUdXJuID09PSB0cnVlKSB7XG4gICAgcGxheWVyMS5teVR1cm4gPSBmYWxzZTtcbiAgICBwbGF5ZXIyLm15VHVybiA9IHRydWU7XG4gIH1cbn1cbmxldCBhaW1Gb3JBYm92ZVNxdWFyZTtcbmxldCBhaW1mb3JCZWxvd1NxdWFyZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1lbmNlQ29tcHV0ZXJBdHRhY2soKSB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChhaW1Gb3JBYm92ZVNxdWFyZSkge1xuICAgICAgY29uc3QgY29tcEFkakF0dGFjayA9IHBsYXllcjEubXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgcGxheWVyMi5oaXRBZGphY2VudFNxdWFyZSgnYWJvdmUnKVxuICAgICAgKTtcbiAgICAgIGlmIChjb21wQWRqQXR0YWNrID09PSAndGhlIGhpdCB3YXMgc3VjY2Vzc2Z1bCcpIHtcbiAgICAgICAgcGxheWVyMS5teVR1cm4gPSB0cnVlO1xuICAgICAgICBwbGF5ZXIyLm15VHVybiA9IGZhbHNlO1xuICAgICAgICBoaWRlR3JpZCgncGxheWVyJyk7XG4gICAgICAgIHJldmVhbEdyaWQoJ29wcG9uZW50Jyk7XG4gICAgICAgIGFpbUZvckFib3ZlU3F1YXJlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGNvbXBBZGpBdHRhY2sgPT09ICd0aGUgYXR0YWNrIGRpZCBub3QgaGl0IGFueXRoaW5nJykge1xuICAgICAgICBwbGF5ZXIxLm15VHVybiA9IHRydWU7XG4gICAgICAgIHBsYXllcjIubXlUdXJuID0gZmFsc2U7XG4gICAgICAgIGhpZGVHcmlkKCdwbGF5ZXInKTtcbiAgICAgICAgcmV2ZWFsR3JpZCgnb3Bwb25lbnQnKTtcbiAgICAgICAgYWltRm9yQWJvdmVTcXVhcmUgPSBmYWxzZTtcbiAgICAgICAgYWltZm9yQmVsb3dTcXVhcmUgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhaW1mb3JCZWxvd1NxdWFyZSkge1xuICAgICAgY29uc3QgY29tcEJlbG93QXR0YWNrID0gcGxheWVyMS5teUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFxuICAgICAgICBwbGF5ZXIyLmhpdEFkamFjZW50U3F1YXJlKCdiZWxvdycpXG4gICAgICApO1xuICAgICAgaWYgKGNvbXBCZWxvd0F0dGFjayA9PT0gJ3RoZSBoaXQgd2FzIHN1Y2Nlc3NmdWwnKSB7XG4gICAgICAgIHBsYXllcjEubXlUdXJuID0gdHJ1ZTtcbiAgICAgICAgcGxheWVyMi5teVR1cm4gPSBmYWxzZTtcbiAgICAgICAgaGlkZUdyaWQoJ3BsYXllcicpO1xuICAgICAgICByZXZlYWxHcmlkKCdvcHBvbmVudCcpO1xuICAgICAgICBhaW1Gb3JBYm92ZVNxdWFyZSA9IGZhbHNlO1xuICAgICAgICBhaW1mb3JCZWxvd1NxdWFyZSA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChjb21wQmVsb3dBdHRhY2sgPT09ICd0aGUgYXR0YWNrIGRpZCBub3QgaGl0IGFueXRoaW5nJykge1xuICAgICAgICBwbGF5ZXIxLm15VHVybiA9IHRydWU7XG4gICAgICAgIHBsYXllcjIubXlUdXJuID0gZmFsc2U7XG4gICAgICAgIGhpZGVHcmlkKCdwbGF5ZXInKTtcbiAgICAgICAgcmV2ZWFsR3JpZCgnb3Bwb25lbnQnKTtcbiAgICAgICAgYWltRm9yQWJvdmVTcXVhcmUgPSBmYWxzZTtcbiAgICAgICAgYWltZm9yQmVsb3dTcXVhcmUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBhaW1Gb3JBYm92ZVNxdWFyZSA9IGZhbHNlO1xuICAgIGFpbWZvckJlbG93U3F1YXJlID0gZmFsc2U7XG4gICAgY29uc3QgY29tcEF0dGFjayA9IHBsYXllcjEubXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgIHBsYXllcjIubWFrZVJhbmRvbU1vdmUoKVxuICAgICk7XG4gICAgaWYgKGNvbXBBdHRhY2sgPT09ICd0aGUgaGl0IHdhcyBzdWNjZXNzZnVsJykge1xuICAgICAgYWltRm9yQWJvdmVTcXVhcmUgPSB0cnVlOyAvLyBlbnN1cmVzIGFib3ZlIGJsb2NrIHdpbGwgYmUgdGFyZ2V0ZWQgb24gbmV4dCBjbGlja1xuICAgIH1cbiAgICBwbGF5ZXIxLm15VHVybiA9IHRydWU7XG4gICAgcGxheWVyMi5teVR1cm4gPSBmYWxzZTtcbiAgICBoaWRlR3JpZCgncGxheWVyJyk7XG4gICAgcmV2ZWFsR3JpZCgnb3Bwb25lbnQnKTtcbiAgfSwgJzQwMCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tbHlQbGFjZVNoaXBzKHBsYXllck9yQ29tcHV0ZXIpIHtcbiAgY29uc3QgY2FycmllciA9IENyZWF0ZVNoaXAoNSk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBDcmVhdGVTaGlwKDQpO1xuICBjb25zdCBjcnVpc2VyID0gQ3JlYXRlU2hpcCgzKTtcbiAgY29uc3Qgc3VibWFyaW5lID0gQ3JlYXRlU2hpcCgyKTtcbiAgY29uc3Qgc2lua2JvYXQgPSBDcmVhdGVTaGlwKDEpO1xuXG4gIGlmIChwbGF5ZXJPckNvbXB1dGVyID09PSAncGxheWVyJykge1xuICAgIGNvbnN0IHAxY2FycmllciA9IHBsYXllcjEubXlHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgY2FycmllcixcbiAgICAgIGdldFJhbmRvbUNvb3JkaW5hdGUoNSlcbiAgICApO1xuICAgIHJlbmRlclNoaXAocDFjYXJyaWVyLCAncGxheWVyJyk7XG4gICAgY29uc3QgcDFiYXR0bGVzaGlwID0gcGxheWVyMS5teUdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICBiYXR0bGVzaGlwLFxuICAgICAgZ2V0UmFuZG9tQ29vcmRpbmF0ZSg0KVxuICAgICk7XG4gICAgcmVuZGVyU2hpcChwMWJhdHRsZXNoaXAsICdwbGF5ZXInKTtcbiAgICBjb25zdCBwMWNydWlzZXIgPSBwbGF5ZXIxLm15R2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICAgIGNydWlzZXIsXG4gICAgICBnZXRSYW5kb21Db29yZGluYXRlKDMpXG4gICAgKTtcbiAgICByZW5kZXJTaGlwKHAxY3J1aXNlciwgJ3BsYXllcicpO1xuICAgIGNvbnN0IHAxc3VibWFyaW5lID0gcGxheWVyMS5teUdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICBzdWJtYXJpbmUsXG4gICAgICBnZXRSYW5kb21Db29yZGluYXRlKDIpXG4gICAgKTtcbiAgICByZW5kZXJTaGlwKHAxc3VibWFyaW5lLCAncGxheWVyJyk7XG4gICAgY29uc3QgcDFzaW5rYm9hdCA9IHBsYXllcjEubXlHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgc2lua2JvYXQsXG4gICAgICBnZXRSYW5kb21Db29yZGluYXRlKDEpXG4gICAgKTtcbiAgICByZW5kZXJTaGlwKHAxc2lua2JvYXQsICdwbGF5ZXInKTtcbiAgfVxuICBpZiAocGxheWVyT3JDb21wdXRlciA9PT0gJ2NvbXB1dGVyJykge1xuICAgIGNvbnN0IHAyY2FycmllciA9IHBsYXllcjIubXlHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgY2FycmllcixcbiAgICAgIGdldFJhbmRvbUNvb3JkaW5hdGUoNSlcbiAgICApO1xuICAgIHJlbmRlclNoaXAocDJjYXJyaWVyLCAnb3Bwb25lbnQnKTtcbiAgICBjb25zdCBwMmJhdHRsZXNoaXAgPSBwbGF5ZXIyLm15R2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICAgIGJhdHRsZXNoaXAsXG4gICAgICBnZXRSYW5kb21Db29yZGluYXRlKDQpXG4gICAgKTtcbiAgICByZW5kZXJTaGlwKHAyYmF0dGxlc2hpcCwgJ29wcG9uZW50Jyk7XG4gICAgY29uc3QgcDJjcnVpc2VyID0gcGxheWVyMi5teUdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICBjcnVpc2VyLFxuICAgICAgZ2V0UmFuZG9tQ29vcmRpbmF0ZSgzKVxuICAgICk7XG4gICAgcmVuZGVyU2hpcChwMmNydWlzZXIsICdvcHBvbmVudCcpO1xuICAgIGNvbnN0IHAyc3VibWFyaW5lID0gcGxheWVyMi5teUdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICBzdWJtYXJpbmUsXG4gICAgICBnZXRSYW5kb21Db29yZGluYXRlKDIpXG4gICAgKTtcbiAgICByZW5kZXJTaGlwKHAyc3VibWFyaW5lLCAnb3Bwb25lbnQnKTtcbiAgICBjb25zdCBwMnNpbmtib2F0ID0gcGxheWVyMi5teUdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICBzaW5rYm9hdCxcbiAgICAgIGdldFJhbmRvbUNvb3JkaW5hdGUoMSlcbiAgICApO1xuICAgIHJlbmRlclNoaXAocDJzaW5rYm9hdCwgJ29wcG9uZW50Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdob3NlVHVybklzSXQoKSB7XG4gIGlmIChwbGF5ZXIxLm15VHVybiA9PT0gdHJ1ZSkge1xuICAgIGhpZGVHcmlkKCdwbGF5ZXInKTtcbiAgICByZXR1cm4gJ3BsYXllcic7XG4gIH1cbiAgaGlkZUdyaWQoJ29wcG9uZW50Jyk7XG4gIHJldHVybiAnQ29tcHV0ZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSgpIHtcbiAgcmV0dXJuIFtcbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxLFxuICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEsXG4gIF07XG59XG5cbmNvbnN0IHVzZWRDb29yZGluYXRlcyA9IFtdO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21Db29yZGluYXRlKHNoaXBMZW5ndGgpIHtcbiAgY29uc3QgcG9zc2libGVDb29yZGluYXRlcyA9IFtdO1xuICBmb3IgKGxldCB4ID0gMTsgeCA8PSAxMDsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDE7IHkgPD0gMTA7IHkrKykge1xuICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgIGlmICh5ICsgMSAtIHNoaXBMZW5ndGggPj0gMSkge1xuICAgICAgICAvLyBlbnN1cmUgc2hpcCB0YWlsIHdvbnQgZ28gb3V0IG9mIGJvdW5kcywgZS5nLiBDb29yZFsxXSA9Lz0gLTFcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjb29yZGluYXRlID0gW3gsIHkgLSBpXTtcbiAgICAgICAgICBpZiAoaXNDb29yZGluYXRlVXNlZChjb29yZGluYXRlKSB8fCBoYXNBZGphY2VudFNoaXAoY29vcmRpbmF0ZSkpIHtcbiAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgcG9zc2libGVDb29yZGluYXRlcy5wdXNoKFt4LCB5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGVDb29yZGluYXRlcy5sZW5ndGgpO1xuICBjb25zdCBjb29yZGluYXRlID0gcG9zc2libGVDb29yZGluYXRlc1tpbmRleF07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgW3gsIHldID0gW2Nvb3JkaW5hdGVbMF0sIGNvb3JkaW5hdGVbMV0gLSBpXTsgLy8gY2F1c2VzIGVycm9yIHNvbWV0aW1lcyBvbiByZWZyZXNoXG4gICAgdXNlZENvb3JkaW5hdGVzLnB1c2goW3gsIHldKTtcbiAgfVxuICByZXR1cm4gY29vcmRpbmF0ZTtcbn1cblxuZnVuY3Rpb24gaXNDb29yZGluYXRlVXNlZChjb29yZGluYXRlKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXNlZENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgW3gsIHldID0gdXNlZENvb3JkaW5hdGVzW2ldO1xuICAgIGlmICh4ID09PSBjb29yZGluYXRlWzBdICYmIHkgPT09IGNvb3JkaW5hdGVbMV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGhhc0FkamFjZW50U2hpcChjb29yZGluYXRlKSB7XG4gIGNvbnN0IFt4LCB5XSA9IGNvb3JkaW5hdGU7XG4gIGNvbnN0IGFkamFjZW50Q29vcmRpbmF0ZXMgPSBbXG4gICAgW3gsIHkgKyAxXSxcbiAgICBbeCwgeSAtIDFdLFxuICAgIFt4ICsgMSwgeV0sXG4gICAgW3ggLSAxLCB5XSxcbiAgXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZGphY2VudENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgW2FkalgsIGFkalldID0gYWRqYWNlbnRDb29yZGluYXRlc1tpXTtcbiAgICBpZiAoaXNDb29yZGluYXRlVXNlZChbYWRqWCwgYWRqWV0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlOyAvLyB0aGlzIGZ1bmN0aW9uIGVuc3VyZXMgdGhlIHNoaXBzIGdlbmVyYXRlZCBoYXZlIGF0bGVhc3Qgb25lLWJsb2NrIGRpc3RhbmNlIGZyb20gZWFjaG90aGVyXG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgR2FtZWJvYXJkLCBQbGF5ZXIgfSBmcm9tICcuL2ZhY3RvcnknO1xuaW1wb3J0IHsgZ2VuZXJhdGVHcmlkLCBoaWRlR3JpZCwgT2JzY3VyZUNvbXB1dGVyU2hpcHMgfSBmcm9tICcuL0RPTUludGVyYWN0aW9uJztcbmltcG9ydCB7IHJhbmRvbWx5UGxhY2VTaGlwcyB9IGZyb20gJy4vZ2FtZSc7XG5cbmdlbmVyYXRlR3JpZCgncGxheWVyJyk7XG5nZW5lcmF0ZUdyaWQoJ29wcG9uZW50Jyk7XG5cbmhpZGVHcmlkKCdvcHBvbmVudCcpO1xuXG5jb25zdCBwbGF5ZXIxZ2IgPSBHYW1lYm9hcmQoKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIxID0gUGxheWVyKCdQbGF5ZXInLCBwbGF5ZXIxZ2IpO1xucGxheWVyMS5teVR1cm4gPSB0cnVlO1xuXG5jb25zdCBwbGF5ZXIyZ2IgPSBHYW1lYm9hcmQoKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIyID0gUGxheWVyKCdDb21wdXRlcicsIHBsYXllcjJnYik7XG5cbnJhbmRvbWx5UGxhY2VTaGlwcygncGxheWVyJyk7XG5yYW5kb21seVBsYWNlU2hpcHMoJ2NvbXB1dGVyJyk7XG5cbk9ic2N1cmVDb21wdXRlclNoaXBzKCk7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJ1YmlrJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1mZi1wcmltYXJ5KTtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1jbHItcHJpbWFyeTogcmdiKDY0LCA2NCwgMjM1KTtcXG4gIC0tY2xyLWFjY2VudDogcmdiKDIzLCAyMywgMTg0KTtcXG4gIC0tZmYtcHJpbWFyeTogJ1J1YmlrJywgc2Fucy1zZXJpZjtcXG4gIC0tZmYtc2Vjb25kYXJ5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5oMSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LWZhbWlseTogdmFyKC0tZmYtc2Vjb25kYXJ5KTtcXG4gIHBhZGRpbmc6IDAuOGVtO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gIG1hcmdpbi1ib3R0b206IDRlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzUsIDIyOSwgMjI5KTtcXG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xMikgMHB4IDFweCAzcHgsIHJnYmEoMCwgMCwgMCwgMC4yNCkgMHB4IDFweCAycHg7XFxufVxcblxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogM2VtO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBtaW4td2lkdGg6IDc1MHB4O1xcbn1cXG5cXG50ZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCwgMC41KTtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiAzNXB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG4gIGZvbnQtc2l6ZTogMS41ZW07XFxuICBjb2xvcjogYmxhY2s7XFxufVxcblxcbnRkOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTAsIDE4OCwgMTg4KTtcXG59XFxuXFxuLnBsYXllci1zcXVhcmUsXFxuLm9wcG9uZW50LXNxdWFyZSB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgYm9yZGVyOiAxcHggdGhpbiByZ2IoMjksIDI4LCAyOCk7XFxuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMTIpIDBweCAxcHggM3B4LCByZ2JhKDAsIDAsIDAsIDAuMjQpIDBweCAxcHggMnB4O1xcbn1cXG5cXG4uYnV0dG9ucyB7XFxuICBtYXJnaW4tdG9wOiAzZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDFlbTtcXG4gIHdpZHRoOiBjbGFtcCgxMCUsIDIwJSwgMjAwcHgpO1xcbiAgbWFyZ2luLWlubGluZTogYXV0bztcXG59XFxuXFxuLmJvYXJkLW5hbWUge1xcbiAgcGFkZGluZy10b3A6IDAuNWVtO1xcbn1cXG5cXG4ucmFuZG9taXNlLXNoaXBzLFxcbi5zdGFydC1nYW1lIHtcXG4gIGJvcmRlcjogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1wcmltYXJ5KTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZmLXNlY29uZGFyeSk7XFxuICBtaW4td2lkdGg6IDEwMCU7XFxuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMTYpIDBweCAzcHggNnB4LCByZ2JhKDAsIDAsIDAsIDAuMjMpIDBweCAzcHggNnB4O1xcbn1cXG5cXG4ucmFuZG9taXNlLXNoaXBzOmhvdmVyLFxcbi5zdGFydC1nYW1lOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1hY2NlbnQpO1xcbn1cXG5cXG4ucG9wdXAge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICB3aWR0aDogNDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMmVtO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1wcmltYXJ5KTtcXG4gIGJveC1zaGFkb3c6IHJnYmEoNTAsIDUwLCA5MywgMC4yNSkgMHB4IDMwcHggNjBweCAtMTJweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjMpIDBweCAxOHB4IDM2cHggLTE4cHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMC44ZW07XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4ucG9wdXAtdGV4dCB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLnBsYXktYWdhaW4ge1xcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDAuNWVtIDEuOGVtO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgbWFyZ2luLXRvcDogMC44ZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLnBsYXktYWdhaW46aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWFjY2VudCk7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7OztFQUdFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1YsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsK0JBQStCO0VBQy9CLDhCQUE4QjtFQUM5QixpQ0FBaUM7RUFDakMsNENBQTRDO0FBQzlDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdDQUFnQztFQUNoQyxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG9DQUFvQztFQUNwQyw0RUFBNEU7QUFDOUU7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsUUFBUTtFQUNSLHVCQUF1QjtFQUN2QixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxtQ0FBbUM7RUFDbkMsWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxvQ0FBb0M7QUFDdEM7O0FBRUE7O0VBRUUseUJBQXlCO0VBQ3pCLGdDQUFnQztFQUNoQyw0RUFBNEU7QUFDOUU7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsUUFBUTtFQUNSLDZCQUE2QjtFQUM3QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7O0VBRUUsU0FBUztFQUNULG9DQUFvQztFQUNwQyxZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsZ0NBQWdDO0VBQ2hDLGVBQWU7RUFDZiw0RUFBNEU7QUFDOUU7O0FBRUE7O0VBRUUsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1Ysa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixlQUFlO0VBQ2YsUUFBUTtFQUNSLFNBQVM7RUFDVCxnQ0FBZ0M7RUFDaEMsb0NBQW9DO0VBQ3BDOzBDQUN3QztFQUN4QyxZQUFZO0VBQ1osYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixVQUFVO0VBQ1YsYUFBYTtBQUNmOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJ1YmlrJmRpc3BsYXk9c3dhcCcpO1xcblxcbiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1mZi1wcmltYXJ5KTtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1jbHItcHJpbWFyeTogcmdiKDY0LCA2NCwgMjM1KTtcXG4gIC0tY2xyLWFjY2VudDogcmdiKDIzLCAyMywgMTg0KTtcXG4gIC0tZmYtcHJpbWFyeTogJ1J1YmlrJywgc2Fucy1zZXJpZjtcXG4gIC0tZmYtc2Vjb25kYXJ5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5oMSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LWZhbWlseTogdmFyKC0tZmYtc2Vjb25kYXJ5KTtcXG4gIHBhZGRpbmc6IDAuOGVtO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gIG1hcmdpbi1ib3R0b206IDRlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzUsIDIyOSwgMjI5KTtcXG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xMikgMHB4IDFweCAzcHgsIHJnYmEoMCwgMCwgMCwgMC4yNCkgMHB4IDFweCAycHg7XFxufVxcblxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogM2VtO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBtaW4td2lkdGg6IDc1MHB4O1xcbn1cXG5cXG50ZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCwgMC41KTtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiAzNXB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG4gIGZvbnQtc2l6ZTogMS41ZW07XFxuICBjb2xvcjogYmxhY2s7XFxufVxcblxcbnRkOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTAsIDE4OCwgMTg4KTtcXG59XFxuXFxuLnBsYXllci1zcXVhcmUsXFxuLm9wcG9uZW50LXNxdWFyZSB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgYm9yZGVyOiAxcHggdGhpbiByZ2IoMjksIDI4LCAyOCk7XFxuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMTIpIDBweCAxcHggM3B4LCByZ2JhKDAsIDAsIDAsIDAuMjQpIDBweCAxcHggMnB4O1xcbn1cXG5cXG4uYnV0dG9ucyB7XFxuICBtYXJnaW4tdG9wOiAzZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDFlbTtcXG4gIHdpZHRoOiBjbGFtcCgxMCUsIDIwJSwgMjAwcHgpO1xcbiAgbWFyZ2luLWlubGluZTogYXV0bztcXG59XFxuXFxuLmJvYXJkLW5hbWUge1xcbiAgcGFkZGluZy10b3A6IDAuNWVtO1xcbn1cXG5cXG4ucmFuZG9taXNlLXNoaXBzLFxcbi5zdGFydC1nYW1lIHtcXG4gIGJvcmRlcjogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1wcmltYXJ5KTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDFlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZmLXNlY29uZGFyeSk7XFxuICBtaW4td2lkdGg6IDEwMCU7XFxuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMTYpIDBweCAzcHggNnB4LCByZ2JhKDAsIDAsIDAsIDAuMjMpIDBweCAzcHggNnB4O1xcbn1cXG5cXG4ucmFuZG9taXNlLXNoaXBzOmhvdmVyLFxcbi5zdGFydC1nYW1lOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1hY2NlbnQpO1xcbn1cXG5cXG4ucG9wdXAge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxuICB3aWR0aDogNDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZzogMmVtO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1wcmltYXJ5KTtcXG4gIGJveC1zaGFkb3c6IHJnYmEoNTAsIDUwLCA5MywgMC4yNSkgMHB4IDMwcHggNjBweCAtMTJweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjMpIDBweCAxOHB4IDM2cHggLTE4cHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMC44ZW07XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4ucG9wdXAtdGV4dCB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLnBsYXktYWdhaW4ge1xcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDAuNWVtIDEuOGVtO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgbWFyZ2luLXRvcDogMC44ZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLnBsYXktYWdhaW46aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWFjY2VudCk7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJwbGF5ZXIxIiwicGxheWVyMiIsImNoYW5nZVR1cm5zIiwiY29tbWVuY2VDb21wdXRlckF0dGFjayIsIndob3NlVHVybklzSXQiLCJzdGFydEJ1dHRvbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydEdhbWUiLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlR3JpZCIsInJldmVhbEdyaWQiLCJjZWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJib3giLCJlIiwiY2xpY2tlZFBvcyIsInRhcmdldCIsImRhdGFzZXQiLCJpZCIsInJlc3VsdCIsInNwbGl0IiwibWFwIiwiTnVtYmVyIiwibXlUdXJuIiwibXlHYW1lYm9hcmQiLCJyZWNlaXZlQXR0YWNrIiwibG9jYXRpb24iLCJyZWxvYWQiLCJwbGF5ZXJUYWJsZSIsImdlbmVyYXRlR3JpZCIsInBsYXllck9yT3Bwb25lbnQiLCJpIiwicm93IiwiY3JlYXRlRWxlbWVudCIsImoiLCJhcHBlbmRDaGlsZCIsImNsYXNzTmFtZSIsImVuZEdhbWUiLCJjZWxscyIsInBvaW50ZXJFdmVudHMiLCJlbmFibGVQb3B1cCIsImdyaWQiLCJ0aGVHcmlkIiwiYm9yZGVyIiwicmVuZGVyU2hpcCIsInNoaXBQb3NpdGlvbnMiLCJlbGVtZW50Iiwiam9pbiIsImJhY2tncm91bmRDb2xvciIsImRpc3BsYXlNaXNzZWRBdHRhY2tzIiwiYXJyIiwiaW5uZXJIVE1MIiwiZGlzcGxheVN1Y2Nlc3NmdWxIaXRzIiwiY29vcmRpbmF0ZSIsIk9ic2N1cmVDb21wdXRlclNoaXBzIiwicG9wdXAiLCJwb3B1cFRleHQiLCJ0b1VwcGVyQ2FzZSIsInBsYXlBZ2FpbiIsInJldHVyblJhbmRvbUNvb3JkaW5hdGUiLCJDcmVhdGVTaGlwIiwic2hpcExlbmd0aCIsImhpdHNUYWtlbiIsInN1bmsiLCJoaXQiLCJjaGVja0lmU3VuayIsIkdhbWVib2FyZCIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiY3J1aXNlciIsInN1Ym1hcmluZSIsInNpbmtib2F0IiwiYWxsU2hpcHMiLCJtaXNzZWRBdHRhY2tzIiwicGxhY2VTaGlwIiwic2hpcFR5cGUiLCJjb29yZGluYXRlcyIsInZhbHVlIiwic2hpcHNUYWlsIiwiY29uc29sZSIsImxvZyIsInNoaXBBcmVhIiwicHVzaCIsImZvdW5kIiwibGVuZ3RoIiwiY2hlY2tpZkFsbFN1bmsiLCJQbGF5ZXIiLCJuYW1lIiwicmV0dXJuZWRDb29yZGluYXRlcyIsImFkamFjZW50SGl0c1NvRmFyIiwibWFrZVJhbmRvbU1vdmUiLCJyYW5kb21Db29yZGluYXRlIiwiaW5jbHVkZXMiLCJKU09OIiwic3RyaW5naWZ5IiwiaGl0QWRqYWNlbnRTcXVhcmUiLCJkaXJlY3Rpb24iLCJjb29yZHNSZXR1cm5lZFNvRmFyIiwic3RyIiwicGFyc2UiLCJsYXN0Q29vcmRWYWx1ZSIsIm9yaWdpbiIsImFib3ZlU3F1YXJlIiwiYmxvY2tMb3dlciIsImJlbG93U3F1YXJlIiwiYWltRm9yQWJvdmVTcXVhcmUiLCJhaW1mb3JCZWxvd1NxdWFyZSIsInNldFRpbWVvdXQiLCJjb21wQWRqQXR0YWNrIiwiY29tcEJlbG93QXR0YWNrIiwiY29tcEF0dGFjayIsInJhbmRvbWx5UGxhY2VTaGlwcyIsInBsYXllck9yQ29tcHV0ZXIiLCJwMWNhcnJpZXIiLCJnZXRSYW5kb21Db29yZGluYXRlIiwicDFiYXR0bGVzaGlwIiwicDFjcnVpc2VyIiwicDFzdWJtYXJpbmUiLCJwMXNpbmtib2F0IiwicDJjYXJyaWVyIiwicDJiYXR0bGVzaGlwIiwicDJjcnVpc2VyIiwicDJzdWJtYXJpbmUiLCJwMnNpbmtib2F0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidXNlZENvb3JkaW5hdGVzIiwicG9zc2libGVDb29yZGluYXRlcyIsIngiLCJ5IiwidmFsaWQiLCJpc0Nvb3JkaW5hdGVVc2VkIiwiaGFzQWRqYWNlbnRTaGlwIiwiaW5kZXgiLCJhZGphY2VudENvb3JkaW5hdGVzIiwiYWRqWCIsImFkalkiLCJwbGF5ZXIxZ2IiLCJwbGF5ZXIyZ2IiXSwic291cmNlUm9vdCI6IiJ9