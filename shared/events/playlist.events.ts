import { BaseEvent } from './index';

export interface PlaylistData {
  playlistId: string;
  name: string;
  createdBy: string;
}

export interface SongAddedData {
  playlistId: string;
  songId: string;
  title: string;
  artist: string;
}

export type PlaylistCreatedEvent = BaseEvent<PlaylistData> & { eventType: 'playlist.created' };
export type SongAddedEvent = BaseEvent<SongAddedData> & { eventType: 'playlist.song_added' };
