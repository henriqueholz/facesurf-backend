import { PrismaService } from '../prisma/prisma.service';
export declare class FaceApiService {
    private prisma;
    constructor(prisma: PrismaService);
    initialize(): Promise<void>;
    detectFace(imageBuffer: Buffer): Promise<Float32Array<ArrayBufferLike>>;
    findMatchingPhotos(selfieDescriptor: Float32Array): Promise<any[]>;
    processUploadedPhoto(imageBuffer: Buffer): Promise<number[]>;
}
