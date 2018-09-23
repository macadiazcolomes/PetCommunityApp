import { Service } from './service';

export interface Alert {
  id?: string;
  type: string;
  name: string;
  date: Date;
  service?: Service;
  notes?: string;
  reminder?: boolean;
  reminder_time?: Date;
  reminder_id?: number;
  push_notification_id?: string;
}
