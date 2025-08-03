import { BaseEvent } from './index';

export interface LocationData {
  locationId: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
}

export type LocationCreatedEvent = BaseEvent<LocationData> & { eventType: 'location.created' };
export type LocationUpdatedEvent = BaseEvent<{ locationId: string; changes: Partial<LocationData> }> & { eventType: 'location.updated' };
export type LocationDeletedEvent = BaseEvent<{ locationId: string }> & { eventType: 'location.deleted' };
