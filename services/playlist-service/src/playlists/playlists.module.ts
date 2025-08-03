import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { Playlist, PlaylistSchema } from './schemas/playlist.schema';
import { DeezerService } from '../deezer/deezer.service';
import { RedisProvider } from '../redis.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema }
    ])
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, DeezerService, RedisProvider],
  exports: [PlaylistsService],
})
export class PlaylistsModule {} 