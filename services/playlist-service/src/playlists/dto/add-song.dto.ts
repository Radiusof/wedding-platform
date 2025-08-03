import { IsNumber, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class AddSongDto {
  @IsNumber()
  @IsNotEmpty()
  deezerId: number;

  @IsOptional()
  @IsBoolean()
  approved?: boolean;
} 