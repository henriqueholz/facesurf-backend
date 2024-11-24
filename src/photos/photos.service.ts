import { Injectable } from '@nestjs/common';
import * as faceapi from 'face-api.js';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhotosService {
  constructor(private prisma: PrismaService) {}

  async uploadPhoto(
    photographerId: string,
    file: Express.Multer.File,
    data: { price: number; location?: string },
  ) {
    const faceDescriptor = await this.extractFaceDescriptor(file);

    return this.prisma.photo.create({
      data: {
        photographerId,
        url: file.path,
        price: data.price,
        location: data.location,
        dateTaken: new Date(),
        faceDescriptor,
      },
    });
  }

  private async extractFaceDescriptor(file: Express.Multer.File): Promise<number[]> {
    // Implementation of face detection and descriptor extraction using face-api.js
    return [];
  }
}
