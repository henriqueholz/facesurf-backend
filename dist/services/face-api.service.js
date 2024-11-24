"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceApiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const faceapi = require("face-api.js");
const face_api_config_1 = require("./face-api.config");
let FaceApiService = class FaceApiService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async initialize() {
        await face_api_config_1.faceDetectionNet.loadFromDisk('models');
        await faceapi.nets.faceLandmark68Net.loadFromDisk('models');
        await faceapi.nets.faceRecognitionNet.loadFromDisk('models');
    }
    async detectFace(imageBuffer) {
        const img = await face_api_config_1.canvas.loadImage(imageBuffer);
        const detection = await faceapi
            .detectSingleFace(img, face_api_config_1.faceDetectionOptions)
            .withFaceLandmarks()
            .withFaceDescriptor();
        if (!detection) {
            throw new Error('No face detected in the image');
        }
        return detection.descriptor;
    }
    async findMatchingPhotos(selfieDescriptor) {
        const photos = await this.prisma.photo.findMany({
            where: { faceDescriptor: { not: null } },
            include: { photographer: true }
        });
        const matches = [];
        const threshold = 0.6;
        for (const photo of photos) {
            const distance = faceapi.euclideanDistance(selfieDescriptor, new Float32Array(photo.faceDescriptor));
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
        return matches.sort((a, b) => a.distance - b.distance);
    }
    async processUploadedPhoto(imageBuffer) {
        const faceDescriptor = await this.detectFace(imageBuffer);
        return Array.from(faceDescriptor);
    }
};
exports.FaceApiService = FaceApiService;
exports.FaceApiService = FaceApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FaceApiService);
//# sourceMappingURL=face-api.service.js.map