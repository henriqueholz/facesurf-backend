import { PrismaService } from '../prisma/prisma.service';
export declare class SearchService {
    private prisma;
    constructor(prisma: PrismaService);
    findMatchingPhotos(selfieBuffer: Buffer): Promise<{
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
    private extractFaceDescriptor;
    private calculateFaceDistance;
}
