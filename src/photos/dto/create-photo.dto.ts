import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  photographerId: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  surfSpot?: string;

  @IsString()
  @IsOptional()
  dateShot?: string;
}
