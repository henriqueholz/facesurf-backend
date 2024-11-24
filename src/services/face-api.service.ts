import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as faceapi from 'face-api.js';
import { canvas, faceDetectionNet, faceDetectionOptions } from './face-api.config';

@Injectable()
export class FaceApiService {
  constructor(private prisma: PrismaService) {}

  async initialize() {
    // Load face-api models
    await faceDetectionNet.loadFromDisk('models');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('models');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('models');
  }

  async detectFace(imageBuffer: Buffer) {
    const img = await canvas.loadImage(imageBuffer);
    const detection = await faceapi
      .detectSingleFace(img, faceDetectionOptions)
      .withFaceLandmarks()
      .withFaceDescriptor();
    
    if (!detection) {
      throw new Error('No face detected in the image');
    }
    
    return detection.descriptor;
  }

  async findMatchingPhotos(selfieDescriptor: Float32Array) {
    // Get all photos from database
    const photos = await this.prisma.photo.findMany({
      where: { faceDescriptor: { not: null } },
      include: { photographer: true }
    });

    const matches = [];
    const threshold = 0.6; // Lower values are more strict

    for (const photo of photos) {
      const distance = faceapi.euclideanDistance(
        selfieDescriptor,
        new Float32Array(photo.faceDescriptor)
      );

      if (distance < threshold) {
        matches.push({
          photoId: photo.id,
          photographerId: photo.photographerId,
          photographerName: photo.photographer.name,
          thumbnailUrl: photo.thumbnailUrl,
          distance: distance,
          price: photo.price
        });
      }
    }

    // Sort by similarity (lower distance = more similar)
    return matches.sort((a, b) => a.distance - b.distance);
  }

  async processUploadedPhoto(imageBuffer: Buffer) {
    const faceDescriptor = await this.detectFace(imageBuffer);
    return Array.from(faceDescriptor); // Convert to regular array for storage
  }
}