import { PrismaService } from '../prisma/prisma.service';
export declare class PhotosService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadPhoto(photographerId: string, file: Express.Multer.File, data: {
        price: number;
        location?: string;
    }): Promise<{
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
    private extractFaceDescriptor;
}
