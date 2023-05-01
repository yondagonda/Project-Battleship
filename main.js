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
/* harmony export */   "generateGrid": () => (/* binding */ generateGrid),
/* harmony export */   "renderShip": () => (/* binding */ renderShip)
/* harmony export */ });
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
      cell.addEventListener('click', e => {
        const clickedPos = e.target.dataset.id;
        const result = clickedPos.split(',').map(Number);
        console.log(result);
      });
    }
    playerTable.appendChild(row);
  }
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
// function displayShip(coordinate) {}

// function renderGameboard(gb) {}

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
        console.log('ship has been sunk');
      } else console.log('not sunk yet');
    }
  };
}
function Gameboard() {
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
      if (shipsTail[0] < 1 || shipsTail[1] < 1) return console.log('ship placement out of bounds');
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
          if (allShips[i][j][0] === coordinates[0] && allShips[i][j][1] === coordinates[1]) {
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
    getAllShips() {
      return allShips;
    }
  };
}
// Game function: ships can only be placed vertically at first, with a rotate button available after
// ships need to have a 'head' of sorts, which will serve as its axis point of rotation and cursor placeholder

// Carrier: length 5
// Battleship: length 4
// Cruiser: length 3
// Submarine: length 3
// Destroyer: length 2

function Player(name, myGameboard) {
  const returnedCoordinates = []; // ensures random moves made wont repeat
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
  }; // put OpponentGameBoard as another function parameter?
}

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factory */ "./src/factory.js");
/* harmony import */ var _DOMInteraction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOMInteraction */ "./src/DOMInteraction.js");



(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.generateGrid)('player');
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.generateGrid)('opponent');
const carrier = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.CreateShip)(5);
const battleship = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.CreateShip)(4);
const player1gb = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
const player1 = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Player)('Johny', player1gb);
const player2gb = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
const player2 = (0,_factory__WEBPACK_IMPORTED_MODULE_1__.Player)('Computer', player2gb);
console.log(player1);
console.log(player2);
const p1carrier = player1.myGameboard.placeShip(carrier, [1, 5]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p1carrier, 'player');
const p1battleship = player1.myGameboard.placeShip(battleship, [3, 5]);
(0,_DOMInteraction__WEBPACK_IMPORTED_MODULE_2__.renderShip)(p1battleship, 'player');
console.log(player1.myGameboard.getAllShips());

// console.log(player1.myGameboard.receiveAttack([3, 4]));
// console.log(player1.myGameboard.receiveAttack([3, 7]));
// // console.log(player1.myGameboard.receiveAttack([3, 5]));
// // console.log(player1.myGameboard.receiveAttack([3, 3]));
// // console.log(player1.myGameboard.receiveAttack([3, 2]));

// console.log(player1.myGameboard.checkifAllSunk());
// console.log(player1.makeRandomMove());
// console.log(player1.makeRandomMove());
// console.log(player1.makeRandomMove());
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLENBQUM7QUFDN0IsTUFBTVEsVUFBVSxHQUFHUixvREFBVSxDQUFDLENBQUMsQ0FBQztBQUVoQyxNQUFNb0MsU0FBUyxHQUFHOUIsbURBQVMsRUFBRTtBQUM3QixNQUFNK0IsT0FBTyxHQUFHZCxnREFBTSxDQUFDLE9BQU8sRUFBRWEsU0FBUyxDQUFDO0FBQzFDLE1BQU1FLFNBQVMsR0FBR2hDLG1EQUFTLEVBQUU7QUFDN0IsTUFBTWlDLE9BQU8sR0FBR2hCLGdEQUFNLENBQUMsVUFBVSxFQUFFZSxTQUFTLENBQUM7QUFDN0NqRCxPQUFPLENBQUNDLEdBQUcsQ0FBQytDLE9BQU8sQ0FBQztBQUNwQmhELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDaUQsT0FBTyxDQUFDO0FBRXBCLE1BQU1DLFNBQVMsR0FBR0gsT0FBTyxDQUFDWixXQUFXLENBQUNkLFNBQVMsQ0FBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hFaEIsMkRBQVUsQ0FBQ2lELFNBQVMsRUFBRSxRQUFRLENBQUM7QUFDL0IsTUFBTUMsWUFBWSxHQUFHSixPQUFPLENBQUNaLFdBQVcsQ0FBQ2QsU0FBUyxDQUFDSCxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEVqQiwyREFBVSxDQUFDa0QsWUFBWSxFQUFFLFFBQVEsQ0FBQztBQUVsQ3BELE9BQU8sQ0FBQ0MsR0FBRyxDQUFDK0MsT0FBTyxDQUFDWixXQUFXLENBQUNILFdBQVcsRUFBRSxDQUFDOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vc3JjL0RPTUludGVyYWN0aW9uLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3J5LmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Byb2plY3QtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9wcm9qZWN0LWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5cbmxldCBwbGF5ZXJUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItc3F1YXJlJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUdyaWQocGxheWVyT3JPcHBvbmVudCkge1xuICBpZiAocGxheWVyT3JPcHBvbmVudCA9PT0gJ29wcG9uZW50Jykge1xuICAgIHBsYXllclRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wcG9uZW50LXNxdWFyZScpO1xuICB9XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IDEwOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXG4gICAgZm9yIChsZXQgaiA9IDE7IGogPD0gMTA7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICBjZWxsLmNsYXNzTmFtZSA9ICdwbGF5ZXItdGQnO1xuICAgICAgaWYgKHBsYXllck9yT3Bwb25lbnQgPT09ICdvcHBvbmVudCcpIHtcbiAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAnb3Bwb25lbnQtdGQnO1xuICAgICAgfVxuICAgICAgY2VsbC5kYXRhc2V0LmlkID0gW2ksIGpdO1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsaWNrZWRQb3MgPSBlLnRhcmdldC5kYXRhc2V0LmlkO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjbGlja2VkUG9zLnNwbGl0KCcsJykubWFwKE51bWJlcik7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcGxheWVyVGFibGUuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2hpcChzaGlwUG9zaXRpb25zLCBwbGF5ZXJPck9wcG9uZW50KSB7XG4gIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXItdGQnKTtcbiAgaWYgKHBsYXllck9yT3Bwb25lbnQgPT09ICdvcHBvbmVudCcpXG4gICAgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3Bwb25lbnQtdGQnKTtcblxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgc2hpcFBvc2l0aW9ucy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBlbGVtZW50LmpvaW4oJywnKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gY2VsbC5kYXRhc2V0LmlkKSB7XG4gICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2xpZ2h0Ymx1ZSc7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuLy8gZnVuY3Rpb24gZGlzcGxheVNoaXAoY29vcmRpbmF0ZSkge31cblxuLy8gZnVuY3Rpb24gcmVuZGVyR2FtZWJvYXJkKGdiKSB7fVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVTaGlwKHNoaXBMZW5ndGgpIHtcbiAgcmV0dXJuIHtcbiAgICBzaGlwTGVuZ3RoLFxuICAgIGhpdHNUYWtlbjogMCxcbiAgICBzdW5rOiBmYWxzZSxcbiAgICBoaXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5oaXRzVGFrZW4rKztcbiAgICB9LFxuICAgIGNoZWNrSWZTdW5rKCkge1xuICAgICAgaWYgKHRoaXMuaGl0c1Rha2VuID09PSBzaGlwTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGlwIGhhcyBiZWVuIHN1bmsnKTtcbiAgICAgIH0gZWxzZSBjb25zb2xlLmxvZygnbm90IHN1bmsgeWV0Jyk7XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgY29uc3QgY2FycmllciA9IENyZWF0ZVNoaXAoNSk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBDcmVhdGVTaGlwKDQpO1xuICBjb25zdCBhbGxTaGlwcyA9IFtdOyAvLyB0aGlzIHdpbGwgY29udGFpbiBjb29yZGluYXRlcyBvZiBhbGwgdGhlIHNoaXBzIHRoYXQgYXJlIGN1cnJlbnRseSBwcmVzZW50IG9uIHRoZSBnYW1lYm9hcmRcbiAgY29uc3QgbWlzc2VkQXR0YWNrcyA9IFtdOyAvLyBzdG9yZXMgYWxsIGF0dGFja3MgbWlzc2VkXG4gIHJldHVybiB7XG4gICAgcGxhY2VTaGlwKHNoaXBUeXBlLCBjb29yZGluYXRlcykge1xuICAgICAgY29uc3QgdmFsdWUgPSBzaGlwVHlwZS5zaGlwTGVuZ3RoO1xuICAgICAgY29uc29sZS5sb2coYHBsYWNpbmcgc2hpcCBhdCBbJHtjb29yZGluYXRlc31dYCk7XG4gICAgICAvLyBmb3IgdGhlIGNvb3JkaW5hdGVzIHBhcmFtZXRlciwgdGhlIHZhbHVlIHdvdWxkIGFjdHVhbGx5IGJlIHRoZSBjbGlja2VkIHNxdWFyZSBvbiB0aGUgRE9NXG4gICAgICBjb25zdCBzaGlwc1RhaWwgPSBbY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdIC0gKHZhbHVlIC0gMSldO1xuXG4gICAgICBpZiAoc2hpcHNUYWlsWzBdIDwgMSB8fCBzaGlwc1RhaWxbMV0gPCAxKVxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coJ3NoaXAgcGxhY2VtZW50IG91dCBvZiBib3VuZHMnKTtcblxuICAgICAgY29uc29sZS5sb2coYHRhaWwgb2Ygc2hpcCB3aWxsIGJlIFske3NoaXBzVGFpbH1dYCk7XG4gICAgICBjb25zdCBzaGlwQXJlYSA9IFtjb29yZGluYXRlc107XG5cbiAgICAgIHdoaWxlIChjb29yZGluYXRlc1sxXSAhPT0gc2hpcHNUYWlsWzFdKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzID0gW2Nvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSAtIDFdOyAvLyBpZiBzdGF0ZW1lbnRzIGdvbm5hIGJlIG5lZWRlZCBoZXJlP1xuICAgICAgICBzaGlwQXJlYS5wdXNoKGNvb3JkaW5hdGVzKTsgLy8gdGhpcyBpcyBvbmx5IGZvciB2ZXJ0aWNhbCBhbGlnbm1lbnQsIG5lZWQgYW5vdGhlciB3aGlsZSBsb29wIGZvciBob3Jpem9udGFsP1xuICAgICAgfVxuICAgICAgYWxsU2hpcHMucHVzaChzaGlwQXJlYSk7XG4gICAgICByZXR1cm4gc2hpcEFyZWE7XG4gICAgfSxcbiAgICByZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgICBjb25zb2xlLmxvZygnVGhlIGN1cnJlbnQgcG9zaXRpb25zIG9mIGFsbCBzaGlwcyBvbiB0aGUgYm9hcmQ6JywgYWxsU2hpcHMpO1xuICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYWxsU2hpcHNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhbGxTaGlwc1tpXVtqXSk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgYWxsU2hpcHNbaV1bal1bMF0gPT09IGNvb3JkaW5hdGVzWzBdICYmXG4gICAgICAgICAgICBhbGxTaGlwc1tpXVtqXVsxXSA9PT0gY29vcmRpbmF0ZXNbMV1cbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUaGlzIGF0dGFjayBoaXRzIGEgcGFydCBvZiB0aGUgc2hpcDonLCBhbGxTaGlwc1tpXSk7XG4gICAgICAgICAgICBpZiAoYWxsU2hpcHNbaV0ubGVuZ3RoID09PSA1KSB7XG4gICAgICAgICAgICAgIGNhcnJpZXIuaGl0KCk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNhcnJpZXIpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygneW91dmUgaGl0IHRoZSBDYXJyaWVyJyk7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxTaGlwc1tpXS5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgICAgYmF0dGxlc2hpcC5oaXQoKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYmF0dGxlc2hpcCk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd5b3V2ZSBoaXQgdGhlIEJhdHRsZXNoaXAnKTtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgfSAvLyBwdXQgdGhlIHJlbWFpbmluZyBpZiBzdGF0ZW1lbnRzIGZvciB0aGUgb3RoZXIgc2hpcCB0eXBlcyBiZWxvd1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gJ3RoZSBoaXQgd2FzIHN1Y2Nlc3NmdWwnO1xuXG4gICAgICBtaXNzZWRBdHRhY2tzLnB1c2goY29vcmRpbmF0ZXMpO1xuICAgICAgY29uc29sZS5sb2coYE1pc3NlZCBhdHRhY2tzIHNvIGZhcjpgLCBtaXNzZWRBdHRhY2tzKTtcbiAgICAgIHJldHVybiAndGhlIGF0dGFjayBkaWQgbm90IGhpdCBhbnl0aGluZyc7XG4gICAgfSxcbiAgICBjaGVja2lmQWxsU3VuaygpIHtcbiAgICAgIGNhcnJpZXIuY2hlY2tJZlN1bmsoKTtcbiAgICAgIGJhdHRsZXNoaXAuY2hlY2tJZlN1bmsoKTsgLy8gZG8gdGhlIHNhbWUgZm9yIHRoZSByZXN0IG9mIHRoZSBvdGhlciBzaGlwIHR5cGVzXG4gICAgICBpZiAoYmF0dGxlc2hpcC5zdW5rICYmIGNhcnJpZXIuc3VuaykgcmV0dXJuICdBbGwgc2hpcHMgaGF2ZSBiZWVuIHN1bmshJztcbiAgICAgIHJldHVybiAnVGhlcmUgYXJlIHN0aWxsIHNoaXBzIHJlbWFpbmluZyc7XG4gICAgfSxcbiAgICBnZXRBbGxTaGlwcygpIHtcbiAgICAgIHJldHVybiBhbGxTaGlwcztcbiAgICB9LFxuICB9O1xufVxuLy8gR2FtZSBmdW5jdGlvbjogc2hpcHMgY2FuIG9ubHkgYmUgcGxhY2VkIHZlcnRpY2FsbHkgYXQgZmlyc3QsIHdpdGggYSByb3RhdGUgYnV0dG9uIGF2YWlsYWJsZSBhZnRlclxuLy8gc2hpcHMgbmVlZCB0byBoYXZlIGEgJ2hlYWQnIG9mIHNvcnRzLCB3aGljaCB3aWxsIHNlcnZlIGFzIGl0cyBheGlzIHBvaW50IG9mIHJvdGF0aW9uIGFuZCBjdXJzb3IgcGxhY2Vob2xkZXJcblxuLy8gQ2FycmllcjogbGVuZ3RoIDVcbi8vIEJhdHRsZXNoaXA6IGxlbmd0aCA0XG4vLyBDcnVpc2VyOiBsZW5ndGggM1xuLy8gU3VibWFyaW5lOiBsZW5ndGggM1xuLy8gRGVzdHJveWVyOiBsZW5ndGggMlxuXG5leHBvcnQgZnVuY3Rpb24gUGxheWVyKG5hbWUsIG15R2FtZWJvYXJkKSB7XG4gIGNvbnN0IHJldHVybmVkQ29vcmRpbmF0ZXMgPSBbXTsgLy8gZW5zdXJlcyByYW5kb20gbW92ZXMgbWFkZSB3b250IHJlcGVhdFxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgbXlUdXJuOiBmYWxzZSxcbiAgICBteUdhbWVib2FyZCxcbiAgICBtYWtlUmFuZG9tTW92ZSgpIHtcbiAgICAgIGxldCByYW5kb21Db29yZGluYXRlID0gW1xuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxLFxuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxLFxuICAgICAgXTtcbiAgICAgIHdoaWxlIChyZXR1cm5lZENvb3JkaW5hdGVzLmluY2x1ZGVzKEpTT04uc3RyaW5naWZ5KHJhbmRvbUNvb3JkaW5hdGUpKSkge1xuICAgICAgICByYW5kb21Db29yZGluYXRlID0gW1xuICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDEsXG4gICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMSxcbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICAgIHJldHVybmVkQ29vcmRpbmF0ZXMucHVzaChKU09OLnN0cmluZ2lmeShyYW5kb21Db29yZGluYXRlKSk7XG4gICAgICByZXR1cm4gcmFuZG9tQ29vcmRpbmF0ZTtcbiAgICB9LFxuICB9OyAvLyBwdXQgT3Bwb25lbnRHYW1lQm9hcmQgYXMgYW5vdGhlciBmdW5jdGlvbiBwYXJhbWV0ZXI/XG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImgxIHtcXG4gIGNvbG9yOiBibHVlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDNlbTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG50ZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCwgMC41KTtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiAzNXB4O1xcbn1cXG5cXG50ZDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTkwLCAxODgsIDE4OCk7XFxufVxcblxcbi5wbGF5ZXItc3F1YXJlLFxcbi5vcHBvbmVudC1zcXVhcmUge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsUUFBUTtFQUNSLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxZQUFZO0VBQ1osV0FBVztBQUNiOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBOztFQUVFLHlCQUF5QjtBQUMzQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJoMSB7XFxuICBjb2xvcjogYmx1ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAzZW07XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxudGQge1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDAsIDAuNSk7XFxuICBoZWlnaHQ6IDM1cHg7XFxuICB3aWR0aDogMzVweDtcXG59XFxuXFxudGQ6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5MCwgMTg4LCAxODgpO1xcbn1cXG5cXG4ucGxheWVyLXNxdWFyZSxcXG4ub3Bwb25lbnQtc3F1YXJlIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDI3MGRlZyk7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IEdhbWVib2FyZCwgQ3JlYXRlU2hpcCwgUGxheWVyIH0gZnJvbSAnLi9mYWN0b3J5JztcbmltcG9ydCB7IGdlbmVyYXRlR3JpZCwgcmVuZGVyU2hpcCB9IGZyb20gJy4vRE9NSW50ZXJhY3Rpb24nO1xuXG5nZW5lcmF0ZUdyaWQoJ3BsYXllcicpO1xuZ2VuZXJhdGVHcmlkKCdvcHBvbmVudCcpO1xuXG5jb25zdCBjYXJyaWVyID0gQ3JlYXRlU2hpcCg1KTtcbmNvbnN0IGJhdHRsZXNoaXAgPSBDcmVhdGVTaGlwKDQpO1xuXG5jb25zdCBwbGF5ZXIxZ2IgPSBHYW1lYm9hcmQoKTtcbmNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoJ0pvaG55JywgcGxheWVyMWdiKTtcbmNvbnN0IHBsYXllcjJnYiA9IEdhbWVib2FyZCgpO1xuY29uc3QgcGxheWVyMiA9IFBsYXllcignQ29tcHV0ZXInLCBwbGF5ZXIyZ2IpO1xuY29uc29sZS5sb2cocGxheWVyMSk7XG5jb25zb2xlLmxvZyhwbGF5ZXIyKTtcblxuY29uc3QgcDFjYXJyaWVyID0gcGxheWVyMS5teUdhbWVib2FyZC5wbGFjZVNoaXAoY2FycmllciwgWzEsIDVdKTtcbnJlbmRlclNoaXAocDFjYXJyaWVyLCAncGxheWVyJyk7XG5jb25zdCBwMWJhdHRsZXNoaXAgPSBwbGF5ZXIxLm15R2FtZWJvYXJkLnBsYWNlU2hpcChiYXR0bGVzaGlwLCBbMywgNV0pO1xucmVuZGVyU2hpcChwMWJhdHRsZXNoaXAsICdwbGF5ZXInKTtcblxuY29uc29sZS5sb2cocGxheWVyMS5teUdhbWVib2FyZC5nZXRBbGxTaGlwcygpKTtcblxuLy8gY29uc29sZS5sb2cocGxheWVyMS5teUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLCA0XSkpO1xuLy8gY29uc29sZS5sb2cocGxheWVyMS5teUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLCA3XSkpO1xuLy8gLy8gY29uc29sZS5sb2cocGxheWVyMS5teUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLCA1XSkpO1xuLy8gLy8gY29uc29sZS5sb2cocGxheWVyMS5teUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLCAzXSkpO1xuLy8gLy8gY29uc29sZS5sb2cocGxheWVyMS5teUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFszLCAyXSkpO1xuXG4vLyBjb25zb2xlLmxvZyhwbGF5ZXIxLm15R2FtZWJvYXJkLmNoZWNraWZBbGxTdW5rKCkpO1xuLy8gY29uc29sZS5sb2cocGxheWVyMS5tYWtlUmFuZG9tTW92ZSgpKTtcbi8vIGNvbnNvbGUubG9nKHBsYXllcjEubWFrZVJhbmRvbU1vdmUoKSk7XG4vLyBjb25zb2xlLmxvZyhwbGF5ZXIxLm1ha2VSYW5kb21Nb3ZlKCkpO1xuIl0sIm5hbWVzIjpbInBsYXllclRhYmxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ2VuZXJhdGVHcmlkIiwicGxheWVyT3JPcHBvbmVudCIsImkiLCJyb3ciLCJjcmVhdGVFbGVtZW50IiwiaiIsImNlbGwiLCJhcHBlbmRDaGlsZCIsImNsYXNzTmFtZSIsImRhdGFzZXQiLCJpZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY2xpY2tlZFBvcyIsInRhcmdldCIsInJlc3VsdCIsInNwbGl0IiwibWFwIiwiTnVtYmVyIiwiY29uc29sZSIsImxvZyIsInJlbmRlclNoaXAiLCJzaGlwUG9zaXRpb25zIiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJqb2luIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJDcmVhdGVTaGlwIiwic2hpcExlbmd0aCIsImhpdHNUYWtlbiIsInN1bmsiLCJoaXQiLCJjaGVja0lmU3VuayIsIkdhbWVib2FyZCIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiYWxsU2hpcHMiLCJtaXNzZWRBdHRhY2tzIiwicGxhY2VTaGlwIiwic2hpcFR5cGUiLCJjb29yZGluYXRlcyIsInZhbHVlIiwic2hpcHNUYWlsIiwic2hpcEFyZWEiLCJwdXNoIiwicmVjZWl2ZUF0dGFjayIsImZvdW5kIiwibGVuZ3RoIiwiY2hlY2tpZkFsbFN1bmsiLCJnZXRBbGxTaGlwcyIsIlBsYXllciIsIm5hbWUiLCJteUdhbWVib2FyZCIsInJldHVybmVkQ29vcmRpbmF0ZXMiLCJteVR1cm4iLCJtYWtlUmFuZG9tTW92ZSIsInJhbmRvbUNvb3JkaW5hdGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJpbmNsdWRlcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwbGF5ZXIxZ2IiLCJwbGF5ZXIxIiwicGxheWVyMmdiIiwicGxheWVyMiIsInAxY2FycmllciIsInAxYmF0dGxlc2hpcCJdLCJzb3VyY2VSb290IjoiIn0=