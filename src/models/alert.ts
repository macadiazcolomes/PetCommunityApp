import { Service } from './service';

export interface Alert {
  id?: number;
  type: string;
  name: string;
  date: number;
  service?: Service;
  notes?: string;
  alarm?: boolean;
  reminder_time?: number;
  repeat?: boolean;
  repeat_each?: string;
}
