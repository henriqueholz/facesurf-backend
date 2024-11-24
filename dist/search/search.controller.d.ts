import { SearchService } from './search.service';
import { FaceApiService } from '../services/face-api.service';
import { SearchPhotoDto } from './dto/search.photo.dto';
export declare class SearchController {
    private readonly searchService;
    private readonly faceApiService;
    constructor(searchService: SearchService, faceApiService: FaceApiService);
    searchPhotos(file: Express.Multer.File, searchPhotoDto: SearchPhotoDto): Promise<{
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
    }[]>;
}
