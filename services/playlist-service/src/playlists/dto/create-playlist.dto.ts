import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsEnum } from 'class-validator';

export enum PlaylistCategory {
  WEDDING = 'wedding',
  CEREMONY = 'ceremony',
  RECEPTION = 'reception',
  DANCE = 'dance',
  BACKGROUND = 'background'
}

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsEnum(PlaylistCategory)
  category?: PlaylistCategory;
} 