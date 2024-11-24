"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
const photos_module_1 = require("../photos/photos.module");
const prisma_module_1 = require("../prisma/prisma.module");
const face_api_service_1 = require("../services/face-api.service");
const search_controller_1 = require("./search.controller");
let SearchModule = class SearchModule {
};
exports.SearchModule = SearchModule;
exports.SearchModule = SearchModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, photos_module_1.PhotosModule],
        controllers: [search_controller_1.SearchController],
        providers: [search_service_1.SearchService, face_api_service_1.FaceApiService],
    })
], SearchModule);
//# sourceMappingURL=search.module.js.map