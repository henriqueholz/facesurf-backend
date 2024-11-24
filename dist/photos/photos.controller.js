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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const photos_service_1 = require("./photos.service");
const face_api_service_1 = require("../services/face-api.service");
const create_photo_dto_1 = require("./dto/create-photo.dto");
let PhotosController = class PhotosController {
    constructor(photosService, faceApiService) {
        this.photosService = photosService;
        this.faceApiService = faceApiService;
    }
    async uploadPhoto(file, createPhotoDto) {
        const faceDescriptor = await this.faceApiService.processUploadedPhoto(file.buffer);
        return this.photosService.uploadPhoto(createPhotoDto.photographerId, file, {
            ...createPhotoDto,
            faceDescriptor,
        });
    }
    async getPhotos(photographerId, status) {
        return this.photosService.findAll({ photographerId, status });
    }
    async getPhoto(id) {
        return this.photosService.findOne(id);
    }
};
exports.PhotosController = PhotosController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_photo_dto_1.CreatePhotoDto]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "uploadPhoto", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('photographerId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "getPhotos", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PhotosController.prototype, "getPhoto", null);
exports.PhotosController = PhotosController = __decorate([
    (0, common_1.Controller)('photos'),
    __metadata("design:paramtypes", [photos_service_1.PhotosService,
        face_api_service_1.FaceApiService])
], PhotosController);
//# sourceMappingURL=photos.controller.js.map