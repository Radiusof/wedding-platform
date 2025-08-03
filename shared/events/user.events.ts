import { BaseEvent } from './index';

export interface UserCreatedData {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export type UserCreatedEvent = BaseEvent<UserCreatedData> & {
  eventType: 'user.created';
};

export interface UserUpdatedData {
  userId: string;
  changes: Partial<Omit<UserCreatedData, 'userId'>>;
}

export type UserUpdatedEvent = BaseEvent<UserUpdatedData> & {
  eventType: 'user.updated';
};
