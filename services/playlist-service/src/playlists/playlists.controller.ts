import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { AddSongDto } from './dto/add-song.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  /**
   * Créer une nouvelle playlist
   * POST /playlists
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPlaylistDto: CreatePlaylistDto, @Request() req) {
    return this.playlistsService.create(createPlaylistDto, 'test-user-id');
  }

  /**
   * Récupérer toutes les playlists de l'utilisateur
   * GET /playlists
   */
  @Get()
  findAll(@Request() req) {
    return this.playlistsService.findAllByUser('test-user-id');
  }

  /**
   * Récupérer une playlist par ID
   * GET /playlists/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.playlistsService.findOne(id, 'test-user-id');
  }

  /**
   * Mettre à jour une playlist
   * PATCH /playlists/:id
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: Partial<CreatePlaylistDto>,
    @Request() req,
  ) {
    return this.playlistsService.update(id, updatePlaylistDto, 'test-user-id');
  }

  /**
   * Supprimer une playlist
   * DELETE /playlists/:id
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Request() req) {
    return this.playlistsService.remove(id, 'test-user-id');
  }

  /**
   * Ajouter une chanson à une playlist
   * POST /playlists/:id/songs
   */
  @Post(':id/songs')
  addSong(
    @Param('id') playlistId: string,
    @Body() addSongDto: AddSongDto,
    @Request() req,
  ) {
    return this.playlistsService.addSong(playlistId, addSongDto, 'test-user-id');
  }

  /**
   * Supprimer une chanson d'une playlist
   * DELETE /playlists/:id/songs/:songId
   */
  @Delete(':id/songs/:songId')
  removeSong(
    @Param('id') playlistId: string,
    @Param('songId') songId: string,
    @Request() req,
  ) {
    return this.playlistsService.removeSong(playlistId, parseInt(songId), 'test-user-id');
  }

  /**
   * Rechercher des chansons sur Deezer
   * GET /playlists/search?q=query&limit=20
   */
  @Get('search/tracks')
  searchTracks(
    @Query('q') query: string,
    @Query('limit') limit: string = '20',
  ) {
    return this.playlistsService.searchTracks(query, parseInt(limit));
  }

  /**
   * Obtenir des suggestions de chansons pour mariage
   * GET /playlists/suggestions/wedding?limit=20
   */
  @Get('suggestions/wedding')
  getWeddingSuggestions(@Query('limit') limit: string = '20') {
    return this.playlistsService.getWeddingSuggestions(parseInt(limit));
  }
} 