import { Service } from './service';

export interface Alert {
  id?: number;
  type: string;
  name: string;
  date: number;
  service?: Service;
  notes?: string;
  reminder?: boolean;
  reminder_time?: number;
}
