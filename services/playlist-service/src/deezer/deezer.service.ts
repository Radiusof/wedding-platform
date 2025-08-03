import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface DeezerTrack {
  id: number;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: {
    id: number;
    name: string;
    link: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    tracklist: string;
    type: string;
  };
  album: {
    id: number;
    title: string;
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
    md5_image: string;
    tracklist: string;
    type: string;
  };
  type: string;
}

export interface DeezerSearchResponse {
  data: DeezerTrack[];
  total: number;
  next?: string;
}

@Injectable()
export class DeezerService {
  private readonly baseUrl = 'https://api.deezer.com';

  constructor(private configService: ConfigService) {}

  /**
   * Recherche de chansons sur Deezer
   */
  async searchTracks(query: string, limit: number = 20): Promise<DeezerSearchResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          q: query,
          limit,
        },
      });

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la recherche sur Deezer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Récupère les détails d'une chanson par son ID
   */
  async getTrackById(trackId: number): Promise<DeezerTrack> {
    try {
      const response = await axios.get(`${this.baseUrl}/track/${trackId}`);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Chanson non trouvée sur Deezer',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * Recherche de chansons populaires pour mariage
   */
  async getWeddingTracks(limit: number = 20): Promise<DeezerSearchResponse> {
    const weddingQueries = [
      'wedding songs',
      'love songs',
      'romantic music',
      'first dance wedding',
      'wedding reception music'
    ];

    const randomQuery = weddingQueries[Math.floor(Math.random() * weddingQueries.length)];
    return this.searchTracks(randomQuery, limit);
  }

  /**
   * Recherche par genre
   */
  async searchByGenre(genre: string, limit: number = 20): Promise<DeezerSearchResponse> {
    return this.searchTracks(`genre:"${genre}"`, limit);
  }

  /**
   * Recherche par artiste
   */
  async searchByArtist(artist: string, limit: number = 20): Promise<DeezerSearchResponse> {
    return this.searchTracks(`artist:"${artist}"`, limit);
  }
} 