export interface Message {
  id?: string;
  sosId: string;
  date: Date;
  type: string; //from, to;
  helperID: string;
  message: string;
  read: boolean;
}
