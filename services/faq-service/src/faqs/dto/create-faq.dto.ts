import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, IsNumber, Min } from 'class-validator';
import { FaqCategory, FaqStatus } from '../schemas/faq.schema';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsOptional()
  @IsEnum(FaqCategory)
  category?: FaqCategory;

  @IsOptional()
  @IsEnum(FaqStatus)
  status?: FaqStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;
} 