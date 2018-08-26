import { SOS } from './sos';
import { User } from './user';

export interface SOSHelper {
  id?: number;
  sos: SOS;
  user: User;
}
