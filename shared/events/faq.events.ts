import { BaseEvent } from './index';

export interface FaqData {
  faqId: string;
  question: string;
  answer: string;
  category: string;
}

export type FaqCreatedEvent = BaseEvent<FaqData> & { eventType: 'faq.created' };
export type FaqUpdatedEvent = BaseEvent<{ faqId: string; changes: Partial<FaqData> }> & {
  eventType: 'faq.updated';
};
export type FaqDeletedEvent = BaseEvent<{ faqId: string }> & { eventType: 'faq.deleted' };
