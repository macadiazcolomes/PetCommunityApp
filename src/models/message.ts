export interface Message {
  id?: number;
  sosID: string;
  timestamp: number;
  from: string; //userID
  to: string; //userID
  message: string;
  read: boolean;
}
