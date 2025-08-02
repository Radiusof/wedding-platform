import { BaseEvent } from './index';

export interface AccommodationData {
  accommodationId: string;
  name: string;
  price: number;
  rating: number;
  distance: number;
}

export type AccommodationCreatedEvent = BaseEvent<AccommodationData> & { eventType: 'accommodation.created' };
export type AccommodationUpdatedEvent = BaseEvent<{ accommodationId: string; changes: Partial<AccommodationData> }> & { eventType: 'accommodation.updated' };
export type AccommodationDeletedEvent = BaseEvent<{ accommodationId: string }> & { eventType: 'accommodation.deleted' };