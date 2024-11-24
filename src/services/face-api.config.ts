import * as faceapi from 'face-api.js';
import { Canvas, createCanvas, Image } from 'canvas';

// Create a canvas instance
const canvas = createCanvas(0, 0);
const faceDetectionNet = faceapi.nets.ssdMobilenetv1;

// Configure face detection options
const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({
  minConfidence: 0.5,
  maxResults: 1
});

// Make canvas compatible with face-api
const createCanvasElement = (): HTMLCanvasElement => canvas as unknown as HTMLCanvasElement;
faceapi.env.monkeyPatch({ Canvas, Image, createCanvasElement });

export { canvas, faceDetectionNet, faceDetectionOptions };