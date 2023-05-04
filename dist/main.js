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
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */


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
      enableCellFunctionality(cell);
    }
    playerTable.appendChild(row);
  }
}
function enableCellFunctionality(cell) {
  cell.addEventListener('click', e => {
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
}
function endGame() {
  const cells = document.querySelectorAll('td');
  cells.forEach(cell => {
    cell.style.pointerEvents = 'none';
  });
  // enable some kind of popup here, to ask if play again, etc.
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
        cell.style.backgroundColor = 'lightblue';
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
        cell.style.backgroundColor = 'red';
        cell.style.pointerEvents = 'none';
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
      cell.style.backgroundColor = 'black';
      cell.style.pointerEvents = 'none';
    }
  });
}

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
/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */


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
        // console.log('SHIP HAS BEEN SUNK');
        // enable some kind of css styling to the sunken ship here?
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
        console.log(`${(0,_game__WEBPACK_IMPORTED_MODULE_1__.whoseTurnIsIt)()} has won!`);
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
      console.log(returnedCoordinates);
      return randomCoordinate;
    },
    hitAboveSquare() {
      const coordsReturnedSoFar = returnedCoordinates.map(str => JSON.parse(str));
      const lastCoordValue = coordsReturnedSoFar[coordsReturnedSoFar.length - 1];
      adjacentHitsSoFar.push(lastCoordValue); // use this array to get the first adj hit value, so that we can target below square
      console.log(adjacentHitsSoFar);
      let aboveSquare = [lastCoordValue[0], lastCoordValue[1] + 1];
      console.log(aboveSquare);
      const origin = adjacentHitsSoFar[0];
      console.log(`Origin point is: ${origin}`);
      while (returnedCoordinates.includes(JSON.stringify(aboveSquare)) || aboveSquare[1] > 10) {
        const blockLower = [origin[0], origin[1] - 1];
        console.log(blockLower);
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
      console.log(aboveSquare);
      returnedCoordinates.push(JSON.stringify(aboveSquare));
      console.log(returnedCoordinates);
      return aboveSquare;
    },
    hitBelowSquare() {
      const coordsReturnedSoFar = returnedCoordinates.map(str => JSON.parse(str));
      const lastCoordValue = coordsReturnedSoFar[coordsReturnedSoFar.length - 1];
      adjacentHitsSoFar.push(lastCoordValue);
      console.log(adjacentHitsSoFar);
      let belowSquare = [lastCoordValue[0], lastCoordValue[1] - 1];
      console.log(belowSquare);
      while (returnedCoordinates.includes(JSON.stringify(belowSquare))) {
        const origin = adjacentHitsSoFar[0];
        const blockLower = [origin[0], origin[1] - 1];
        if (returnedCoordinates.includes(JSON.stringify(blockLower))) {
          belowSquare = (0,_game__WEBPACK_IMPORTED_MODULE_1__.returnRandomCoordinate)();
        } else {
          belowSquare = blockLower;
        }
      }
      while (belowSquare[1] < 1) {
        console.log('we going sub zero');
        belowSquare = (0,_game__WEBPACK_IMPORTED_MODULE_1__.returnRandomCoordinate)();
        while (returnedCoordinates.includes(JSON.stringify(belowSquare))) {
          belowSquare = (0,_game__WEBPACK_IMPORTED_MODULE_1__.returnRandomCoordinate)();
        }
      }
      console.log(belowSquare);
      returnedCoordinates.push(JSON.stringify(belowSquare));
      console.log(returnedCoordinates);
      return belowSquare;
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
/* harmony export */   "returnRandomCoordinate": () => (/* binding */ returnRandomCoordinate),
/* harmony export */   "whoseTurnIsIt": () => (/* binding */ whoseTurnIsIt)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMInteraction */ "./src/DOMInteraction.js");
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */


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
      const compAdjAttack = ___WEBPACK_IMPORTED_MODULE_0__.player1.myGameboard.receiveAttack(___WEBPACK_IMPORTED_MODULE_0__.player2.hitAboveSquare() // should rename to hitAboveSquare? cos technically not targetting adjacent squares
      );

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
      const compBelowAttack = ___WEBPACK_IMPORTED_MODULE_0__.player1.myGameboard.receiveAttack(___WEBPACK_IMPORTED_MODULE_0__.player2.hitBelowSquare());
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
  }, '200');
}
function whoseTurnIsIt() {
  if (___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn === true) {
    (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.hideGrid)('player');
    return 'player';
  }
  (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_1__.hideGrid)('opponent');
  return 'opponent';
}
function returnRandomCoordinate() {
  return [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
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
/* eslint-disable import/no-cycle */



(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.generateGrid)('player');
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.generateGrid)('opponent');

// enable some kind of 'Start Game' popup button here
// once that button is clicked, then hide player1 grid as seen below:
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.hideGrid)('player'); // player1s grid starts hidden at first

const player1gb = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
const player1 = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Player)('Johny', player1gb);
player1.myTurn = true; // player1 always starts first move
const player2gb = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
const player2 = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Player)('Computer', player2gb);
console.log(player1);
console.log(player2);
const carrier = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.CreateShip)(5);
const battleship = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.CreateShip)(4);
const cruiser = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.CreateShip)(3);
const submarine = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.CreateShip)(2);
const sinkboat = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.CreateShip)(1);
const p1carrier = player1.myGameboard.placeShip(carrier, [1, 10]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p1carrier, 'player');
const p1battleship = player1.myGameboard.placeShip(battleship, [3, 4]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p1battleship, 'player');
const p1cruiser = player1.myGameboard.placeShip(cruiser, [5, 8]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p1cruiser, 'player');
const p1submarine = player1.myGameboard.placeShip(submarine, [10, 10]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p1submarine, 'player');
const p1sinkboat = player1.myGameboard.placeShip(sinkboat, [10, 1]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p1sinkboat, 'player');
const p2carrier = player2.myGameboard.placeShip(carrier, [6, 8]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p2carrier, 'opponent');
const p2battleship = player2.myGameboard.placeShip(battleship, [4, 6]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p2battleship, 'opponent');
const p2cruiser = player2.myGameboard.placeShip(cruiser, [10, 4]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p2cruiser, 'opponent');
const p2submarine = player2.myGameboard.placeShip(submarine, [1, 4]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p2submarine, 'opponent');
const p2sinkboat = player2.myGameboard.placeShip(sinkboat, [2, 10]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p2sinkboat, 'opponent');

// THINGS TO DO:
// focus on cleaning up our code/program, make it more clear/efficient for now

// obscure opponent ship locations
// put ObscureComputerShips() here? the function will set the computer side cells background color to white

// make a function that randomly place ships on behalf of the user on refresh, then allow drag and drop?
// e.g. randomiseShips(playerOrComputersGrid)

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
// Module
___CSS_LOADER_EXPORT___.push([module.id, "h1 {\n  color: blue;\n  text-align: center;\n}\n\nmain {\n  display: flex;\n  gap: 3em;\n  justify-content: center;\n}\n\ntd {\n  border: 1px solid rgb(0, 0, 0, 0.5);\n  height: 35px;\n  width: 35px;\n}\n\ntd:hover {\n  background-color: rgb(190, 188, 188);\n}\n\n.player-square,\n.opponent-square {\n  transform: rotate(270deg);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,QAAQ;EACR,uBAAuB;AACzB;;AAEA;EACE,mCAAmC;EACnC,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,oCAAoC;AACtC;;AAEA;;EAEE,yBAAyB;AAC3B","sourcesContent":["h1 {\n  color: blue;\n  text-align: center;\n}\n\nmain {\n  display: flex;\n  gap: 3em;\n  justify-content: center;\n}\n\ntd {\n  border: 1px solid rgb(0, 0, 0, 0.5);\n  height: 35px;\n  width: 35px;\n}\n\ntd:hover {\n  background-color: rgb(190, 188, 188);\n}\n\n.player-square,\n.opponent-square {\n  transform: rotate(270deg);\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL0RPTUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3J5LmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgcGxheWVyMSwgcGxheWVyMiB9IGZyb20gJy4nO1xuaW1wb3J0IHsgY2hhbmdlVHVybnMsIGNvbW1lbmNlQ29tcHV0ZXJBdHRhY2sgfSBmcm9tICcuL2dhbWUnO1xuXG5sZXQgcGxheWVyVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNxdWFyZScpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVHcmlkKHBsYXllck9yT3Bwb25lbnQpIHtcbiAgaWYgKHBsYXllck9yT3Bwb25lbnQgPT09ICdvcHBvbmVudCcpIHtcbiAgICBwbGF5ZXJUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcHBvbmVudC1zcXVhcmUnKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8PSAxMDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIGNlbGwuY2xhc3NOYW1lID0gJ3BsYXllci10ZCc7XG4gICAgICBpZiAocGxheWVyT3JPcHBvbmVudCA9PT0gJ29wcG9uZW50Jykge1xuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdvcHBvbmVudC10ZCc7XG4gICAgICB9XG4gICAgICBjZWxsLmRhdGFzZXQuaWQgPSBbaSwgal07XG4gICAgICBlbmFibGVDZWxsRnVuY3Rpb25hbGl0eShjZWxsKTtcbiAgICB9XG4gICAgcGxheWVyVGFibGUuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmFibGVDZWxsRnVuY3Rpb25hbGl0eShjZWxsKSB7XG4gIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGNvbnN0IGNsaWNrZWRQb3MgPSBlLnRhcmdldC5kYXRhc2V0LmlkO1xuICAgIGNvbnN0IHJlc3VsdCA9IGNsaWNrZWRQb3Muc3BsaXQoJywnKS5tYXAoTnVtYmVyKTtcblxuICAgIGlmIChwbGF5ZXIxLm15VHVybiA9PT0gdHJ1ZSkge1xuICAgICAgcGxheWVyMi5teUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJlc3VsdCk7XG4gICAgICBoaWRlR3JpZCgnb3Bwb25lbnQnKTtcbiAgICAgIHJldmVhbEdyaWQoJ3BsYXllcicpO1xuICAgIH1cbiAgICBjaGFuZ2VUdXJucygpO1xuICAgIGNvbW1lbmNlQ29tcHV0ZXJBdHRhY2soKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmRHYW1lKCkge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJyk7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIH0pO1xuICAvLyBlbmFibGUgc29tZSBraW5kIG9mIHBvcHVwIGhlcmUsIHRvIGFzayBpZiBwbGF5IGFnYWluLCBldGMuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlR3JpZChncmlkKSB7XG4gIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcbiAgbGV0IHRoZUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNxdWFyZScpO1xuXG4gIGlmIChncmlkID09PSAnb3Bwb25lbnQnKSB7XG4gICAgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtdGQnKTtcbiAgICB0aGVHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wcG9uZW50LXNxdWFyZScpO1xuICAgIHRoZUdyaWQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJztcbiAgfVxuICB0aGVHcmlkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjA1KSc7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2ZWFsR3JpZChncmlkKSB7XG4gIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcbiAgbGV0IHRoZUdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLXNxdWFyZScpO1xuXG4gIGlmIChncmlkID09PSAnb3Bwb25lbnQnKSB7XG4gICAgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtdGQnKTtcbiAgICB0aGVHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wcG9uZW50LXNxdWFyZScpO1xuICAgIHRoZUdyaWQuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhdXRvJztcbiAgfVxuICB0aGVHcmlkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0byc7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiKDAsIDAsIDAsIDAuNSknO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNoaXAoc2hpcFBvc2l0aW9ucywgcGxheWVyT3JPcHBvbmVudCkge1xuICBsZXQgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyLXRkJyk7XG4gIGlmIChwbGF5ZXJPck9wcG9uZW50ID09PSAnb3Bwb25lbnQnKVxuICAgIGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wcG9uZW50LXRkJyk7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIHNoaXBQb3NpdGlvbnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZWxlbWVudC5qb2luKCcsJyk7XG4gICAgICBpZiAocmVzdWx0ID09PSBjZWxsLmRhdGFzZXQuaWQpIHtcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnbGlnaHRibHVlJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5TWlzc2VkQXR0YWNrcyhhcnIsIHBsYXllck9yT3Bwb25lbnQpIHtcbiAgbGV0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wcG9uZW50LXRkJyk7XG4gIGlmIChwbGF5ZXJPck9wcG9uZW50ID09PSAnb3Bwb25lbnQnKVxuICAgIGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllci10ZCcpO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBhcnIuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZWxlbWVudC5qb2luKCcsJyk7XG4gICAgICBpZiAocmVzdWx0ID09PSBjZWxsLmRhdGFzZXQuaWQpIHtcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgY2VsbC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlTdWNjZXNzZnVsSGl0cyhjb29yZGluYXRlLCBwbGF5ZXJPck9wcG9uZW50KSB7XG4gIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcHBvbmVudC10ZCcpO1xuICBpZiAocGxheWVyT3JPcHBvbmVudCA9PT0gJ29wcG9uZW50JylcbiAgICBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcblxuICBjb25zdCByZXN1bHQgPSBjb29yZGluYXRlLmpvaW4oJywnKTtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmIChyZXN1bHQgPT09IGNlbGwuZGF0YXNldC5pZCkge1xuICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snO1xuICAgICAgY2VsbC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgIH1cbiAgfSk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1hbGVydCAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmltcG9ydCB7XG4gIGRpc3BsYXlNaXNzZWRBdHRhY2tzLFxuICBkaXNwbGF5U3VjY2Vzc2Z1bEhpdHMsXG4gIGVuZEdhbWUsXG59IGZyb20gJy4vRE9NSW50ZXJhY3Rpb24nO1xuaW1wb3J0IHsgd2hvc2VUdXJuSXNJdCwgcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSB9IGZyb20gJy4vZ2FtZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVTaGlwKHNoaXBMZW5ndGgpIHtcbiAgcmV0dXJuIHtcbiAgICBzaGlwTGVuZ3RoLFxuICAgIGhpdHNUYWtlbjogMCxcbiAgICBzdW5rOiBmYWxzZSxcbiAgICBoaXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaXRzVGFrZW4rKztcbiAgICB9LFxuICAgIGNoZWNrSWZTdW5rKCkge1xuICAgICAgaWYgKHRoaXMuaGl0c1Rha2VuID09PSBzaGlwTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdTSElQIEhBUyBCRUVOIFNVTksnKTtcbiAgICAgICAgLy8gZW5hYmxlIHNvbWUga2luZCBvZiBjc3Mgc3R5bGluZyB0byB0aGUgc3Vua2VuIHNoaXAgaGVyZT9cbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuICBjb25zdCBjYXJyaWVyID0gQ3JlYXRlU2hpcCg1KTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IENyZWF0ZVNoaXAoNCk7XG4gIGNvbnN0IGNydWlzZXIgPSBDcmVhdGVTaGlwKDMpO1xuICBjb25zdCBzdWJtYXJpbmUgPSBDcmVhdGVTaGlwKDIpO1xuICBjb25zdCBzaW5rYm9hdCA9IENyZWF0ZVNoaXAoMSk7XG4gIGNvbnN0IGFsbFNoaXBzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAoc2hpcFR5cGUsIGNvb3JkaW5hdGVzKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHNoaXBUeXBlLnNoaXBMZW5ndGg7XG4gICAgICBjb25zdCBzaGlwc1RhaWwgPSBbY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdIC0gKHZhbHVlIC0gMSldO1xuXG4gICAgICBpZiAoc2hpcHNUYWlsWzBdIDwgMSB8fCBzaGlwc1RhaWxbMV0gPCAxKVxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ3NoaXAgcGxhY2VtZW50IG91dCBvZiBib3VuZHMnKTtcblxuICAgICAgY29uc3Qgc2hpcEFyZWEgPSBbY29vcmRpbmF0ZXNdO1xuXG4gICAgICB3aGlsZSAoY29vcmRpbmF0ZXNbMV0gIT09IHNoaXBzVGFpbFsxXSkge1xuICAgICAgICBjb29yZGluYXRlcyA9IFtjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0gLSAxXTsgLy8gaWYgc3RhdGVtZW50cyBnb25uYSBiZSBuZWVkZWQgaGVyZT9cbiAgICAgICAgc2hpcEFyZWEucHVzaChjb29yZGluYXRlcyk7IC8vIHRoaXMgaXMgT05MWSBGT1IgVkVSVElDQUwgYWxpZ25tZW50LCBuZWVkIGFub3RoZXIgd2hpbGUgbG9vcCBmb3IgaG9yaXpvbnRhbD9cbiAgICAgIH1cbiAgICAgIGFsbFNoaXBzLnB1c2goc2hpcEFyZWEpO1xuICAgICAgcmV0dXJuIHNoaXBBcmVhO1xuICAgIH0sXG4gICAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWxsU2hpcHNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBhbGxTaGlwc1tpXVtqXVswXSA9PT0gY29vcmRpbmF0ZXNbMF0gJiZcbiAgICAgICAgICAgIGFsbFNoaXBzW2ldW2pdWzFdID09PSBjb29yZGluYXRlc1sxXVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHdob3NlVHVybklzSXQoKSA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgICAgICAgZGlzcGxheVN1Y2Nlc3NmdWxIaXRzKGNvb3JkaW5hdGVzLCAncGxheWVyJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkaXNwbGF5U3VjY2Vzc2Z1bEhpdHMoY29vcmRpbmF0ZXMsICdvcHBvbmVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbFNoaXBzW2ldLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAgICAgICBjYXJyaWVyLmhpdCgpO1xuICAgICAgICAgICAgICBjYXJyaWVyLmNoZWNrSWZTdW5rKCk7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxTaGlwc1tpXS5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgICAgYmF0dGxlc2hpcC5oaXQoKTtcbiAgICAgICAgICAgICAgYmF0dGxlc2hpcC5jaGVja0lmU3VuaygpO1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsU2hpcHNbaV0ubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgICAgIGNydWlzZXIuaGl0KCk7XG4gICAgICAgICAgICAgIGNydWlzZXIuY2hlY2tJZlN1bmsoKTtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbFNoaXBzW2ldLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICBzdWJtYXJpbmUuaGl0KCk7XG4gICAgICAgICAgICAgIHN1Ym1hcmluZS5jaGVja0lmU3VuaygpO1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYWxsU2hpcHNbaV0ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgIHNpbmtib2F0LmhpdCgpO1xuICAgICAgICAgICAgICBzaW5rYm9hdC5jaGVja0lmU3VuaygpO1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jaGVja2lmQWxsU3VuaygpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3dob3NlVHVybklzSXQoKX0gaGFzIHdvbiFgKTtcbiAgICAgICAgZW5kR2FtZSgpO1xuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gJ3RoZSBoaXQgd2FzIHN1Y2Nlc3NmdWwnO1xuXG4gICAgICBtaXNzZWRBdHRhY2tzLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgaWYgKHdob3NlVHVybklzSXQoKSA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgZGlzcGxheU1pc3NlZEF0dGFja3MobWlzc2VkQXR0YWNrcywgJ3BsYXllcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheU1pc3NlZEF0dGFja3MobWlzc2VkQXR0YWNrcywgJ29wcG9uZW50Jyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJ3RoZSBhdHRhY2sgZGlkIG5vdCBoaXQgYW55dGhpbmcnO1xuICAgIH0sXG4gICAgY2hlY2tpZkFsbFN1bmsoKSB7XG4gICAgICBjYXJyaWVyLmNoZWNrSWZTdW5rKCk7XG4gICAgICBiYXR0bGVzaGlwLmNoZWNrSWZTdW5rKCk7XG4gICAgICBjcnVpc2VyLmNoZWNrSWZTdW5rKCk7XG4gICAgICBzdWJtYXJpbmUuY2hlY2tJZlN1bmsoKTtcbiAgICAgIHNpbmtib2F0LmNoZWNrSWZTdW5rKCk7XG4gICAgICBpZiAoXG4gICAgICAgIGJhdHRsZXNoaXAuc3VuayAmJlxuICAgICAgICBjYXJyaWVyLnN1bmsgJiZcbiAgICAgICAgY3J1aXNlci5zdW5rICYmXG4gICAgICAgIHN1Ym1hcmluZS5zdW5rICYmXG4gICAgICAgIHNpbmtib2F0LnN1bmtcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBsYXllcihuYW1lLCBteUdhbWVib2FyZCkge1xuICBjb25zdCByZXR1cm5lZENvb3JkaW5hdGVzID0gW107XG4gIGxldCBhZGphY2VudEhpdHNTb0ZhciA9IFtdO1xuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgbXlUdXJuOiBmYWxzZSxcbiAgICBteUdhbWVib2FyZCxcbiAgICBtYWtlUmFuZG9tTW92ZSgpIHtcbiAgICAgIGFkamFjZW50SGl0c1NvRmFyID0gW107XG4gICAgICBsZXQgcmFuZG9tQ29vcmRpbmF0ZSA9IHJldHVyblJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICAgIHdoaWxlIChyZXR1cm5lZENvb3JkaW5hdGVzLmluY2x1ZGVzKEpTT04uc3RyaW5naWZ5KHJhbmRvbUNvb3JkaW5hdGUpKSkge1xuICAgICAgICByYW5kb21Db29yZGluYXRlID0gcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuZWRDb29yZGluYXRlcy5wdXNoKEpTT04uc3RyaW5naWZ5KHJhbmRvbUNvb3JkaW5hdGUpKTtcbiAgICAgIGNvbnNvbGUubG9nKHJldHVybmVkQ29vcmRpbmF0ZXMpO1xuICAgICAgcmV0dXJuIHJhbmRvbUNvb3JkaW5hdGU7XG4gICAgfSxcbiAgICBoaXRBYm92ZVNxdWFyZSgpIHtcbiAgICAgIGNvbnN0IGNvb3Jkc1JldHVybmVkU29GYXIgPSByZXR1cm5lZENvb3JkaW5hdGVzLm1hcCgoc3RyKSA9PlxuICAgICAgICBKU09OLnBhcnNlKHN0cilcbiAgICAgICk7XG4gICAgICBjb25zdCBsYXN0Q29vcmRWYWx1ZSA9XG4gICAgICAgIGNvb3Jkc1JldHVybmVkU29GYXJbY29vcmRzUmV0dXJuZWRTb0Zhci5sZW5ndGggLSAxXTtcblxuICAgICAgYWRqYWNlbnRIaXRzU29GYXIucHVzaChsYXN0Q29vcmRWYWx1ZSk7IC8vIHVzZSB0aGlzIGFycmF5IHRvIGdldCB0aGUgZmlyc3QgYWRqIGhpdCB2YWx1ZSwgc28gdGhhdCB3ZSBjYW4gdGFyZ2V0IGJlbG93IHNxdWFyZVxuICAgICAgY29uc29sZS5sb2coYWRqYWNlbnRIaXRzU29GYXIpO1xuXG4gICAgICBsZXQgYWJvdmVTcXVhcmUgPSBbbGFzdENvb3JkVmFsdWVbMF0sIGxhc3RDb29yZFZhbHVlWzFdICsgMV07XG4gICAgICBjb25zb2xlLmxvZyhhYm92ZVNxdWFyZSk7XG4gICAgICBjb25zdCBvcmlnaW4gPSBhZGphY2VudEhpdHNTb0ZhclswXTtcbiAgICAgIGNvbnNvbGUubG9nKGBPcmlnaW4gcG9pbnQgaXM6ICR7b3JpZ2lufWApO1xuXG4gICAgICB3aGlsZSAoXG4gICAgICAgIHJldHVybmVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoYWJvdmVTcXVhcmUpKSB8fFxuICAgICAgICBhYm92ZVNxdWFyZVsxXSA+IDEwXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgYmxvY2tMb3dlciA9IFtvcmlnaW5bMF0sIG9yaWdpblsxXSAtIDFdO1xuICAgICAgICBjb25zb2xlLmxvZyhibG9ja0xvd2VyKTtcbiAgICAgICAgaWYgKHJldHVybmVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoYmxvY2tMb3dlcikpKSB7XG4gICAgICAgICAgYWJvdmVTcXVhcmUgPSByZXR1cm5SYW5kb21Db29yZGluYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWJvdmVTcXVhcmUgPSBibG9ja0xvd2VyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB3aGlsZSAoYWJvdmVTcXVhcmVbMV0gPCAxKSB7XG4gICAgICAgIGFib3ZlU3F1YXJlID0gcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgICB3aGlsZSAocmV0dXJuZWRDb29yZGluYXRlcy5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShhYm92ZVNxdWFyZSkpKSB7XG4gICAgICAgICAgYWJvdmVTcXVhcmUgPSByZXR1cm5SYW5kb21Db29yZGluYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGFib3ZlU3F1YXJlKTtcblxuICAgICAgcmV0dXJuZWRDb29yZGluYXRlcy5wdXNoKEpTT04uc3RyaW5naWZ5KGFib3ZlU3F1YXJlKSk7XG4gICAgICBjb25zb2xlLmxvZyhyZXR1cm5lZENvb3JkaW5hdGVzKTtcbiAgICAgIHJldHVybiBhYm92ZVNxdWFyZTtcbiAgICB9LFxuICAgIGhpdEJlbG93U3F1YXJlKCkge1xuICAgICAgY29uc3QgY29vcmRzUmV0dXJuZWRTb0ZhciA9IHJldHVybmVkQ29vcmRpbmF0ZXMubWFwKChzdHIpID0+XG4gICAgICAgIEpTT04ucGFyc2Uoc3RyKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGxhc3RDb29yZFZhbHVlID1cbiAgICAgICAgY29vcmRzUmV0dXJuZWRTb0Zhcltjb29yZHNSZXR1cm5lZFNvRmFyLmxlbmd0aCAtIDFdO1xuXG4gICAgICBhZGphY2VudEhpdHNTb0Zhci5wdXNoKGxhc3RDb29yZFZhbHVlKTtcbiAgICAgIGNvbnNvbGUubG9nKGFkamFjZW50SGl0c1NvRmFyKTtcblxuICAgICAgbGV0IGJlbG93U3F1YXJlID0gW2xhc3RDb29yZFZhbHVlWzBdLCBsYXN0Q29vcmRWYWx1ZVsxXSAtIDFdO1xuICAgICAgY29uc29sZS5sb2coYmVsb3dTcXVhcmUpO1xuICAgICAgd2hpbGUgKHJldHVybmVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoSlNPTi5zdHJpbmdpZnkoYmVsb3dTcXVhcmUpKSkge1xuICAgICAgICBjb25zdCBvcmlnaW4gPSBhZGphY2VudEhpdHNTb0ZhclswXTtcbiAgICAgICAgY29uc3QgYmxvY2tMb3dlciA9IFtvcmlnaW5bMF0sIG9yaWdpblsxXSAtIDFdO1xuICAgICAgICBpZiAocmV0dXJuZWRDb29yZGluYXRlcy5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShibG9ja0xvd2VyKSkpIHtcbiAgICAgICAgICBiZWxvd1NxdWFyZSA9IHJldHVyblJhbmRvbUNvb3JkaW5hdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiZWxvd1NxdWFyZSA9IGJsb2NrTG93ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHdoaWxlIChiZWxvd1NxdWFyZVsxXSA8IDEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3dlIGdvaW5nIHN1YiB6ZXJvJyk7XG4gICAgICAgIGJlbG93U3F1YXJlID0gcmV0dXJuUmFuZG9tQ29vcmRpbmF0ZSgpO1xuICAgICAgICB3aGlsZSAocmV0dXJuZWRDb29yZGluYXRlcy5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShiZWxvd1NxdWFyZSkpKSB7XG4gICAgICAgICAgYmVsb3dTcXVhcmUgPSByZXR1cm5SYW5kb21Db29yZGluYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGJlbG93U3F1YXJlKTtcblxuICAgICAgcmV0dXJuZWRDb29yZGluYXRlcy5wdXNoKEpTT04uc3RyaW5naWZ5KGJlbG93U3F1YXJlKSk7XG4gICAgICBjb25zb2xlLmxvZyhyZXR1cm5lZENvb3JkaW5hdGVzKTtcbiAgICAgIHJldHVybiBiZWxvd1NxdWFyZTtcbiAgICB9LFxuICB9O1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgcGxheWVyMSwgcGxheWVyMiB9IGZyb20gJy4nO1xuaW1wb3J0IHsgaGlkZUdyaWQsIHJldmVhbEdyaWQgfSBmcm9tICcuL0RPTUludGVyYWN0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVR1cm5zKCkge1xuICBpZiAocGxheWVyMS5teVR1cm4gPT09IHRydWUpIHtcbiAgICBwbGF5ZXIxLm15VHVybiA9IGZhbHNlO1xuICAgIHBsYXllcjIubXlUdXJuID0gdHJ1ZTtcbiAgfVxufVxubGV0IGFpbUZvckFib3ZlU3F1YXJlO1xubGV0IGFpbWZvckJlbG93U3F1YXJlO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tbWVuY2VDb21wdXRlckF0dGFjaygpIHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGFpbUZvckFib3ZlU3F1YXJlKSB7XG4gICAgICBjb25zdCBjb21wQWRqQXR0YWNrID0gcGxheWVyMS5teUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFxuICAgICAgICBwbGF5ZXIyLmhpdEFib3ZlU3F1YXJlKCkgLy8gc2hvdWxkIHJlbmFtZSB0byBoaXRBYm92ZVNxdWFyZT8gY29zIHRlY2huaWNhbGx5IG5vdCB0YXJnZXR0aW5nIGFkamFjZW50IHNxdWFyZXNcbiAgICAgICk7XG4gICAgICBpZiAoY29tcEFkakF0dGFjayA9PT0gJ3RoZSBoaXQgd2FzIHN1Y2Nlc3NmdWwnKSB7XG4gICAgICAgIHBsYXllcjEubXlUdXJuID0gdHJ1ZTtcbiAgICAgICAgcGxheWVyMi5teVR1cm4gPSBmYWxzZTtcbiAgICAgICAgaGlkZUdyaWQoJ3BsYXllcicpO1xuICAgICAgICByZXZlYWxHcmlkKCdvcHBvbmVudCcpO1xuICAgICAgICBhaW1Gb3JBYm92ZVNxdWFyZSA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChjb21wQWRqQXR0YWNrID09PSAndGhlIGF0dGFjayBkaWQgbm90IGhpdCBhbnl0aGluZycpIHtcbiAgICAgICAgcGxheWVyMS5teVR1cm4gPSB0cnVlO1xuICAgICAgICBwbGF5ZXIyLm15VHVybiA9IGZhbHNlO1xuICAgICAgICBoaWRlR3JpZCgncGxheWVyJyk7XG4gICAgICAgIHJldmVhbEdyaWQoJ29wcG9uZW50Jyk7XG4gICAgICAgIGFpbUZvckFib3ZlU3F1YXJlID0gZmFsc2U7XG4gICAgICAgIGFpbWZvckJlbG93U3F1YXJlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYWltZm9yQmVsb3dTcXVhcmUpIHtcbiAgICAgIGNvbnN0IGNvbXBCZWxvd0F0dGFjayA9IHBsYXllcjEubXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgICAgcGxheWVyMi5oaXRCZWxvd1NxdWFyZSgpXG4gICAgICApO1xuICAgICAgaWYgKGNvbXBCZWxvd0F0dGFjayA9PT0gJ3RoZSBoaXQgd2FzIHN1Y2Nlc3NmdWwnKSB7XG4gICAgICAgIHBsYXllcjEubXlUdXJuID0gdHJ1ZTtcbiAgICAgICAgcGxheWVyMi5teVR1cm4gPSBmYWxzZTtcbiAgICAgICAgaGlkZUdyaWQoJ3BsYXllcicpO1xuICAgICAgICByZXZlYWxHcmlkKCdvcHBvbmVudCcpO1xuICAgICAgICBhaW1Gb3JBYm92ZVNxdWFyZSA9IGZhbHNlO1xuICAgICAgICBhaW1mb3JCZWxvd1NxdWFyZSA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChjb21wQmVsb3dBdHRhY2sgPT09ICd0aGUgYXR0YWNrIGRpZCBub3QgaGl0IGFueXRoaW5nJykge1xuICAgICAgICBwbGF5ZXIxLm15VHVybiA9IHRydWU7XG4gICAgICAgIHBsYXllcjIubXlUdXJuID0gZmFsc2U7XG4gICAgICAgIGhpZGVHcmlkKCdwbGF5ZXInKTtcbiAgICAgICAgcmV2ZWFsR3JpZCgnb3Bwb25lbnQnKTtcbiAgICAgICAgYWltRm9yQWJvdmVTcXVhcmUgPSBmYWxzZTtcbiAgICAgICAgYWltZm9yQmVsb3dTcXVhcmUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBhaW1Gb3JBYm92ZVNxdWFyZSA9IGZhbHNlO1xuICAgIGFpbWZvckJlbG93U3F1YXJlID0gZmFsc2U7XG4gICAgY29uc3QgY29tcEF0dGFjayA9IHBsYXllcjEubXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhcbiAgICAgIHBsYXllcjIubWFrZVJhbmRvbU1vdmUoKVxuICAgICk7XG4gICAgaWYgKGNvbXBBdHRhY2sgPT09ICd0aGUgaGl0IHdhcyBzdWNjZXNzZnVsJykge1xuICAgICAgYWltRm9yQWJvdmVTcXVhcmUgPSB0cnVlOyAvLyBlbnN1cmVzIGFib3ZlIGJsb2NrIHdpbGwgYmUgdGFyZ2V0ZWQgb24gbmV4dCBjbGlja1xuICAgIH1cbiAgICBwbGF5ZXIxLm15VHVybiA9IHRydWU7XG4gICAgcGxheWVyMi5teVR1cm4gPSBmYWxzZTtcbiAgICBoaWRlR3JpZCgncGxheWVyJyk7XG4gICAgcmV2ZWFsR3JpZCgnb3Bwb25lbnQnKTtcbiAgfSwgJzIwMCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2hvc2VUdXJuSXNJdCgpIHtcbiAgaWYgKHBsYXllcjEubXlUdXJuID09PSB0cnVlKSB7XG4gICAgaGlkZUdyaWQoJ3BsYXllcicpO1xuICAgIHJldHVybiAncGxheWVyJztcbiAgfVxuICBoaWRlR3JpZCgnb3Bwb25lbnQnKTtcbiAgcmV0dXJuICdvcHBvbmVudCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXR1cm5SYW5kb21Db29yZGluYXRlKCkge1xuICByZXR1cm4gW1xuICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEsXG4gICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMSxcbiAgXTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgeyBHYW1lYm9hcmQsIENyZWF0ZVNoaXAsIFBsYXllciB9IGZyb20gJy4vZmFjdG9yeSc7XG5pbXBvcnQgeyBnZW5lcmF0ZUdyaWQsIHJlbmRlclNoaXAsIGhpZGVHcmlkIH0gZnJvbSAnLi9ET01JbnRlcmFjdGlvbic7XG5cbmdlbmVyYXRlR3JpZCgncGxheWVyJyk7XG5nZW5lcmF0ZUdyaWQoJ29wcG9uZW50Jyk7XG5cbi8vIGVuYWJsZSBzb21lIGtpbmQgb2YgJ1N0YXJ0IEdhbWUnIHBvcHVwIGJ1dHRvbiBoZXJlXG4vLyBvbmNlIHRoYXQgYnV0dG9uIGlzIGNsaWNrZWQsIHRoZW4gaGlkZSBwbGF5ZXIxIGdyaWQgYXMgc2VlbiBiZWxvdzpcbmhpZGVHcmlkKCdwbGF5ZXInKTsgLy8gcGxheWVyMXMgZ3JpZCBzdGFydHMgaGlkZGVuIGF0IGZpcnN0XG5cbmNvbnN0IHBsYXllcjFnYiA9IEdhbWVib2FyZCgpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoJ0pvaG55JywgcGxheWVyMWdiKTtcbnBsYXllcjEubXlUdXJuID0gdHJ1ZTsgLy8gcGxheWVyMSBhbHdheXMgc3RhcnRzIGZpcnN0IG1vdmVcbmNvbnN0IHBsYXllcjJnYiA9IEdhbWVib2FyZCgpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjIgPSBQbGF5ZXIoJ0NvbXB1dGVyJywgcGxheWVyMmdiKTtcblxuY29uc29sZS5sb2cocGxheWVyMSk7XG5jb25zb2xlLmxvZyhwbGF5ZXIyKTtcblxuY29uc3QgY2FycmllciA9IENyZWF0ZVNoaXAoNSk7XG5jb25zdCBiYXR0bGVzaGlwID0gQ3JlYXRlU2hpcCg0KTtcbmNvbnN0IGNydWlzZXIgPSBDcmVhdGVTaGlwKDMpO1xuY29uc3Qgc3VibWFyaW5lID0gQ3JlYXRlU2hpcCgyKTtcbmNvbnN0IHNpbmtib2F0ID0gQ3JlYXRlU2hpcCgxKTtcblxuY29uc3QgcDFjYXJyaWVyID0gcGxheWVyMS5teUdhbWVib2FyZC5wbGFjZVNoaXAoY2FycmllciwgWzEsIDEwXSk7XG5yZW5kZXJTaGlwKHAxY2FycmllciwgJ3BsYXllcicpO1xuY29uc3QgcDFiYXR0bGVzaGlwID0gcGxheWVyMS5teUdhbWVib2FyZC5wbGFjZVNoaXAoYmF0dGxlc2hpcCwgWzMsIDRdKTtcbnJlbmRlclNoaXAocDFiYXR0bGVzaGlwLCAncGxheWVyJyk7XG5jb25zdCBwMWNydWlzZXIgPSBwbGF5ZXIxLm15R2FtZWJvYXJkLnBsYWNlU2hpcChjcnVpc2VyLCBbNSwgOF0pO1xucmVuZGVyU2hpcChwMWNydWlzZXIsICdwbGF5ZXInKTtcbmNvbnN0IHAxc3VibWFyaW5lID0gcGxheWVyMS5teUdhbWVib2FyZC5wbGFjZVNoaXAoc3VibWFyaW5lLCBbMTAsIDEwXSk7XG5yZW5kZXJTaGlwKHAxc3VibWFyaW5lLCAncGxheWVyJyk7XG5jb25zdCBwMXNpbmtib2F0ID0gcGxheWVyMS5teUdhbWVib2FyZC5wbGFjZVNoaXAoc2lua2JvYXQsIFsxMCwgMV0pO1xucmVuZGVyU2hpcChwMXNpbmtib2F0LCAncGxheWVyJyk7XG5cbmNvbnN0IHAyY2FycmllciA9IHBsYXllcjIubXlHYW1lYm9hcmQucGxhY2VTaGlwKGNhcnJpZXIsIFs2LCA4XSk7XG5yZW5kZXJTaGlwKHAyY2FycmllciwgJ29wcG9uZW50Jyk7XG5jb25zdCBwMmJhdHRsZXNoaXAgPSBwbGF5ZXIyLm15R2FtZWJvYXJkLnBsYWNlU2hpcChiYXR0bGVzaGlwLCBbNCwgNl0pO1xucmVuZGVyU2hpcChwMmJhdHRsZXNoaXAsICdvcHBvbmVudCcpO1xuY29uc3QgcDJjcnVpc2VyID0gcGxheWVyMi5teUdhbWVib2FyZC5wbGFjZVNoaXAoY3J1aXNlciwgWzEwLCA0XSk7XG5yZW5kZXJTaGlwKHAyY3J1aXNlciwgJ29wcG9uZW50Jyk7XG5jb25zdCBwMnN1Ym1hcmluZSA9IHBsYXllcjIubXlHYW1lYm9hcmQucGxhY2VTaGlwKHN1Ym1hcmluZSwgWzEsIDRdKTtcbnJlbmRlclNoaXAocDJzdWJtYXJpbmUsICdvcHBvbmVudCcpO1xuY29uc3QgcDJzaW5rYm9hdCA9IHBsYXllcjIubXlHYW1lYm9hcmQucGxhY2VTaGlwKHNpbmtib2F0LCBbMiwgMTBdKTtcbnJlbmRlclNoaXAocDJzaW5rYm9hdCwgJ29wcG9uZW50Jyk7XG5cbi8vIFRISU5HUyBUTyBETzpcbi8vIGZvY3VzIG9uIGNsZWFuaW5nIHVwIG91ciBjb2RlL3Byb2dyYW0sIG1ha2UgaXQgbW9yZSBjbGVhci9lZmZpY2llbnQgZm9yIG5vd1xuXG4vLyBvYnNjdXJlIG9wcG9uZW50IHNoaXAgbG9jYXRpb25zXG4vLyBwdXQgT2JzY3VyZUNvbXB1dGVyU2hpcHMoKSBoZXJlPyB0aGUgZnVuY3Rpb24gd2lsbCBzZXQgdGhlIGNvbXB1dGVyIHNpZGUgY2VsbHMgYmFja2dyb3VuZCBjb2xvciB0byB3aGl0ZVxuXG4vLyBtYWtlIGEgZnVuY3Rpb24gdGhhdCByYW5kb21seSBwbGFjZSBzaGlwcyBvbiBiZWhhbGYgb2YgdGhlIHVzZXIgb24gcmVmcmVzaCwgdGhlbiBhbGxvdyBkcmFnIGFuZCBkcm9wP1xuLy8gZS5nLiByYW5kb21pc2VTaGlwcyhwbGF5ZXJPckNvbXB1dGVyc0dyaWQpXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImgxIHtcXG4gIGNvbG9yOiBibHVlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDNlbTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG50ZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCwgMC41KTtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiAzNXB4O1xcbn1cXG5cXG50ZDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTkwLCAxODgsIDE4OCk7XFxufVxcblxcbi5wbGF5ZXItc3F1YXJlLFxcbi5vcHBvbmVudC1zcXVhcmUge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsUUFBUTtFQUNSLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxZQUFZO0VBQ1osV0FBVztBQUNiOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBOztFQUVFLHlCQUF5QjtBQUMzQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJoMSB7XFxuICBjb2xvcjogYmx1ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAzZW07XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxudGQge1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDAsIDAuNSk7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICB3aWR0aDogMzVweDtcXG59XFxuXFxudGQ6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5MCwgMTg4LCAxODgpO1xcbn1cXG5cXG4ucGxheWVyLXNxdWFyZSxcXG4ub3Bwb25lbnQtc3F1YXJlIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJwbGF5ZXIxIiwicGxheWVyMiIsImNoYW5nZVR1cm5zIiwiY29tbWVuY2VDb21wdXRlckF0dGFjayIsInBsYXllclRhYmxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ2VuZXJhdGVHcmlkIiwicGxheWVyT3JPcHBvbmVudCIsImkiLCJyb3ciLCJjcmVhdGVFbGVtZW50IiwiaiIsImNlbGwiLCJhcHBlbmRDaGlsZCIsImNsYXNzTmFtZSIsImRhdGFzZXQiLCJpZCIsImVuYWJsZUNlbGxGdW5jdGlvbmFsaXR5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjbGlja2VkUG9zIiwidGFyZ2V0IiwicmVzdWx0Iiwic3BsaXQiLCJtYXAiLCJOdW1iZXIiLCJteVR1cm4iLCJteUdhbWVib2FyZCIsInJlY2VpdmVBdHRhY2siLCJoaWRlR3JpZCIsInJldmVhbEdyaWQiLCJlbmRHYW1lIiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsInN0eWxlIiwicG9pbnRlckV2ZW50cyIsImdyaWQiLCJ0aGVHcmlkIiwiYm9yZGVyIiwicmVuZGVyU2hpcCIsInNoaXBQb3NpdGlvbnMiLCJlbGVtZW50Iiwiam9pbiIsImJhY2tncm91bmRDb2xvciIsImRpc3BsYXlNaXNzZWRBdHRhY2tzIiwiYXJyIiwiZGlzcGxheVN1Y2Nlc3NmdWxIaXRzIiwiY29vcmRpbmF0ZSIsIndob3NlVHVybklzSXQiLCJyZXR1cm5SYW5kb21Db29yZGluYXRlIiwiQ3JlYXRlU2hpcCIsInNoaXBMZW5ndGgiLCJoaXRzVGFrZW4iLCJzdW5rIiwiaGl0IiwiY2hlY2tJZlN1bmsiLCJHYW1lYm9hcmQiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJzdWJtYXJpbmUiLCJzaW5rYm9hdCIsImFsbFNoaXBzIiwibWlzc2VkQXR0YWNrcyIsInBsYWNlU2hpcCIsInNoaXBUeXBlIiwiY29vcmRpbmF0ZXMiLCJ2YWx1ZSIsInNoaXBzVGFpbCIsImNvbnNvbGUiLCJsb2ciLCJzaGlwQXJlYSIsInB1c2giLCJmb3VuZCIsImxlbmd0aCIsImNoZWNraWZBbGxTdW5rIiwiUGxheWVyIiwibmFtZSIsInJldHVybmVkQ29vcmRpbmF0ZXMiLCJhZGphY2VudEhpdHNTb0ZhciIsIm1ha2VSYW5kb21Nb3ZlIiwicmFuZG9tQ29vcmRpbmF0ZSIsImluY2x1ZGVzIiwiSlNPTiIsInN0cmluZ2lmeSIsImhpdEFib3ZlU3F1YXJlIiwiY29vcmRzUmV0dXJuZWRTb0ZhciIsInN0ciIsInBhcnNlIiwibGFzdENvb3JkVmFsdWUiLCJhYm92ZVNxdWFyZSIsIm9yaWdpbiIsImJsb2NrTG93ZXIiLCJoaXRCZWxvd1NxdWFyZSIsImJlbG93U3F1YXJlIiwiYWltRm9yQWJvdmVTcXVhcmUiLCJhaW1mb3JCZWxvd1NxdWFyZSIsInNldFRpbWVvdXQiLCJjb21wQWRqQXR0YWNrIiwiY29tcEJlbG93QXR0YWNrIiwiY29tcEF0dGFjayIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInBsYXllcjFnYiIsInBsYXllcjJnYiIsInAxY2FycmllciIsInAxYmF0dGxlc2hpcCIsInAxY3J1aXNlciIsInAxc3VibWFyaW5lIiwicDFzaW5rYm9hdCIsInAyY2FycmllciIsInAyYmF0dGxlc2hpcCIsInAyY3J1aXNlciIsInAyc3VibWFyaW5lIiwicDJzaW5rYm9hdCJdLCJzb3VyY2VSb290IjoiIn0=