"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faceDetectionOptions = exports.faceDetectionNet = exports.canvas = void 0;
const faceapi = require("face-api.js");
const canvas_1 = require("canvas");
const canvas = (0, canvas_1.createCanvas)(0, 0);
exports.canvas = canvas;
const faceDetectionNet = faceapi.nets.ssdMobilenetv1;
exports.faceDetectionNet = faceDetectionNet;
const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.5,
    maxResults: 1
});
exports.faceDetectionOptions = faceDetectionOptions;
const createCanvasElement = () => canvas;
faceapi.env.monkeyPatch({ Canvas: canvas_1.Canvas, Image: canvas_1.Image, createCanvasElement });
//# sourceMappingURL=face-api.config.js.map