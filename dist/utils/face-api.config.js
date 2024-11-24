"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faceDetectionNet = exports.canvas = void 0;
const faceapi = require("face-api.js");
const canvas_1 = require("canvas");
const canvas = new canvas_1.Canvas(0, 0);
exports.canvas = canvas;
faceapi.env.monkeyPatch({ Canvas: canvas_1.Canvas, Image: canvas_1.Image });
const faceDetectionNet = faceapi.nets.ssdMobilenetv1;
exports.faceDetectionNet = faceDetectionNet;
//# sourceMappingURL=face-api.config.js.map