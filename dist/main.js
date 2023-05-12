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
        cell.innerHTML = '❌';
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
      cell.innerHTML = '❌';
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
___CSS_LOADER_EXPORT___.push([module.id, "*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: var(--ff-primary);\n}\n\n:root {\n  --clr-primary: rgb(64, 64, 235);\n  --clr-accent: rgb(23, 23, 184);\n  --ff-primary: 'Rubik', sans-serif;\n  --ff-secondary: Arial, Helvetica, sans-serif;\n}\n\nh1 {\n  text-align: center;\n  font-family: var(--ff-secondary);\n  padding: 0.8em;\n}\n\n.header {\n  margin-bottom: 4em;\n  background-color: rgb(235, 229, 229);\n  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;\n}\n\nmain {\n  display: flex;\n  gap: 3em;\n  justify-content: center;\n}\n\ntd {\n  border: 1px solid rgb(0, 0, 0, 0.5);\n  height: 35px;\n  width: 35px;\n  text-align: center;\n  transform: rotate(270deg);\n  font-size: 1.6em;\n}\n\ntd:hover {\n  background-color: rgb(190, 188, 188);\n}\n\n.player-square,\n.opponent-square {\n  transform: rotate(270deg);\n  border: 1px thin rgb(29, 28, 28);\n  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;\n}\n\n.buttons {\n  margin-top: 3em;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 1em;\n  width: 20%;\n  margin-inline: auto;\n}\n\n.board-name {\n  padding-top: 0.5em;\n}\n\n.randomise-ships,\n.start-game {\n  border: 0;\n  background-color: var(--clr-primary);\n  color: white;\n  padding: 1em;\n  border-radius: 4px;\n  font-weight: bold;\n  font-family: var(--ff-secondary);\n  min-width: 100%;\n  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;\n}\n\n.randomise-ships:hover,\n.start-game:hover {\n  background-color: var(--clr-accent);\n}\n\n.popup {\n  border: 1px solid black;\n  border-radius: 6px;\n  width: 40%;\n  text-align: center;\n  padding: 2em;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: var(--clr-primary);\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,\n    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  gap: 0.8em;\n  display: none;\n}\n\n.popup-text {\n  font-weight: bold;\n}\n\n.play-again {\n  border: 1px solid white;\n  background: transparent;\n  color: white;\n  padding: 0.5em 1.8em;\n  border-radius: 4px;\n  margin-top: 0.8em;\n  font-weight: bold;\n}\n\n.play-again:hover {\n  background-color: var(--clr-accent);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;;;EAGE,sBAAsB;AACxB;;AAEA;EACE,SAAS;EACT,UAAU;EACV,8BAA8B;AAChC;;AAEA;EACE,+BAA+B;EAC/B,8BAA8B;EAC9B,iCAAiC;EACjC,4CAA4C;AAC9C;;AAEA;EACE,kBAAkB;EAClB,gCAAgC;EAChC,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,oCAAoC;EACpC,4EAA4E;AAC9E;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,uBAAuB;AACzB;;AAEA;EACE,mCAAmC;EACnC,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,yBAAyB;EACzB,gBAAgB;AAClB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;;EAEE,yBAAyB;EACzB,gCAAgC;EAChC,4EAA4E;AAC9E;;AAEA;EACE,eAAe;EACf,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,QAAQ;EACR,UAAU;EACV,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;;EAEE,SAAS;EACT,oCAAoC;EACpC,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,gCAAgC;EAChC,eAAe;EACf,4EAA4E;AAC9E;;AAEA;;EAEE,mCAAmC;AACrC;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,UAAU;EACV,kBAAkB;EAClB,YAAY;EACZ,eAAe;EACf,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,oCAAoC;EACpC;0CACwC;EACxC,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,UAAU;EACV,aAAa;AACf;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,uBAAuB;EACvB,uBAAuB;EACvB,YAAY;EACZ,oBAAoB;EACpB,kBAAkB;EAClB,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,mCAAmC;AACrC","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n  font-family: var(--ff-primary);\n}\n\n:root {\n  --clr-primary: rgb(64, 64, 235);\n  --clr-accent: rgb(23, 23, 184);\n  --ff-primary: 'Rubik', sans-serif;\n  --ff-secondary: Arial, Helvetica, sans-serif;\n}\n\nh1 {\n  text-align: center;\n  font-family: var(--ff-secondary);\n  padding: 0.8em;\n}\n\n.header {\n  margin-bottom: 4em;\n  background-color: rgb(235, 229, 229);\n  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;\n}\n\nmain {\n  display: flex;\n  gap: 3em;\n  justify-content: center;\n}\n\ntd {\n  border: 1px solid rgb(0, 0, 0, 0.5);\n  height: 35px;\n  width: 35px;\n  text-align: center;\n  transform: rotate(270deg);\n  font-size: 1.6em;\n}\n\ntd:hover {\n  background-color: rgb(190, 188, 188);\n}\n\n.player-square,\n.opponent-square {\n  transform: rotate(270deg);\n  border: 1px thin rgb(29, 28, 28);\n  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;\n}\n\n.buttons {\n  margin-top: 3em;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 1em;\n  width: 20%;\n  margin-inline: auto;\n}\n\n.board-name {\n  padding-top: 0.5em;\n}\n\n.randomise-ships,\n.start-game {\n  border: 0;\n  background-color: var(--clr-primary);\n  color: white;\n  padding: 1em;\n  border-radius: 4px;\n  font-weight: bold;\n  font-family: var(--ff-secondary);\n  min-width: 100%;\n  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;\n}\n\n.randomise-ships:hover,\n.start-game:hover {\n  background-color: var(--clr-accent);\n}\n\n.popup {\n  border: 1px solid black;\n  border-radius: 6px;\n  width: 40%;\n  text-align: center;\n  padding: 2em;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: var(--clr-primary);\n  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,\n    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;\n  color: white;\n  display: flex;\n  flex-direction: column;\n  gap: 0.8em;\n  display: none;\n}\n\n.popup-text {\n  font-weight: bold;\n}\n\n.play-again {\n  border: 1px solid white;\n  background: transparent;\n  color: white;\n  padding: 0.5em 1.8em;\n  border-radius: 4px;\n  margin-top: 0.8em;\n  font-weight: bold;\n}\n\n.play-again:hover {\n  background-color: var(--clr-accent);\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL0RPTUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3J5LmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCB7IHBsYXllcjEsIHBsYXllcjIgfSBmcm9tICcuJztcbmltcG9ydCB7IGNoYW5nZVR1cm5zLCBjb21tZW5jZUNvbXB1dGVyQXR0YWNrLCB3aG9zZVR1cm5Jc0l0IH0gZnJvbSAnLi9nYW1lJztcblxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtZ2FtZScpO1xuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWUpO1xuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIHN0YXJ0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb21pc2Utc2hpcHMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBoaWRlR3JpZCgncGxheWVyJyk7XG4gIHJldmVhbEdyaWQoJ29wcG9uZW50Jyk7XG5cbiAgY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJyk7XG4gIGNlbGwuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGNsaWNrZWRQb3MgPSBlLnRhcmdldC5kYXRhc2V0LmlkO1xuICAgICAgY29uc3QgcmVzdWx0ID0gY2xpY2tlZFBvcy5zcGxpdCgnLCcpLm1hcChOdW1iZXIpO1xuICAgICAgaWYgKHBsYXllcjEubXlUdXJuID09PSB0cnVlKSB7XG4gICAgICAgIHBsYXllcjIubXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhyZXN1bHQpO1xuICAgICAgICBoaWRlR3JpZCgnb3Bwb25lbnQnKTtcbiAgICAgICAgcmV2ZWFsR3JpZCgncGxheWVyJyk7XG4gICAgICB9XG4gICAgICBjaGFuZ2VUdXJucygpO1xuICAgICAgY29tbWVuY2VDb21wdXRlckF0dGFjaygpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhbmRvbWlzZS1zaGlwcycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBsb2NhdGlvbi5yZWxvYWQoKTtcbn0pO1xuXG5sZXQgcGxheWVyVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNxdWFyZScpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVHcmlkKHBsYXllck9yT3Bwb25lbnQpIHtcbiAgaWYgKHBsYXllck9yT3Bwb25lbnQgPT09ICdvcHBvbmVudCcpIHtcbiAgICBwbGF5ZXJUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcHBvbmVudC1zcXVhcmUnKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8PSAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ3BsYXllci10ZCc7XG4gICAgICBpZiAocGxheWVyT3JPcHBvbmVudCA9PT0gJ29wcG9uZW50Jykge1xuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdvcHBvbmVudC10ZCc7XG4gICAgICB9XG4gICAgICBjZWxsLmRhdGFzZXQuaWQgPSBbaSwgal07XG4gICAgfVxuICAgIHBsYXllclRhYmxlLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuZEdhbWUoKSB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGQnKTtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgfSk7XG4gIGVuYWJsZVBvcHVwKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlR3JpZChncmlkKSB7XG4gIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcbiAgbGV0IHRoZUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNxdWFyZScpO1xuXG4gIGlmIChncmlkID09PSAnb3Bwb25lbnQnKSB7XG4gICAgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtdGQnKTtcbiAgICB0aGVHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wcG9uZW50LXNxdWFyZScpO1xuICAgIHRoZUdyaWQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgfVxuICB0aGVHcmlkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA1KSc7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZWFsR3JpZChncmlkKSB7XG4gIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcbiAgbGV0IHRoZUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNxdWFyZScpO1xuXG4gIGlmIChncmlkID09PSAnb3Bwb25lbnQnKSB7XG4gICAgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtdGQnKTtcbiAgICB0aGVHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wcG9uZW50LXNxdWFyZScpO1xuICAgIHRoZUdyaWQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgfVxuICB0aGVHcmlkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiKDAsIDAsIDAsIDAuNSknO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNoaXAoc2hpcFBvc2l0aW9ucywgcGxheWVyT3JPcHBvbmVudCkge1xuICBsZXQgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyLXRkJyk7XG4gIGlmIChwbGF5ZXJPck9wcG9uZW50ID09PSAnb3Bwb25lbnQnKVxuICAgIGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wcG9uZW50LXRkJyk7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIHNoaXBQb3NpdGlvbnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZWxlbWVudC5qb2luKCcsJyk7XG4gICAgICBpZiAocmVzdWx0ID09PSBjZWxsLmRhdGFzZXQuaWQpIHtcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDkwLCA5MCwgMjI0KSc7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheU1pc3NlZEF0dGFja3MoYXJyLCBwbGF5ZXJPck9wcG9uZW50KSB7XG4gIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcHBvbmVudC10ZCcpO1xuICBpZiAocGxheWVyT3JPcHBvbmVudCA9PT0gJ29wcG9uZW50JylcbiAgICBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgYXJyLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGVsZW1lbnQuam9pbignLCcpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gY2VsbC5kYXRhc2V0LmlkKSB7XG4gICAgICAgIGNlbGwuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgICAgICAgY2VsbC5pbm5lckhUTUwgPSAn4p2MJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5U3VjY2Vzc2Z1bEhpdHMoY29vcmRpbmF0ZSwgcGxheWVyT3JPcHBvbmVudCkge1xuICBsZXQgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtdGQnKTtcbiAgaWYgKHBsYXllck9yT3Bwb25lbnQgPT09ICdvcHBvbmVudCcpXG4gICAgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyLXRkJyk7XG5cbiAgY29uc3QgcmVzdWx0ID0gY29vcmRpbmF0ZS5qb2luKCcsJyk7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBpZiAocmVzdWx0ID09PSBjZWxsLmRhdGFzZXQuaWQpIHtcbiAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG4gICAgICBjZWxsLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gICAgICBjZWxsLmlubmVySFRNTCA9ICfinYwnO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPYnNjdXJlQ29tcHV0ZXJTaGlwcygpIHtcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtdGQnKTtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVuYWJsZVBvcHVwKCkge1xuICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpO1xuICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICBjb25zdCBwb3B1cFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtdGV4dCcpO1xuICBwb3B1cFRleHQuaW5uZXJIVE1MID0gYCR7d2hvc2VUdXJuSXNJdCgpLnRvVXBwZXJDYXNlKCl9IGhhcyB3b24hYDtcbn1cblxuY29uc3QgcGxheUFnYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXktYWdhaW4nKTtcbnBsYXlBZ2Fpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbG9jYXRpb24ucmVsb2FkKCk7XG59KTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0IHtcbiAgZGlzcGxheU1pc3NlZEF0dGFja3MsXG4gIGRpc3BsYXlTdWNjZXNzZnVsSGl0cyxcbiAgZW5kR2FtZSxcbn0gZnJvbSAnLi9ET01JbnRlcmFjdGlvbic7XG5pbXBvcnQgeyB3aG9zZVR1cm5Jc0l0LCByZXR1cm5SYW5kb21Db29yZGluYXRlIH0gZnJvbSAnLi9nYW1lJztcblxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZVNoaXAoc2hpcExlbmd0aCkge1xuICByZXR1cm4ge1xuICAgIHNoaXBMZW5ndGgsXG4gICAgaGl0c1Rha2VuOiAwLFxuICAgIHN1bms6IGZhbHNlLFxuICAgIGhpdCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhpdHNUYWtlbisrO1xuICAgIH0sXG4gICAgY2hlY2tJZlN1bmsoKSB7XG4gICAgICBpZiAodGhpcy5oaXRzVGFrZW4gPT09IHNoaXBMZW5ndGgpIHtcbiAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuICBjb25zdCBjYXJyaWVyID0gQ3JlYXRlU2hpcCg1KTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IENyZWF0ZVNoaXAoNCk7XG4gIGNvbnN0IGNydWlzZXIgPSBDcmVhdGVTaGlwKDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBDcmVhdGVTaGlwKDIpO1xuICBjb25zdCBzaW5rYm9hdCA9IENyZWF0ZVNoaXAoMSk7XG4gIGNvbnN0IGFsbFNoaXBzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAoc2hpcFR5cGUsIGNvb3JkaW5hdGVzKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHNoaXBUeXBlLnNoaXBMZW5ndGg7XG4gICAgICBjb25zdCBzaGlwc1RhaWwgPSBbY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdIC0gKHZhbHVlIC0gMSldO1xuXG4gICAgICBpZiAoc2hpcHNUYWlsWzBdIDwgMSB8fCBzaGlwc1RhaWxbMV0gPCAxKVxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ3NoaXAgcGxhY2VtZW50IG91dCBvZiBib3VuZHMnKTtcblxuICAgICAgY29uc3Qgc2hpcEFyZWEgPSBbY29vcmRpbmF0ZXNdO1xuICAgICAgd2hpbGUgKGNvb3JkaW5hdGVzWzFdICE9PSBzaGlwc1RhaWxbMV0pIHtcbiAgICAgICAgY29vcmRpbmF0ZXMgPSBbY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdIC0gMV07XG4gICAgICAgIHNoaXBBcmVhLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgfVxuICAgICAgYWxsU2hpcHMucHVzaChzaGlwQXJlYSk7XG4gICAgICByZXR1cm4gc2hpcEFyZWE7XG4gICAgfSxcbiAgICByZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsU2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhbGxTaGlwc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGFsbFNoaXBzW2ldW2pdWzBdID09PSBjb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgYWxsU2hpcHNbaV1bal1bMV0gPT09IGNvb3JkaW5hdGVzWzFdXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAod2hvc2VUdXJuSXNJdCgpID09PSAncGxheWVyJykge1xuICAgICAgICAgICAgICBkaXNwbGF5U3VjY2Vzc2Z1bEhpdHMoY29vcmRpbmF0ZXMsICdwbGF5ZXInKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRpc3BsYXlTdWNjZXNzZnVsSGl0cyhjb29yZGluYXRlcywgJ29wcG9uZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsU2hpcHNbaV0ubGVuZ3RoID09PSA1KSB7XG4gICAgICAgICAgICAgIGNhcnJpZXIuaGl0KCk7XG4gICAgICAgICAgICAgIGNhcnJpZXIuY2hlY2tJZlN1bmsoKTtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbFNoaXBzW2ldLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgICBiYXR0bGVzaGlwLmhpdCgpO1xuICAgICAgICAgICAgICBiYXR0bGVzaGlwLmNoZWNrSWZTdW5rKCk7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxTaGlwc1tpXS5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgICAgY3J1aXNlci5oaXQoKTtcbiAgICAgICAgICAgICAgY3J1aXNlci5jaGVja0lmU3VuaygpO1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsU2hpcHNbaV0ubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgIHN1Ym1hcmluZS5oaXQoKTtcbiAgICAgICAgICAgICAgc3VibWFyaW5lLmNoZWNrSWZTdW5rKCk7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxTaGlwc1tpXS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgc2lua2JvYXQuaGl0KCk7XG4gICAgICAgICAgICAgIHNpbmtib2F0LmNoZWNrSWZTdW5rKCk7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNoZWNraWZBbGxTdW5rKCkpIHtcbiAgICAgICAgZW5kR2FtZSgpO1xuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gJ3RoZSBoaXQgd2FzIHN1Y2Nlc3NmdWwnO1xuXG4gICAgICBtaXNzZWRBdHRhY2tzLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgaWYgKHdob3NlVHVybklzSXQoKSA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgZGlzcGxheU1pc3NlZEF0dGFja3MobWlzc2VkQXR0YWNrcywgJ3BsYXllcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheU1pc3NlZEF0dGFja3MobWlzc2VkQXR0YWNrcywgJ29wcG9uZW50Jyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJ3RoZSBhdHRhY2sgZGlkIG5vdCBoaXQgYW55dGhpbmcnO1xuICAgIH0sXG4gICAgY2hlY2tpZkFsbFN1bmsoKSB7XG4gICAgICBjYXJyaWVyLmNoZWNrSWZTdW5rKCk7XG4gICAgICBiYXR0bGVzaGlwLmNoZWNrSWZTdW5rKCk7XG4gICAgICBjcnVpc2VyLmNoZWNrSWZTdW5rKCk7XG4gICAgICBzdWJtYXJpbmUuY2hlY2tJZlN1bmsoKTtcbiAgICAgIHNpbmtib2F0LmNoZWNrSWZTdW5rKCk7XG4gICAgICBpZiAoXG4gICAgICAgIGJhdHRsZXNoaXAuc3VuayAmJlxuICAgICAgICBjYXJyaWVyLnN1bmsgJiZcbiAgICAgICAgY3J1aXNlci5zdW5rICYmXG4gICAgICAgIHN1Ym1hcmluZS5zdW5rICYmXG4gICAgICAgIHNpbmtib2F0LnN1bmtcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBsYXllcihuYW1lLCBteUdhbWVib2FyZCkge1xuICBjb25zdCByZXR1cm5lZENvb3JkaW5hdGVzID0gW107XG4gIGxldCBhZGphY2VudEhpdHNTb0ZhciA9IFtdO1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgbXlUdXJuOiBmYWxzZSxcbiAgICBteUdhbWVib2FyZCxcbiAgICBtYWtlUmFuZG9tTW92ZSgpIHtcbiAgICAgIGFkamFjZW50SGl0c1NvRmFyID0gW107XG4gICAgICBsZXQgcmFuZG9tQ29vcmRpbmF0ZSA9IHJldHVyblJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICAgIHdoaWxlIChyZXR1cm5lZENvb3JkaW5hdGVzLmluY2x1ZGVzKEpTT04uc3RyaW5naWZ5KHJhbmRvbUNvb3JkaW5hdGUpKSkge1xuICAgICAgICByYW5kb21Db29yZGluYXRlID0gcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuZWRDb29yZGluYXRlcy5wdXNoKEpTT04uc3RyaW5naWZ5KHJhbmRvbUNvb3JkaW5hdGUpKTtcbiAgICAgIHJldHVybiByYW5kb21Db29yZGluYXRlO1xuICAgIH0sXG4gICAgaGl0QWRqYWNlbnRTcXVhcmUoZGlyZWN0aW9uKSB7XG4gICAgICBjb25zdCBjb29yZHNSZXR1cm5lZFNvRmFyID0gcmV0dXJuZWRDb29yZGluYXRlcy5tYXAoKHN0cikgPT5cbiAgICAgICAgSlNPTi5wYXJzZShzdHIpXG4gICAgICApO1xuICAgICAgY29uc3QgbGFzdENvb3JkVmFsdWUgPVxuICAgICAgICBjb29yZHNSZXR1cm5lZFNvRmFyW2Nvb3Jkc1JldHVybmVkU29GYXIubGVuZ3RoIC0gMV07XG4gICAgICBhZGphY2VudEhpdHNTb0Zhci5wdXNoKGxhc3RDb29yZFZhbHVlKTtcbiAgICAgIGNvbnN0IG9yaWdpbiA9IGFkamFjZW50SGl0c1NvRmFyWzBdO1xuICAgICAgLy8gSUYgVEFSR0VUVElORyBUSEUgU1FVQVJFIEJFTE9XXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnYWJvdmUnKSB7XG4gICAgICAgIGxldCBhYm92ZVNxdWFyZSA9IFtsYXN0Q29vcmRWYWx1ZVswXSwgbGFzdENvb3JkVmFsdWVbMV0gKyAxXTtcbiAgICAgICAgd2hpbGUgKFxuICAgICAgICAgIHJldHVybmVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoYWJvdmVTcXVhcmUpKSB8fFxuICAgICAgICAgIGFib3ZlU3F1YXJlWzFdID4gMTBcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgYmxvY2tMb3dlciA9IFtvcmlnaW5bMF0sIG9yaWdpblsxXSAtIDFdO1xuICAgICAgICAgIGlmIChyZXR1cm5lZENvb3JkaW5hdGVzLmluY2x1ZGVzKEpTT04uc3RyaW5naWZ5KGJsb2NrTG93ZXIpKSkge1xuICAgICAgICAgICAgYWJvdmVTcXVhcmUgPSByZXR1cm5SYW5kb21Db29yZGluYXRlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFib3ZlU3F1YXJlID0gYmxvY2tMb3dlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGFib3ZlU3F1YXJlWzFdIDwgMSkge1xuICAgICAgICAgIGFib3ZlU3F1YXJlID0gcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgICAgIHdoaWxlIChyZXR1cm5lZENvb3JkaW5hdGVzLmluY2x1ZGVzKEpTT04uc3RyaW5naWZ5KGFib3ZlU3F1YXJlKSkpIHtcbiAgICAgICAgICAgIGFib3ZlU3F1YXJlID0gcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm5lZENvb3JkaW5hdGVzLnB1c2goSlNPTi5zdHJpbmdpZnkoYWJvdmVTcXVhcmUpKTtcbiAgICAgICAgcmV0dXJuIGFib3ZlU3F1YXJlO1xuICAgICAgfVxuICAgICAgLy8gSUYgVEFSR0VUVElORyBUSEUgU1FVQVJFIEFCT1ZFXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnYmVsb3cnKSB7XG4gICAgICAgIGxldCBiZWxvd1NxdWFyZSA9IFtsYXN0Q29vcmRWYWx1ZVswXSwgbGFzdENvb3JkVmFsdWVbMV0gLSAxXTtcbiAgICAgICAgd2hpbGUgKHJldHVybmVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoYmVsb3dTcXVhcmUpKSkge1xuICAgICAgICAgIGNvbnN0IGJsb2NrTG93ZXIgPSBbb3JpZ2luWzBdLCBvcmlnaW5bMV0gLSAxXTtcbiAgICAgICAgICBpZiAocmV0dXJuZWRDb29yZGluYXRlcy5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShibG9ja0xvd2VyKSkpIHtcbiAgICAgICAgICAgIGJlbG93U3F1YXJlID0gcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiZWxvd1NxdWFyZSA9IGJsb2NrTG93ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChiZWxvd1NxdWFyZVsxXSA8IDEpIHtcbiAgICAgICAgICBiZWxvd1NxdWFyZSA9IHJldHVyblJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICAgICAgICB3aGlsZSAocmV0dXJuZWRDb29yZGluYXRlcy5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShiZWxvd1NxdWFyZSkpKSB7XG4gICAgICAgICAgICBiZWxvd1NxdWFyZSA9IHJldHVyblJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuZWRDb29yZGluYXRlcy5wdXNoKEpTT04uc3RyaW5naWZ5KGJlbG93U3F1YXJlKSk7XG4gICAgICAgIHJldHVybiBiZWxvd1NxdWFyZTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0IHsgcGxheWVyMSwgcGxheWVyMiB9IGZyb20gJy4nO1xuaW1wb3J0IHsgaGlkZUdyaWQsIHJldmVhbEdyaWQsIHJlbmRlclNoaXAgfSBmcm9tICcuL0RPTUludGVyYWN0aW9uJztcbmltcG9ydCB7IENyZWF0ZVNoaXAgfSBmcm9tICcuL2ZhY3RvcnknO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlVHVybnMoKSB7XG4gIGlmIChwbGF5ZXIxLm15VHVybiA9PT0gdHJ1ZSkge1xuICAgIHBsYXllcjEubXlUdXJuID0gZmFsc2U7XG4gICAgcGxheWVyMi5teVR1cm4gPSB0cnVlO1xuICB9XG59XG5sZXQgYWltRm9yQWJvdmVTcXVhcmU7XG5sZXQgYWltZm9yQmVsb3dTcXVhcmU7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21tZW5jZUNvbXB1dGVyQXR0YWNrKCkge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoYWltRm9yQWJvdmVTcXVhcmUpIHtcbiAgICAgIGNvbnN0IGNvbXBBZGpBdHRhY2sgPSBwbGF5ZXIxLm15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soXG4gICAgICAgIHBsYXllcjIuaGl0QWRqYWNlbnRTcXVhcmUoJ2Fib3ZlJylcbiAgICAgICk7XG4gICAgICBpZiAoY29tcEFkakF0dGFjayA9PT0gJ3RoZSBoaXQgd2FzIHN1Y2Nlc3NmdWwnKSB7XG4gICAgICAgIHBsYXllcjEubXlUdXJuID0gdHJ1ZTtcbiAgICAgICAgcGxheWVyMi5teVR1cm4gPSBmYWxzZTtcbiAgICAgICAgaGlkZUdyaWQoJ3BsYXllcicpO1xuICAgICAgICByZXZlYWxHcmlkKCdvcHBvbmVudCcpO1xuICAgICAgICBhaW1Gb3JBYm92ZVNxdWFyZSA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChjb21wQWRqQXR0YWNrID09PSAndGhlIGF0dGFjayBkaWQgbm90IGhpdCBhbnl0aGluZycpIHtcbiAgICAgICAgcGxheWVyMS5teVR1cm4gPSB0cnVlO1xuICAgICAgICBwbGF5ZXIyLm15VHVybiA9IGZhbHNlO1xuICAgICAgICBoaWRlR3JpZCgncGxheWVyJyk7XG4gICAgICAgIHJldmVhbEdyaWQoJ29wcG9uZW50Jyk7XG4gICAgICAgIGFpbUZvckFib3ZlU3F1YXJlID0gZmFsc2U7XG4gICAgICAgIGFpbWZvckJlbG93U3F1YXJlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWltZm9yQmVsb3dTcXVhcmUpIHtcbiAgICAgIGNvbnN0IGNvbXBCZWxvd0F0dGFjayA9IHBsYXllcjEubXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgcGxheWVyMi5oaXRBZGphY2VudFNxdWFyZSgnYmVsb3cnKVxuICAgICAgKTtcbiAgICAgIGlmIChjb21wQmVsb3dBdHRhY2sgPT09ICd0aGUgaGl0IHdhcyBzdWNjZXNzZnVsJykge1xuICAgICAgICBwbGF5ZXIxLm15VHVybiA9IHRydWU7XG4gICAgICAgIHBsYXllcjIubXlUdXJuID0gZmFsc2U7XG4gICAgICAgIGhpZGVHcmlkKCdwbGF5ZXInKTtcbiAgICAgICAgcmV2ZWFsR3JpZCgnb3Bwb25lbnQnKTtcbiAgICAgICAgYWltRm9yQWJvdmVTcXVhcmUgPSBmYWxzZTtcbiAgICAgICAgYWltZm9yQmVsb3dTcXVhcmUgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoY29tcEJlbG93QXR0YWNrID09PSAndGhlIGF0dGFjayBkaWQgbm90IGhpdCBhbnl0aGluZycpIHtcbiAgICAgICAgcGxheWVyMS5teVR1cm4gPSB0cnVlO1xuICAgICAgICBwbGF5ZXIyLm15VHVybiA9IGZhbHNlO1xuICAgICAgICBoaWRlR3JpZCgncGxheWVyJyk7XG4gICAgICAgIHJldmVhbEdyaWQoJ29wcG9uZW50Jyk7XG4gICAgICAgIGFpbUZvckFib3ZlU3F1YXJlID0gZmFsc2U7XG4gICAgICAgIGFpbWZvckJlbG93U3F1YXJlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgYWltRm9yQWJvdmVTcXVhcmUgPSBmYWxzZTtcbiAgICBhaW1mb3JCZWxvd1NxdWFyZSA9IGZhbHNlO1xuICAgIGNvbnN0IGNvbXBBdHRhY2sgPSBwbGF5ZXIxLm15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soXG4gICAgICBwbGF5ZXIyLm1ha2VSYW5kb21Nb3ZlKClcbiAgICApO1xuICAgIGlmIChjb21wQXR0YWNrID09PSAndGhlIGhpdCB3YXMgc3VjY2Vzc2Z1bCcpIHtcbiAgICAgIGFpbUZvckFib3ZlU3F1YXJlID0gdHJ1ZTsgLy8gZW5zdXJlcyBhYm92ZSBibG9jayB3aWxsIGJlIHRhcmdldGVkIG9uIG5leHQgY2xpY2tcbiAgICB9XG4gICAgcGxheWVyMS5teVR1cm4gPSB0cnVlO1xuICAgIHBsYXllcjIubXlUdXJuID0gZmFsc2U7XG4gICAgaGlkZUdyaWQoJ3BsYXllcicpO1xuICAgIHJldmVhbEdyaWQoJ29wcG9uZW50Jyk7XG4gIH0sICc0MDAnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbWx5UGxhY2VTaGlwcyhwbGF5ZXJPckNvbXB1dGVyKSB7XG4gIGNvbnN0IGNhcnJpZXIgPSBDcmVhdGVTaGlwKDUpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gQ3JlYXRlU2hpcCg0KTtcbiAgY29uc3QgY3J1aXNlciA9IENyZWF0ZVNoaXAoMyk7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IENyZWF0ZVNoaXAoMik7XG4gIGNvbnN0IHNpbmtib2F0ID0gQ3JlYXRlU2hpcCgxKTtcblxuICBpZiAocGxheWVyT3JDb21wdXRlciA9PT0gJ3BsYXllcicpIHtcbiAgICBjb25zdCBwMWNhcnJpZXIgPSBwbGF5ZXIxLm15R2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICAgIGNhcnJpZXIsXG4gICAgICBnZXRSYW5kb21Db29yZGluYXRlKDUpXG4gICAgKTtcbiAgICByZW5kZXJTaGlwKHAxY2FycmllciwgJ3BsYXllcicpO1xuICAgIGNvbnN0IHAxYmF0dGxlc2hpcCA9IHBsYXllcjEubXlHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgYmF0dGxlc2hpcCxcbiAgICAgIGdldFJhbmRvbUNvb3JkaW5hdGUoNClcbiAgICApO1xuICAgIHJlbmRlclNoaXAocDFiYXR0bGVzaGlwLCAncGxheWVyJyk7XG4gICAgY29uc3QgcDFjcnVpc2VyID0gcGxheWVyMS5teUdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICBjcnVpc2VyLFxuICAgICAgZ2V0UmFuZG9tQ29vcmRpbmF0ZSgzKVxuICAgICk7XG4gICAgcmVuZGVyU2hpcChwMWNydWlzZXIsICdwbGF5ZXInKTtcbiAgICBjb25zdCBwMXN1Ym1hcmluZSA9IHBsYXllcjEubXlHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgc3VibWFyaW5lLFxuICAgICAgZ2V0UmFuZG9tQ29vcmRpbmF0ZSgyKVxuICAgICk7XG4gICAgcmVuZGVyU2hpcChwMXN1Ym1hcmluZSwgJ3BsYXllcicpO1xuICAgIGNvbnN0IHAxc2lua2JvYXQgPSBwbGF5ZXIxLm15R2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICAgIHNpbmtib2F0LFxuICAgICAgZ2V0UmFuZG9tQ29vcmRpbmF0ZSgxKVxuICAgICk7XG4gICAgcmVuZGVyU2hpcChwMXNpbmtib2F0LCAncGxheWVyJyk7XG4gIH1cbiAgaWYgKHBsYXllck9yQ29tcHV0ZXIgPT09ICdjb21wdXRlcicpIHtcbiAgICBjb25zdCBwMmNhcnJpZXIgPSBwbGF5ZXIyLm15R2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICAgIGNhcnJpZXIsXG4gICAgICBnZXRSYW5kb21Db29yZGluYXRlKDUpXG4gICAgKTtcbiAgICByZW5kZXJTaGlwKHAyY2FycmllciwgJ29wcG9uZW50Jyk7XG4gICAgY29uc3QgcDJiYXR0bGVzaGlwID0gcGxheWVyMi5teUdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICBiYXR0bGVzaGlwLFxuICAgICAgZ2V0UmFuZG9tQ29vcmRpbmF0ZSg0KVxuICAgICk7XG4gICAgcmVuZGVyU2hpcChwMmJhdHRsZXNoaXAsICdvcHBvbmVudCcpO1xuICAgIGNvbnN0IHAyY3J1aXNlciA9IHBsYXllcjIubXlHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgY3J1aXNlcixcbiAgICAgIGdldFJhbmRvbUNvb3JkaW5hdGUoMylcbiAgICApO1xuICAgIHJlbmRlclNoaXAocDJjcnVpc2VyLCAnb3Bwb25lbnQnKTtcbiAgICBjb25zdCBwMnN1Ym1hcmluZSA9IHBsYXllcjIubXlHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgc3VibWFyaW5lLFxuICAgICAgZ2V0UmFuZG9tQ29vcmRpbmF0ZSgyKVxuICAgICk7XG4gICAgcmVuZGVyU2hpcChwMnN1Ym1hcmluZSwgJ29wcG9uZW50Jyk7XG4gICAgY29uc3QgcDJzaW5rYm9hdCA9IHBsYXllcjIubXlHYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgc2lua2JvYXQsXG4gICAgICBnZXRSYW5kb21Db29yZGluYXRlKDEpXG4gICAgKTtcbiAgICByZW5kZXJTaGlwKHAyc2lua2JvYXQsICdvcHBvbmVudCcpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aG9zZVR1cm5Jc0l0KCkge1xuICBpZiAocGxheWVyMS5teVR1cm4gPT09IHRydWUpIHtcbiAgICBoaWRlR3JpZCgncGxheWVyJyk7XG4gICAgcmV0dXJuICdwbGF5ZXInO1xuICB9XG4gIGhpZGVHcmlkKCdvcHBvbmVudCcpO1xuICByZXR1cm4gJ0NvbXB1dGVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldHVyblJhbmRvbUNvb3JkaW5hdGUoKSB7XG4gIHJldHVybiBbXG4gICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMSxcbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxLFxuICBdO1xufVxuXG5jb25zdCB1c2VkQ29vcmRpbmF0ZXMgPSBbXTtcblxuZnVuY3Rpb24gZ2V0UmFuZG9tQ29vcmRpbmF0ZShzaGlwTGVuZ3RoKSB7XG4gIGNvbnN0IHBvc3NpYmxlQ29vcmRpbmF0ZXMgPSBbXTtcbiAgZm9yIChsZXQgeCA9IDE7IHggPD0gMTA7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAxOyB5IDw9IDEwOyB5KyspIHtcbiAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICBpZiAoeSArIDEgLSBzaGlwTGVuZ3RoID49IDEpIHtcbiAgICAgICAgLy8gZW5zdXJlIHNoaXAgdGFpbCB3b250IGdvIG91dCBvZiBib3VuZHMsIGUuZy4gQ29vcmRbMV0gPS89IC0xXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IFt4LCB5IC0gaV07XG4gICAgICAgICAgaWYgKGlzQ29vcmRpbmF0ZVVzZWQoY29vcmRpbmF0ZSkgfHwgaGFzQWRqYWNlbnRTaGlwKGNvb3JkaW5hdGUpKSB7XG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgIHBvc3NpYmxlQ29vcmRpbmF0ZXMucHVzaChbeCwgeV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlQ29vcmRpbmF0ZXMubGVuZ3RoKTtcbiAgY29uc3QgY29vcmRpbmF0ZSA9IHBvc3NpYmxlQ29vcmRpbmF0ZXNbaW5kZXhdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IFt4LCB5XSA9IFtjb29yZGluYXRlWzBdLCBjb29yZGluYXRlWzFdIC0gaV07IC8vIGNhdXNlcyBlcnJvciBzb21ldGltZXMgb24gcmVmcmVzaFxuICAgIHVzZWRDb29yZGluYXRlcy5wdXNoKFt4LCB5XSk7XG4gIH1cbiAgcmV0dXJuIGNvb3JkaW5hdGU7XG59XG5cbmZ1bmN0aW9uIGlzQ29vcmRpbmF0ZVVzZWQoY29vcmRpbmF0ZSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHVzZWRDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IFt4LCB5XSA9IHVzZWRDb29yZGluYXRlc1tpXTtcbiAgICBpZiAoeCA9PT0gY29vcmRpbmF0ZVswXSAmJiB5ID09PSBjb29yZGluYXRlWzFdKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBoYXNBZGphY2VudFNoaXAoY29vcmRpbmF0ZSkge1xuICBjb25zdCBbeCwgeV0gPSBjb29yZGluYXRlO1xuICBjb25zdCBhZGphY2VudENvb3JkaW5hdGVzID0gW1xuICAgIFt4LCB5ICsgMV0sXG4gICAgW3gsIHkgLSAxXSxcbiAgICBbeCArIDEsIHldLFxuICAgIFt4IC0gMSwgeV0sXG4gIF07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWRqYWNlbnRDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IFthZGpYLCBhZGpZXSA9IGFkamFjZW50Q29vcmRpbmF0ZXNbaV07XG4gICAgaWYgKGlzQ29vcmRpbmF0ZVVzZWQoW2FkalgsIGFkalldKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTsgLy8gdGhpcyBmdW5jdGlvbiBlbnN1cmVzIHRoZSBzaGlwcyBnZW5lcmF0ZWQgaGF2ZSBhdGxlYXN0IG9uZS1ibG9jayBkaXN0YW5jZSBmcm9tIGVhY2hvdGhlclxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IEdhbWVib2FyZCwgUGxheWVyIH0gZnJvbSAnLi9mYWN0b3J5JztcbmltcG9ydCB7IGdlbmVyYXRlR3JpZCwgaGlkZUdyaWQsIE9ic2N1cmVDb21wdXRlclNoaXBzIH0gZnJvbSAnLi9ET01JbnRlcmFjdGlvbic7XG5pbXBvcnQgeyByYW5kb21seVBsYWNlU2hpcHMgfSBmcm9tICcuL2dhbWUnO1xuXG5nZW5lcmF0ZUdyaWQoJ3BsYXllcicpO1xuZ2VuZXJhdGVHcmlkKCdvcHBvbmVudCcpO1xuXG5oaWRlR3JpZCgnb3Bwb25lbnQnKTtcblxuY29uc3QgcGxheWVyMWdiID0gR2FtZWJvYXJkKCk7XG5leHBvcnQgY29uc3QgcGxheWVyMSA9IFBsYXllcignUGxheWVyJywgcGxheWVyMWdiKTtcbnBsYXllcjEubXlUdXJuID0gdHJ1ZTtcblxuY29uc3QgcGxheWVyMmdiID0gR2FtZWJvYXJkKCk7XG5leHBvcnQgY29uc3QgcGxheWVyMiA9IFBsYXllcignQ29tcHV0ZXInLCBwbGF5ZXIyZ2IpO1xuXG5yYW5kb21seVBsYWNlU2hpcHMoJ3BsYXllcicpO1xucmFuZG9tbHlQbGFjZVNoaXBzKCdjb21wdXRlcicpO1xuXG5PYnNjdXJlQ29tcHV0ZXJTaGlwcygpO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1SdWJpayZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG4qIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBmb250LWZhbWlseTogdmFyKC0tZmYtcHJpbWFyeSk7XFxufVxcblxcbjpyb290IHtcXG4gIC0tY2xyLXByaW1hcnk6IHJnYig2NCwgNjQsIDIzNSk7XFxuICAtLWNsci1hY2NlbnQ6IHJnYigyMywgMjMsIDE4NCk7XFxuICAtLWZmLXByaW1hcnk6ICdSdWJpaycsIHNhbnMtc2VyaWY7XFxuICAtLWZmLXNlY29uZGFyeTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG59XFxuXFxuaDEge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1mYW1pbHk6IHZhcigtLWZmLXNlY29uZGFyeSk7XFxuICBwYWRkaW5nOiAwLjhlbTtcXG59XFxuXFxuLmhlYWRlciB7XFxuICBtYXJnaW4tYm90dG9tOiA0ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjM1LCAyMjksIDIyOSk7XFxuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMTIpIDBweCAxcHggM3B4LCByZ2JhKDAsIDAsIDAsIDAuMjQpIDBweCAxcHggMnB4O1xcbn1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDNlbTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG50ZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCwgMC41KTtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiAzNXB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG4gIGZvbnQtc2l6ZTogMS42ZW07XFxufVxcblxcbnRkOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTAsIDE4OCwgMTg4KTtcXG59XFxuXFxuLnBsYXllci1zcXVhcmUsXFxuLm9wcG9uZW50LXNxdWFyZSB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgYm9yZGVyOiAxcHggdGhpbiByZ2IoMjksIDI4LCAyOCk7XFxuICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMTIpIDBweCAxcHggM3B4LCByZ2JhKDAsIDAsIDAsIDAuMjQpIDBweCAxcHggMnB4O1xcbn1cXG5cXG4uYnV0dG9ucyB7XFxuICBtYXJnaW4tdG9wOiAzZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDFlbTtcXG4gIHdpZHRoOiAyMCU7XFxuICBtYXJnaW4taW5saW5lOiBhdXRvO1xcbn1cXG5cXG4uYm9hcmQtbmFtZSB7XFxuICBwYWRkaW5nLXRvcDogMC41ZW07XFxufVxcblxcbi5yYW5kb21pc2Utc2hpcHMsXFxuLnN0YXJ0LWdhbWUge1xcbiAgYm9yZGVyOiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLXByaW1hcnkpO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMWVtO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LWZhbWlseTogdmFyKC0tZmYtc2Vjb25kYXJ5KTtcXG4gIG1pbi13aWR0aDogMTAwJTtcXG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xNikgMHB4IDNweCA2cHgsIHJnYmEoMCwgMCwgMCwgMC4yMykgMHB4IDNweCA2cHg7XFxufVxcblxcbi5yYW5kb21pc2Utc2hpcHM6aG92ZXIsXFxuLnN0YXJ0LWdhbWU6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWFjY2VudCk7XFxufVxcblxcbi5wb3B1cCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcXG4gIHdpZHRoOiA0MCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nOiAyZW07XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLXByaW1hcnkpO1xcbiAgYm94LXNoYWRvdzogcmdiYSg1MCwgNTAsIDkzLCAwLjI1KSAwcHggMzBweCA2MHB4IC0xMnB4LFxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMykgMHB4IDE4cHggMzZweCAtMThweDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAwLjhlbTtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5wb3B1cC10ZXh0IHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4ucGxheS1hZ2FpbiB7XFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMC41ZW0gMS44ZW07XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBtYXJnaW4tdG9wOiAwLjhlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4ucGxheS1hZ2Fpbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItYWNjZW50KTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTs7O0VBR0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDViw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSwrQkFBK0I7RUFDL0IsOEJBQThCO0VBQzlCLGlDQUFpQztFQUNqQyw0Q0FBNEM7QUFDOUM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZ0NBQWdDO0VBQ2hDLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsb0NBQW9DO0VBQ3BDLDRFQUE0RTtBQUM5RTs7QUFFQTtFQUNFLGFBQWE7RUFDYixRQUFRO0VBQ1IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLFlBQVk7RUFDWixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxvQ0FBb0M7QUFDdEM7O0FBRUE7O0VBRUUseUJBQXlCO0VBQ3pCLGdDQUFnQztFQUNoQyw0RUFBNEU7QUFDOUU7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsUUFBUTtFQUNSLFVBQVU7RUFDVixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7O0VBRUUsU0FBUztFQUNULG9DQUFvQztFQUNwQyxZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsZ0NBQWdDO0VBQ2hDLGVBQWU7RUFDZiw0RUFBNEU7QUFDOUU7O0FBRUE7O0VBRUUsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1Ysa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixlQUFlO0VBQ2YsUUFBUTtFQUNSLFNBQVM7RUFDVCxnQ0FBZ0M7RUFDaEMsb0NBQW9DO0VBQ3BDOzBDQUN3QztFQUN4QyxZQUFZO0VBQ1osYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixVQUFVO0VBQ1YsYUFBYTtBQUNmOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJ1YmlrJmRpc3BsYXk9c3dhcCcpO1xcblxcbiosXFxuKjo6YmVmb3JlLFxcbio6OmFmdGVyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1mZi1wcmltYXJ5KTtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1jbHItcHJpbWFyeTogcmdiKDY0LCA2NCwgMjM1KTtcXG4gIC0tY2xyLWFjY2VudDogcmdiKDIzLCAyMywgMTg0KTtcXG4gIC0tZmYtcHJpbWFyeTogJ1J1YmlrJywgc2Fucy1zZXJpZjtcXG4gIC0tZmYtc2Vjb25kYXJ5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5oMSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LWZhbWlseTogdmFyKC0tZmYtc2Vjb25kYXJ5KTtcXG4gIHBhZGRpbmc6IDAuOGVtO1xcbn1cXG5cXG4uaGVhZGVyIHtcXG4gIG1hcmdpbi1ib3R0b206IDRlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzUsIDIyOSwgMjI5KTtcXG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xMikgMHB4IDFweCAzcHgsIHJnYmEoMCwgMCwgMCwgMC4yNCkgMHB4IDFweCAycHg7XFxufVxcblxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogM2VtO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbnRkIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwLCAwLjUpO1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgd2lkdGg6IDM1cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbiAgZm9udC1zaXplOiAxLjZlbTtcXG59XFxuXFxudGQ6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5MCwgMTg4LCAxODgpO1xcbn1cXG5cXG4ucGxheWVyLXNxdWFyZSxcXG4ub3Bwb25lbnQtc3F1YXJlIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxuICBib3JkZXI6IDFweCB0aGluIHJnYigyOSwgMjgsIDI4KTtcXG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xMikgMHB4IDFweCAzcHgsIHJnYmEoMCwgMCwgMCwgMC4yNCkgMHB4IDFweCAycHg7XFxufVxcblxcbi5idXR0b25zIHtcXG4gIG1hcmdpbi10b3A6IDNlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMWVtO1xcbiAgd2lkdGg6IDIwJTtcXG4gIG1hcmdpbi1pbmxpbmU6IGF1dG87XFxufVxcblxcbi5ib2FyZC1uYW1lIHtcXG4gIHBhZGRpbmctdG9wOiAwLjVlbTtcXG59XFxuXFxuLnJhbmRvbWlzZS1zaGlwcyxcXG4uc3RhcnQtZ2FtZSB7XFxuICBib3JkZXI6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItcHJpbWFyeSk7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxZW07XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtZmFtaWx5OiB2YXIoLS1mZi1zZWNvbmRhcnkpO1xcbiAgbWluLXdpZHRoOiAxMDAlO1xcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjE2KSAwcHggM3B4IDZweCwgcmdiYSgwLCAwLCAwLCAwLjIzKSAwcHggM3B4IDZweDtcXG59XFxuXFxuLnJhbmRvbWlzZS1zaGlwczpob3ZlcixcXG4uc3RhcnQtZ2FtZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItYWNjZW50KTtcXG59XFxuXFxuLnBvcHVwIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgd2lkdGg6IDQwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHBhZGRpbmc6IDJlbTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItcHJpbWFyeSk7XFxuICBib3gtc2hhZG93OiByZ2JhKDUwLCA1MCwgOTMsIDAuMjUpIDBweCAzMHB4IDYwcHggLTEycHgsXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggMThweCAzNnB4IC0xOHB4O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDAuOGVtO1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnBvcHVwLXRleHQge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5wbGF5LWFnYWluIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAwLjVlbSAxLjhlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIG1hcmdpbi10b3A6IDAuOGVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5wbGF5LWFnYWluOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1hY2NlbnQpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsicGxheWVyMSIsInBsYXllcjIiLCJjaGFuZ2VUdXJucyIsImNvbW1lbmNlQ29tcHV0ZXJBdHRhY2siLCJ3aG9zZVR1cm5Jc0l0Iiwic3RhcnRCdXR0b24iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRHYW1lIiwic3R5bGUiLCJkaXNwbGF5IiwiaGlkZUdyaWQiLCJyZXZlYWxHcmlkIiwiY2VsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYm94IiwiZSIsImNsaWNrZWRQb3MiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJyZXN1bHQiLCJzcGxpdCIsIm1hcCIsIk51bWJlciIsIm15VHVybiIsIm15R2FtZWJvYXJkIiwicmVjZWl2ZUF0dGFjayIsImxvY2F0aW9uIiwicmVsb2FkIiwicGxheWVyVGFibGUiLCJnZW5lcmF0ZUdyaWQiLCJwbGF5ZXJPck9wcG9uZW50IiwiaSIsInJvdyIsImNyZWF0ZUVsZW1lbnQiLCJqIiwiYXBwZW5kQ2hpbGQiLCJjbGFzc05hbWUiLCJlbmRHYW1lIiwiY2VsbHMiLCJwb2ludGVyRXZlbnRzIiwiZW5hYmxlUG9wdXAiLCJncmlkIiwidGhlR3JpZCIsImJvcmRlciIsInJlbmRlclNoaXAiLCJzaGlwUG9zaXRpb25zIiwiZWxlbWVudCIsImpvaW4iLCJiYWNrZ3JvdW5kQ29sb3IiLCJkaXNwbGF5TWlzc2VkQXR0YWNrcyIsImFyciIsImlubmVySFRNTCIsImRpc3BsYXlTdWNjZXNzZnVsSGl0cyIsImNvb3JkaW5hdGUiLCJPYnNjdXJlQ29tcHV0ZXJTaGlwcyIsInBvcHVwIiwicG9wdXBUZXh0IiwidG9VcHBlckNhc2UiLCJwbGF5QWdhaW4iLCJyZXR1cm5SYW5kb21Db29yZGluYXRlIiwiQ3JlYXRlU2hpcCIsInNoaXBMZW5ndGgiLCJoaXRzVGFrZW4iLCJzdW5rIiwiaGl0IiwiY2hlY2tJZlN1bmsiLCJHYW1lYm9hcmQiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJzaW5rYm9hdCIsImFsbFNoaXBzIiwibWlzc2VkQXR0YWNrcyIsInBsYWNlU2hpcCIsInNoaXBUeXBlIiwiY29vcmRpbmF0ZXMiLCJ2YWx1ZSIsInNoaXBzVGFpbCIsImNvbnNvbGUiLCJsb2ciLCJzaGlwQXJlYSIsInB1c2giLCJmb3VuZCIsImxlbmd0aCIsImNoZWNraWZBbGxTdW5rIiwiUGxheWVyIiwibmFtZSIsInJldHVybmVkQ29vcmRpbmF0ZXMiLCJhZGphY2VudEhpdHNTb0ZhciIsIm1ha2VSYW5kb21Nb3ZlIiwicmFuZG9tQ29vcmRpbmF0ZSIsImluY2x1ZGVzIiwiSlNPTiIsInN0cmluZ2lmeSIsImhpdEFkamFjZW50U3F1YXJlIiwiZGlyZWN0aW9uIiwiY29vcmRzUmV0dXJuZWRTb0ZhciIsInN0ciIsInBhcnNlIiwibGFzdENvb3JkVmFsdWUiLCJvcmlnaW4iLCJhYm92ZVNxdWFyZSIsImJsb2NrTG93ZXIiLCJiZWxvd1NxdWFyZSIsImFpbUZvckFib3ZlU3F1YXJlIiwiYWltZm9yQmVsb3dTcXVhcmUiLCJzZXRUaW1lb3V0IiwiY29tcEFkakF0dGFjayIsImNvbXBCZWxvd0F0dGFjayIsImNvbXBBdHRhY2siLCJyYW5kb21seVBsYWNlU2hpcHMiLCJwbGF5ZXJPckNvbXB1dGVyIiwicDFjYXJyaWVyIiwiZ2V0UmFuZG9tQ29vcmRpbmF0ZSIsInAxYmF0dGxlc2hpcCIsInAxY3J1aXNlciIsInAxc3VibWFyaW5lIiwicDFzaW5rYm9hdCIsInAyY2FycmllciIsInAyYmF0dGxlc2hpcCIsInAyY3J1aXNlciIsInAyc3VibWFyaW5lIiwicDJzaW5rYm9hdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInVzZWRDb29yZGluYXRlcyIsInBvc3NpYmxlQ29vcmRpbmF0ZXMiLCJ4IiwieSIsInZhbGlkIiwiaXNDb29yZGluYXRlVXNlZCIsImhhc0FkamFjZW50U2hpcCIsImluZGV4IiwiYWRqYWNlbnRDb29yZGluYXRlcyIsImFkalgiLCJhZGpZIiwicGxheWVyMWdiIiwicGxheWVyMmdiIl0sInNvdXJjZVJvb3QiOiIifQ==