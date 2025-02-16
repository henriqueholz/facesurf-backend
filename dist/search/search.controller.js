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
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const search_service_1 = require("./search.service");
const face_api_service_1 = require("../services/face-api.service");
const search_photo_dto_1 = require("./dto/search.photo.dto");
let SearchController = class SearchController {
    constructor(searchService, faceApiService) {
        this.searchService = searchService;
        this.faceApiService = faceApiService;
    }
    async searchPhotos(file, searchPhotoDto) {
        const faceDescriptor = await this.faceApiService.detectFace(file.buffer);
        return this.searchService.findMatchingPhotos(faceDescriptor, searchPhotoDto);
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Post)('photos'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('selfie')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, search_photo_dto_1.SearchPhotoDto]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "searchPhotos", null);
exports.SearchController = SearchController = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService,
        face_api_service_1.FaceApiService])
], SearchController);
//# sourceMappingURL=search.controller.js.map