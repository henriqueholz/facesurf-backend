import { IsNumber, IsOptional } from 'class-validator';

export class SearchPhotoDto {
  @IsNumber()
  @IsOptional()
  threshold?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}