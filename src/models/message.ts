import { SOS } from './sos';
import { User } from './user';

export interface Message {
  id?: number;
  sos: SOS;
  timestamp: number;
  from: User;
  to: User;
  message: string;
  read: boolean;
}
