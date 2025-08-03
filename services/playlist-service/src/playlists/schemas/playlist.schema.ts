import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PlaylistDocument = Playlist & Document;

@Schema({ timestamps: true })
export class Playlist {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ default: false })
  isPublic: boolean;

  @Prop({ default: [] })
  songs: Array<{
    deezerId: number;
    title: string;
    artist: string;
    album: string;
    duration: number;
    preview: string;
    cover: string;
    addedBy: Types.ObjectId;
    addedAt: Date;
    approved: boolean;
  }>;

  @Prop({ default: 0 })
  totalDuration: number;

  @Prop({ default: 0 })
  songCount: number;

  @Prop({ default: 'wedding' })
  category: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist); 