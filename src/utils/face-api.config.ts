import * as faceapi from 'face-api.js';
import { Canvas, createCanvas, Image } from 'canvas';
import * as path from 'path';

// Configure face-api to use node-canvas
const canvas = new Canvas(0, 0);
faceapi.env.monkeyPatch({ Canvas, Image });

// Configure face detection options
const faceDetectionNet = faceapi.nets.ssdMobilenetv1;

export { canvas, faceDetectionNet };