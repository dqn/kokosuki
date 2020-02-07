/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar ONE_FRAME = 1 / 24;\nfunction download(url, fileName) {\n    var a = document.createElement('a');\n    a.href = url;\n    a.download = fileName;\n    a.click();\n}\nfunction $(selectors) {\n    return document.querySelector(selectors);\n}\nfunction isHTMLInputElement(value) {\n    var _a;\n    return ((_a = value) === null || _a === void 0 ? void 0 : _a.files) !== undefined;\n}\nfunction getFileFromEvent(event) {\n    var target = event.target;\n    if (!isHTMLInputElement(target)) {\n        return null;\n    }\n    var files = target.files;\n    if (!files || !files.length) {\n        return null;\n    }\n    return files.item(0);\n}\nfunction setup() {\n    var video = $('#video');\n    var canvas = document.createElement('canvas');\n    $('#file').addEventListener('change', function (event) {\n        var file = getFileFromEvent(event);\n        if (!file) {\n            video.src = '';\n            $('#title').innerHTML = '';\n            return;\n        }\n        video.src = URL.createObjectURL(file);\n        $('#title').innerHTML = file.name;\n        video.addEventListener('canplay', function () {\n            canvas.width = video.videoWidth;\n            canvas.height = video.videoHeight;\n            $('#seekbar').max = video.duration.toString();\n        });\n    });\n    $('#play').addEventListener('click', function (event) {\n        if (!video.src) {\n            return;\n        }\n        var element = event.target;\n        if (video.paused) {\n            video.play();\n            element.innerHTML = 'Stop';\n        }\n        else {\n            video.pause();\n            element.innerHTML = 'Play';\n        }\n    });\n    $('#capture').addEventListener('click', function () {\n        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);\n        var fileName = Date.now() + \".jpg\";\n        var url = canvas.toDataURL('image/jpeg');\n        download(url, fileName);\n    });\n    $('#previous').addEventListener('click', function () {\n        video.currentTime -= ONE_FRAME;\n    });\n    $('#next').addEventListener('click', function () {\n        video.currentTime += ONE_FRAME;\n    });\n    $('#seekbar').addEventListener('change', function (event) {\n        var target = event.target;\n        if (!isHTMLInputElement(target)) {\n            return;\n        }\n        video.currentTime = Number(target.value);\n        setInterval(function () {\n            if (video.src) {\n                target.value = video.currentTime.toString();\n            }\n        }, 1000);\n    });\n}\nsetup();\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ });