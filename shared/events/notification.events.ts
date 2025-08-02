import { BaseEvent } from './index';

export interface NotificationData {
  notificationId: string;
  userId: string;
  type: 'email' | 'sms' | 'push';
  template: string;
}

export type NotificationSentEvent = BaseEvent<NotificationData> & { eventType: 'notification.sent' };