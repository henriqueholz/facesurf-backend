import { PhotosService } from './photos.service';
import { FaceApiService } from '../services/face-api.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
export declare class PhotosController {
    private readonly photosService;
    private readonly faceApiService;
    constructor(photosService: PhotosService, faceApiService: FaceApiService);
    uploadPhoto(file: Express.Multer.File, createPhotoDto: CreatePhotoDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        photographerId: string;
        url: string;
        price: number;
        faceDescriptor: number[];
        location: string | null;
        dateTaken: Date;
        status: import(".prisma/client").$Enums.PhotoStatus;
    }>;
    getPhotos(photographerId?: string, status?: 'ACTIVE' | 'SOLD'): Promise<any>;
    getPhoto(id: string): Promise<any>;
}
