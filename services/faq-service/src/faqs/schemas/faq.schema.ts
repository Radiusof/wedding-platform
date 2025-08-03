import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FaqDocument = Faq & Document;

export enum FaqCategory {
  GENERAL = 'general',
  WEDDING_PLANNING = 'wedding_planning',
  VENUE = 'venue',
  CATERING = 'catering',
  MUSIC = 'music',
  PHOTOGRAPHY = 'photography',
  TRANSPORT = 'transport',
  ACCOMMODATION = 'accommodation',
  GUESTS = 'guests',
  LEGAL = 'legal'
}

export enum FaqStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

@Schema({ timestamps: true })
export class Faq {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;

  @Prop({ required: true, enum: FaqCategory, default: FaqCategory.GENERAL })
  category: FaqCategory;

  @Prop({ required: true, enum: FaqStatus, default: FaqStatus.DRAFT })
  status: FaqStatus;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  helpfulCount: number;

  @Prop({ default: 0 })
  notHelpfulCount: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy?: Types.ObjectId;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);

// Index pour la recherche
FaqSchema.index({ question: 'text', answer: 'text', tags: 'text' });
FaqSchema.index({ category: 1, status: 1 });
FaqSchema.index({ order: 1 }); 