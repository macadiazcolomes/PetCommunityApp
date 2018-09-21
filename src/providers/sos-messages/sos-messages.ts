import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Message } from '../../models/message';

import { UsersProvider } from '../users/users';

/*
  Generated class for the SosMessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SosMessagesProvider {
  private id: number = 0;
  private user: User;
  private messages: Message[] = [];
  constructor(public userProvider: UsersProvider, public http: HttpClient) {
    console.log('Hello SosMessagesProvider Provider');
  }

  sendMessage(sosId: string, type: string, helperID: string, message: string) {
    let msge: Message = {
      sosId: sosId,
      date: new Date(),
      type: type,
      helperID: helperID,
      message: message,
      read: false,
    };

    this.messages.push(msge);
  }

  getUsersList(sosID: string): User[] {
    let usersList: User[] = [
      {
        id: '5',
        email: 'aaa@aaa.com',
        password: '',
        name: 'Victor Stone',
        sos_subscription: false,
      },
      {
        id: '6',
        email: 'bbb@bbb.com',
        password: '',
        name: 'Diana Prince',
        sos_subscription: false,
      },
    ];
    return usersList;
  }

  getUnreadCounter(sosID: string, to: string): number {
    return 3;
  }

  getUserMessages(sosID: string, userID: string): Message[] {
    let messages: Message[] = [
      {
        sosId: '1',
        date: new Date(),
        type: 'to',
        helperID: '1',
        message: "Hello, I'm Diana",
        read: true,
      },
      {
        sosId: '1',
        date: new Date(),
        type: 'from',
        helperID: '1',
        message: "Hello, I'm Diana",
        read: true,
      },
    ];
    return messages;
  }

  markMessageAsRead(messageID: string) {}
}
