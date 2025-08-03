export interface BaseEvent<T = any> {
  /** Type d'événement au format domaine.action (ex: user.created) */
  eventType: string;
  /** Horodatage ISO 8601 */
  timestamp: string;
  /** Données métier */
  data: T;
}

export const EVENT_CHANNELS = {
  USER: 'user_events',
  FAQ: 'faq_events',
  LOCATION: 'location_events',
  ACCOMMODATION: 'accommodation_events',
  PLAYLIST: 'playlist_events',
  NOTIFICATION: 'notification_events',
} as const;

export type EventChannel = (typeof EVENT_CHANNELS)[keyof typeof EVENT_CHANNELS];
