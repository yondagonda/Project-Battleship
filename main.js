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
/* harmony export */   "generateGrid": () => (/* binding */ generateGrid),
/* harmony export */   "renderShip": () => (/* binding */ renderShip)
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
    console.log(result);
    if (___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn === true) {
      ___WEBPACK_IMPORTED_MODULE_0__.player2.myGameboard.receiveAttack(result);
      console.log('now player 2 turn');
    }
    if (___WEBPACK_IMPORTED_MODULE_0__.player2.myTurn === true) {
      ___WEBPACK_IMPORTED_MODULE_0__.player1.myGameboard.receiveAttack(result);
      console.log('now player 1 turn');
    }
    (0,_game__WEBPACK_IMPORTED_MODULE_1__.changeTurns)();
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
        console.log('SHIP HAS BEEN SUNK');
        // put function here to do something to the sunken ship
      }
    }
  };
}

function Gameboard() {
  const carrier = CreateShip(5);
  const battleship = CreateShip(4);
  const allShips = [];
  const missedAttacks = [];
  return {
    placeShip(shipType, coordinates) {
      const value = shipType.shipLength;
      console.log(`placing ship at [${coordinates}]`);
      const shipsTail = [coordinates[0], coordinates[1] - (value - 1)];
      if (shipsTail[0] < 1 || shipsTail[1] < 1) return console.log('ship placement out of bounds');
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
          if (allShips[i][j][0] === coordinates[0] && allShips[i][j][1] === coordinates[1]) {
            if ((0,_game__WEBPACK_IMPORTED_MODULE_1__.whoseTurnIsIt)() === 'player') {
              (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.displaySuccessfulHits)(coordinates, 'player');
            } else {
              (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.displaySuccessfulHits)(coordinates, 'opponent');
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
        alert(`${(0,_game__WEBPACK_IMPORTED_MODULE_1__.whoseTurnIsIt)()} has won!`);
      }
      if (found) return 'the hit was successful';
      missedAttacks.push(coordinates);
      // console.log(`Missed attacks:`, missedAttacks);
      if ((0,_game__WEBPACK_IMPORTED_MODULE_1__.whoseTurnIsIt)() === 'player') {
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.displayMissedAttacks)(missedAttacks, 'player');
      } else {
        (0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_0__.displayMissedAttacks)(missedAttacks, 'opponent');
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
    }
  };
}
function Player(name, myGameboard) {
  const returnedCoordinates = [];
  return {
    name,
    myTurn: false,
    myGameboard,
    makeRandomMove() {
      let randomCoordinate = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
      while (returnedCoordinates.includes(JSON.stringify(randomCoordinate))) {
        randomCoordinate = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
      }
      returnedCoordinates.push(JSON.stringify(randomCoordinate));
      return randomCoordinate;
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
/* harmony export */   "whoseTurnIsIt": () => (/* binding */ whoseTurnIsIt)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */

function changeTurns() {
  if (___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn === true) {
    ___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn = false;
    ___WEBPACK_IMPORTED_MODULE_0__.player2.myTurn = true;
  } else {
    ___WEBPACK_IMPORTED_MODULE_0__.player2.myTurn = false;
    ___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn = true;
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

function whoseTurnIsIt() {
  if (___WEBPACK_IMPORTED_MODULE_0__.player1.myTurn === true) {
    // deactivateGrid('player');
    return 'player';
  }
  //   deactivateGrid('opponent');
  return 'opponent';
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
const carrier = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.CreateShip)(5);
const battleship = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.CreateShip)(4);
const player1gb = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
const player1 = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Player)('Johny', player1gb);
player1.myTurn = true; // player1 always starts first move

const player2gb = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
const player2 = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Player)('Computer', player2gb);
console.log(player1);
console.log(player2);
const p1carrier = player1.myGameboard.placeShip(carrier, [1, 5]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p1carrier, 'player');
const p1battleship = player1.myGameboard.placeShip(battleship, [3, 5]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p1battleship, 'player');
console.log(player1.myGameboard.getAllShips());
const p2carrier = player2.myGameboard.placeShip(carrier, [6, 8]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p2carrier, 'opponent');
const p2battleship = player2.myGameboard.placeShip(battleship, [4, 6]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p2battleship, 'opponent');
console.log(player2.myGameboard.getAllShips());
console.log(player2.makeRandomMove());
// need to make it so receiveAttack(player2.makeRandomMove()), but only execute when its computers turn

// Game function: ships can only be placed vertically at first, with a rotate button available after
// ships need to have a 'head' of sorts, which will serve as its axis point of rotation and cursor placeholder
// Carrier: length 5
// Battleship: length 4
// Cruiser: length 3
// Submarine: length 3
// Destroyer: length 2

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9ET01JbnRlcmFjdGlvbi5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnQgKi9cbmltcG9ydCB7IHBsYXllcjEsIHBsYXllcjIgfSBmcm9tICcuJztcbmltcG9ydCB7IGNoYW5nZVR1cm5zIH0gZnJvbSAnLi9nYW1lJztcblxubGV0IHBsYXllclRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1zcXVhcmUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlR3JpZChwbGF5ZXJPck9wcG9uZW50KSB7XG4gIGlmIChwbGF5ZXJPck9wcG9uZW50ID09PSAnb3Bwb25lbnQnKSB7XG4gICAgcGxheWVyVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3Bwb25lbnQtc3F1YXJlJyk7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTA7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPD0gMTA7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICBjZWxsLmNsYXNzTmFtZSA9ICdwbGF5ZXItdGQnO1xuICAgICAgaWYgKHBsYXllck9yT3Bwb25lbnQgPT09ICdvcHBvbmVudCcpIHtcbiAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAnb3Bwb25lbnQtdGQnO1xuICAgICAgfVxuICAgICAgY2VsbC5kYXRhc2V0LmlkID0gW2ksIGpdO1xuICAgICAgZW5hYmxlQ2VsbEZ1bmN0aW9uYWxpdHkoY2VsbCk7XG4gICAgfVxuICAgIHBsYXllclRhYmxlLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5hYmxlQ2VsbEZ1bmN0aW9uYWxpdHkoY2VsbCkge1xuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCBjbGlja2VkUG9zID0gZS50YXJnZXQuZGF0YXNldC5pZDtcbiAgICBjb25zdCByZXN1bHQgPSBjbGlja2VkUG9zLnNwbGl0KCcsJykubWFwKE51bWJlcik7XG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcblxuICAgIGlmIChwbGF5ZXIxLm15VHVybiA9PT0gdHJ1ZSkge1xuICAgICAgcGxheWVyMi5teUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHJlc3VsdCk7XG4gICAgICBjb25zb2xlLmxvZygnbm93IHBsYXllciAyIHR1cm4nKTtcbiAgICB9XG4gICAgaWYgKHBsYXllcjIubXlUdXJuID09PSB0cnVlKSB7XG4gICAgICBwbGF5ZXIxLm15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socmVzdWx0KTtcbiAgICAgIGNvbnNvbGUubG9nKCdub3cgcGxheWVyIDEgdHVybicpO1xuICAgIH1cbiAgICBjaGFuZ2VUdXJucygpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNoaXAoc2hpcFBvc2l0aW9ucywgcGxheWVyT3JPcHBvbmVudCkge1xuICBsZXQgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyLXRkJyk7XG4gIGlmIChwbGF5ZXJPck9wcG9uZW50ID09PSAnb3Bwb25lbnQnKVxuICAgIGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wcG9uZW50LXRkJyk7XG5cbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIHNoaXBQb3NpdGlvbnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZWxlbWVudC5qb2luKCcsJyk7XG4gICAgICBpZiAocmVzdWx0ID09PSBjZWxsLmRhdGFzZXQuaWQpIHtcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnbGlnaHRibHVlJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5TWlzc2VkQXR0YWNrcyhhcnIsIHBsYXllck9yT3Bwb25lbnQpIHtcbiAgbGV0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wcG9uZW50LXRkJyk7XG4gIGlmIChwbGF5ZXJPck9wcG9uZW50ID09PSAnb3Bwb25lbnQnKVxuICAgIGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllci10ZCcpO1xuXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBhcnIuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZWxlbWVudC5qb2luKCcsJyk7XG4gICAgICBpZiAocmVzdWx0ID09PSBjZWxsLmRhdGFzZXQuaWQpIHtcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbiAgICAgICAgY2VsbC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlTdWNjZXNzZnVsSGl0cyhjb29yZGluYXRlLCBwbGF5ZXJPck9wcG9uZW50KSB7XG4gIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcHBvbmVudC10ZCcpO1xuICBpZiAocGxheWVyT3JPcHBvbmVudCA9PT0gJ29wcG9uZW50JylcbiAgICBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcblxuICBjb25zdCByZXN1bHQgPSBjb29yZGluYXRlLmpvaW4oJywnKTtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGlmIChyZXN1bHQgPT09IGNlbGwuZGF0YXNldC5pZCkge1xuICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snO1xuICAgICAgY2VsbC5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuICAgIH1cbiAgfSk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1hbGVydCAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWN5Y2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmltcG9ydCB7IGRpc3BsYXlNaXNzZWRBdHRhY2tzLCBkaXNwbGF5U3VjY2Vzc2Z1bEhpdHMgfSBmcm9tICcuL0RPTUludGVyYWN0aW9uJztcbmltcG9ydCB7IHdob3NlVHVybklzSXQgfSBmcm9tICcuL2dhbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlU2hpcChzaGlwTGVuZ3RoKSB7XG4gIHJldHVybiB7XG4gICAgc2hpcExlbmd0aCxcbiAgICBoaXRzVGFrZW46IDAsXG4gICAgc3VuazogZmFsc2UsXG4gICAgaGl0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGl0c1Rha2VuKys7XG4gICAgfSxcbiAgICBjaGVja0lmU3VuaygpIHtcbiAgICAgIGlmICh0aGlzLmhpdHNUYWtlbiA9PT0gc2hpcExlbmd0aCkge1xuICAgICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZygnU0hJUCBIQVMgQkVFTiBTVU5LJyk7XG4gICAgICAgIC8vIHB1dCBmdW5jdGlvbiBoZXJlIHRvIGRvIHNvbWV0aGluZyB0byB0aGUgc3Vua2VuIHNoaXBcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuICBjb25zdCBjYXJyaWVyID0gQ3JlYXRlU2hpcCg1KTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IENyZWF0ZVNoaXAoNCk7XG4gIGNvbnN0IGFsbFNoaXBzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAoc2hpcFR5cGUsIGNvb3JkaW5hdGVzKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHNoaXBUeXBlLnNoaXBMZW5ndGg7XG4gICAgICBjb25zb2xlLmxvZyhgcGxhY2luZyBzaGlwIGF0IFske2Nvb3JkaW5hdGVzfV1gKTtcbiAgICAgIGNvbnN0IHNoaXBzVGFpbCA9IFtjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0gLSAodmFsdWUgLSAxKV07XG5cbiAgICAgIGlmIChzaGlwc1RhaWxbMF0gPCAxIHx8IHNoaXBzVGFpbFsxXSA8IDEpXG4gICAgICAgIHJldHVybiBjb25zb2xlLmxvZygnc2hpcCBwbGFjZW1lbnQgb3V0IG9mIGJvdW5kcycpO1xuXG4gICAgICBjb25zdCBzaGlwQXJlYSA9IFtjb29yZGluYXRlc107XG5cbiAgICAgIHdoaWxlIChjb29yZGluYXRlc1sxXSAhPT0gc2hpcHNUYWlsWzFdKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzID0gW2Nvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSAtIDFdOyAvLyBpZiBzdGF0ZW1lbnRzIGdvbm5hIGJlIG5lZWRlZCBoZXJlP1xuICAgICAgICBzaGlwQXJlYS5wdXNoKGNvb3JkaW5hdGVzKTsgLy8gdGhpcyBpcyBvbmx5IGZvciB2ZXJ0aWNhbCBhbGlnbm1lbnQsIG5lZWQgYW5vdGhlciB3aGlsZSBsb29wIGZvciBob3Jpem9udGFsP1xuICAgICAgfVxuICAgICAgYWxsU2hpcHMucHVzaChzaGlwQXJlYSk7XG4gICAgICByZXR1cm4gc2hpcEFyZWE7XG4gICAgfSxcbiAgICByZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsU2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhbGxTaGlwc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGFsbFNoaXBzW2ldW2pdWzBdID09PSBjb29yZGluYXRlc1swXSAmJlxuICAgICAgICAgICAgYWxsU2hpcHNbaV1bal1bMV0gPT09IGNvb3JkaW5hdGVzWzFdXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAod2hvc2VUdXJuSXNJdCgpID09PSAncGxheWVyJykge1xuICAgICAgICAgICAgICBkaXNwbGF5U3VjY2Vzc2Z1bEhpdHMoY29vcmRpbmF0ZXMsICdwbGF5ZXInKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRpc3BsYXlTdWNjZXNzZnVsSGl0cyhjb29yZGluYXRlcywgJ29wcG9uZW50Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbGxTaGlwc1tpXS5sZW5ndGggPT09IDUpIHtcbiAgICAgICAgICAgICAgY2Fycmllci5oaXQoKTtcbiAgICAgICAgICAgICAgY2Fycmllci5jaGVja0lmU3VuaygpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGhhdmUgaGl0IHRoZSBDYXJyaWVyJyk7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxTaGlwc1tpXS5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgICAgYmF0dGxlc2hpcC5oaXQoKTtcbiAgICAgICAgICAgICAgYmF0dGxlc2hpcC5jaGVja0lmU3VuaygpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGhhdmUgaGl0IHRoZSBCYXR0bGVzaGlwJyk7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gLy8gcHV0IHRoZSByZW1haW5pbmcgaWYgc3RhdGVtZW50cyBmb3IgdGhlIG90aGVyIHNoaXAgdHlwZXMgYmVsb3dcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNoZWNraWZBbGxTdW5rKCkpIHtcbiAgICAgICAgYWxlcnQoYCR7d2hvc2VUdXJuSXNJdCgpfSBoYXMgd29uIWApO1xuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gJ3RoZSBoaXQgd2FzIHN1Y2Nlc3NmdWwnO1xuXG4gICAgICBtaXNzZWRBdHRhY2tzLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgLy8gY29uc29sZS5sb2coYE1pc3NlZCBhdHRhY2tzOmAsIG1pc3NlZEF0dGFja3MpO1xuICAgICAgaWYgKHdob3NlVHVybklzSXQoKSA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgZGlzcGxheU1pc3NlZEF0dGFja3MobWlzc2VkQXR0YWNrcywgJ3BsYXllcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheU1pc3NlZEF0dGFja3MobWlzc2VkQXR0YWNrcywgJ29wcG9uZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAndGhlIGF0dGFjayBkaWQgbm90IGhpdCBhbnl0aGluZyc7XG4gICAgfSxcbiAgICBjaGVja2lmQWxsU3VuaygpIHtcbiAgICAgIGNhcnJpZXIuY2hlY2tJZlN1bmsoKTtcbiAgICAgIGJhdHRsZXNoaXAuY2hlY2tJZlN1bmsoKTsgLy8gZG8gdGhlIHNhbWUgZm9yIHRoZSByZXN0IG9mIHRoZSBvdGhlciBzaGlwIHR5cGVzXG4gICAgICBpZiAoYmF0dGxlc2hpcC5zdW5rICYmIGNhcnJpZXIuc3VuaykgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBnZXRBbGxTaGlwcygpIHtcbiAgICAgIHJldHVybiBhbGxTaGlwcztcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUGxheWVyKG5hbWUsIG15R2FtZWJvYXJkKSB7XG4gIGNvbnN0IHJldHVybmVkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBuYW1lLFxuICAgIG15VHVybjogZmFsc2UsXG4gICAgbXlHYW1lYm9hcmQsXG4gICAgbWFrZVJhbmRvbU1vdmUoKSB7XG4gICAgICBsZXQgcmFuZG9tQ29vcmRpbmF0ZSA9IFtcbiAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMSxcbiAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMSxcbiAgICAgIF07XG4gICAgICB3aGlsZSAocmV0dXJuZWRDb29yZGluYXRlcy5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShyYW5kb21Db29yZGluYXRlKSkpIHtcbiAgICAgICAgcmFuZG9tQ29vcmRpbmF0ZSA9IFtcbiAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxLFxuICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEsXG4gICAgICAgIF07XG4gICAgICB9XG4gICAgICByZXR1cm5lZENvb3JkaW5hdGVzLnB1c2goSlNPTi5zdHJpbmdpZnkocmFuZG9tQ29vcmRpbmF0ZSkpO1xuICAgICAgcmV0dXJuIHJhbmRvbUNvb3JkaW5hdGU7XG4gICAgfSxcbiAgfTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1jeWNsZSAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuaW1wb3J0IHsgcGxheWVyMSwgcGxheWVyMiB9IGZyb20gJy4nO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlVHVybnMoKSB7XG4gIGlmIChwbGF5ZXIxLm15VHVybiA9PT0gdHJ1ZSkge1xuICAgIHBsYXllcjEubXlUdXJuID0gZmFsc2U7XG4gICAgcGxheWVyMi5teVR1cm4gPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHBsYXllcjIubXlUdXJuID0gZmFsc2U7XG4gICAgcGxheWVyMS5teVR1cm4gPSB0cnVlO1xuICB9XG59XG5cbi8vIGZ1bmN0aW9uIGRlYWN0aXZhdGVHcmlkKGdyaWQpIHsgLy8gRU5BQkxFIFRISVMgRlVOQ1RJT04gQUZURVIgRklHVVJJTkcgT1VUIFRVUk5TIFdJVEggVEhFIENPTVBVVEVSXG4vLyAgIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcbi8vICAgaWYgKGdyaWQgPT09ICdvcHBvbmVudCcpIHtcbi8vICAgICBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcHBvbmVudC10ZCcpO1xuLy8gICB9XG4vLyAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbi8vICAgICBjZWxsLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEpJztcbi8vICAgICBjZWxsLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnJ1xuLy8gICB9KTtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIHdob3NlVHVybklzSXQoKSB7XG4gIGlmIChwbGF5ZXIxLm15VHVybiA9PT0gdHJ1ZSkge1xuICAgIC8vIGRlYWN0aXZhdGVHcmlkKCdwbGF5ZXInKTtcbiAgICByZXR1cm4gJ3BsYXllcic7XG4gIH1cbiAgLy8gICBkZWFjdGl2YXRlR3JpZCgnb3Bwb25lbnQnKTtcbiAgcmV0dXJuICdvcHBvbmVudCc7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHsgR2FtZWJvYXJkLCBDcmVhdGVTaGlwLCBQbGF5ZXIgfSBmcm9tICcuL2ZhY3RvcnknO1xuaW1wb3J0IHsgZ2VuZXJhdGVHcmlkLCByZW5kZXJTaGlwIH0gZnJvbSAnLi9ET01JbnRlcmFjdGlvbic7XG5cbmdlbmVyYXRlR3JpZCgncGxheWVyJyk7XG5nZW5lcmF0ZUdyaWQoJ29wcG9uZW50Jyk7XG5cbmNvbnN0IGNhcnJpZXIgPSBDcmVhdGVTaGlwKDUpO1xuY29uc3QgYmF0dGxlc2hpcCA9IENyZWF0ZVNoaXAoNCk7XG5cbmNvbnN0IHBsYXllcjFnYiA9IEdhbWVib2FyZCgpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoJ0pvaG55JywgcGxheWVyMWdiKTtcbnBsYXllcjEubXlUdXJuID0gdHJ1ZTsgLy8gcGxheWVyMSBhbHdheXMgc3RhcnRzIGZpcnN0IG1vdmVcblxuY29uc3QgcGxheWVyMmdiID0gR2FtZWJvYXJkKCk7XG5leHBvcnQgY29uc3QgcGxheWVyMiA9IFBsYXllcignQ29tcHV0ZXInLCBwbGF5ZXIyZ2IpO1xuXG5jb25zb2xlLmxvZyhwbGF5ZXIxKTtcbmNvbnNvbGUubG9nKHBsYXllcjIpO1xuXG5jb25zdCBwMWNhcnJpZXIgPSBwbGF5ZXIxLm15R2FtZWJvYXJkLnBsYWNlU2hpcChjYXJyaWVyLCBbMSwgNV0pO1xucmVuZGVyU2hpcChwMWNhcnJpZXIsICdwbGF5ZXInKTtcbmNvbnN0IHAxYmF0dGxlc2hpcCA9IHBsYXllcjEubXlHYW1lYm9hcmQucGxhY2VTaGlwKGJhdHRsZXNoaXAsIFszLCA1XSk7XG5yZW5kZXJTaGlwKHAxYmF0dGxlc2hpcCwgJ3BsYXllcicpO1xuY29uc29sZS5sb2cocGxheWVyMS5teUdhbWVib2FyZC5nZXRBbGxTaGlwcygpKTtcblxuY29uc3QgcDJjYXJyaWVyID0gcGxheWVyMi5teUdhbWVib2FyZC5wbGFjZVNoaXAoY2FycmllciwgWzYsIDhdKTtcbnJlbmRlclNoaXAocDJjYXJyaWVyLCAnb3Bwb25lbnQnKTtcbmNvbnN0IHAyYmF0dGxlc2hpcCA9IHBsYXllcjIubXlHYW1lYm9hcmQucGxhY2VTaGlwKGJhdHRsZXNoaXAsIFs0LCA2XSk7XG5yZW5kZXJTaGlwKHAyYmF0dGxlc2hpcCwgJ29wcG9uZW50Jyk7XG5jb25zb2xlLmxvZyhwbGF5ZXIyLm15R2FtZWJvYXJkLmdldEFsbFNoaXBzKCkpO1xuXG5jb25zb2xlLmxvZyhwbGF5ZXIyLm1ha2VSYW5kb21Nb3ZlKCkpO1xuLy8gbmVlZCB0byBtYWtlIGl0IHNvIHJlY2VpdmVBdHRhY2socGxheWVyMi5tYWtlUmFuZG9tTW92ZSgpKSwgYnV0IG9ubHkgZXhlY3V0ZSB3aGVuIGl0cyBjb21wdXRlcnMgdHVyblxuXG4vLyBHYW1lIGZ1bmN0aW9uOiBzaGlwcyBjYW4gb25seSBiZSBwbGFjZWQgdmVydGljYWxseSBhdCBmaXJzdCwgd2l0aCBhIHJvdGF0ZSBidXR0b24gYXZhaWxhYmxlIGFmdGVyXG4vLyBzaGlwcyBuZWVkIHRvIGhhdmUgYSAnaGVhZCcgb2Ygc29ydHMsIHdoaWNoIHdpbGwgc2VydmUgYXMgaXRzIGF4aXMgcG9pbnQgb2Ygcm90YXRpb24gYW5kIGN1cnNvciBwbGFjZWhvbGRlclxuLy8gQ2FycmllcjogbGVuZ3RoIDVcbi8vIEJhdHRsZXNoaXA6IGxlbmd0aCA0XG4vLyBDcnVpc2VyOiBsZW5ndGggM1xuLy8gU3VibWFyaW5lOiBsZW5ndGggM1xuLy8gRGVzdHJveWVyOiBsZW5ndGggMlxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJoMSB7XFxuICBjb2xvcjogYmx1ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAzZW07XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxudGQge1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDAsIDAuNSk7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICB3aWR0aDogMzVweDtcXG59XFxuXFxudGQ6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5MCwgMTg4LCAxODgpO1xcbn1cXG5cXG4ucGxheWVyLXNxdWFyZSxcXG4ub3Bwb25lbnQtc3F1YXJlIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFFBQVE7RUFDUix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxtQ0FBbUM7RUFDbkMsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTs7RUFFRSx5QkFBeUI7QUFDM0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiaDEge1xcbiAgY29sb3I6IGJsdWU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogM2VtO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbnRkIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwLCAwLjUpO1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgd2lkdGg6IDM1cHg7XFxufVxcblxcbnRkOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTAsIDE4OCwgMTg4KTtcXG59XFxuXFxuLnBsYXllci1zcXVhcmUsXFxuLm9wcG9uZW50LXNxdWFyZSB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgyNzBkZWcpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsicGxheWVyMSIsInBsYXllcjIiLCJjaGFuZ2VUdXJucyIsInBsYXllclRhYmxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ2VuZXJhdGVHcmlkIiwicGxheWVyT3JPcHBvbmVudCIsImkiLCJyb3ciLCJjcmVhdGVFbGVtZW50IiwiaiIsImNlbGwiLCJhcHBlbmRDaGlsZCIsImNsYXNzTmFtZSIsImRhdGFzZXQiLCJpZCIsImVuYWJsZUNlbGxGdW5jdGlvbmFsaXR5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjbGlja2VkUG9zIiwidGFyZ2V0IiwicmVzdWx0Iiwic3BsaXQiLCJtYXAiLCJOdW1iZXIiLCJjb25zb2xlIiwibG9nIiwibXlUdXJuIiwibXlHYW1lYm9hcmQiLCJyZWNlaXZlQXR0YWNrIiwicmVuZGVyU2hpcCIsInNoaXBQb3NpdGlvbnMiLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlbWVudCIsImpvaW4iLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImRpc3BsYXlNaXNzZWRBdHRhY2tzIiwiYXJyIiwicG9pbnRlckV2ZW50cyIsImRpc3BsYXlTdWNjZXNzZnVsSGl0cyIsImNvb3JkaW5hdGUiLCJ3aG9zZVR1cm5Jc0l0IiwiQ3JlYXRlU2hpcCIsInNoaXBMZW5ndGgiLCJoaXRzVGFrZW4iLCJzdW5rIiwiaGl0IiwiY2hlY2tJZlN1bmsiLCJHYW1lYm9hcmQiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImFsbFNoaXBzIiwibWlzc2VkQXR0YWNrcyIsInBsYWNlU2hpcCIsInNoaXBUeXBlIiwiY29vcmRpbmF0ZXMiLCJ2YWx1ZSIsInNoaXBzVGFpbCIsInNoaXBBcmVhIiwicHVzaCIsImZvdW5kIiwibGVuZ3RoIiwiY2hlY2tpZkFsbFN1bmsiLCJhbGVydCIsImdldEFsbFNoaXBzIiwiUGxheWVyIiwibmFtZSIsInJldHVybmVkQ29vcmRpbmF0ZXMiLCJtYWtlUmFuZG9tTW92ZSIsInJhbmRvbUNvb3JkaW5hdGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJpbmNsdWRlcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwbGF5ZXIxZ2IiLCJwbGF5ZXIyZ2IiLCJwMWNhcnJpZXIiLCJwMWJhdHRsZXNoaXAiLCJwMmNhcnJpZXIiLCJwMmJhdHRsZXNoaXAiXSwic291cmNlUm9vdCI6IiJ9