import { IsOptional, IsEnum, IsString, IsNumber, Min, Max } from 'class-validator';
import { FaqCategory, FaqStatus } from '../schemas/faq.schema';

export class QueryFaqDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(FaqCategory)
  category?: FaqCategory;

  @IsOptional()
  @IsEnum(FaqStatus)
  status?: FaqStatus;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @IsString()
  sortBy?: string = 'order';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'asc';
} 