import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { LoginProvider } from '../login/login';
import { UsersProvider } from '../users/users';
import { MONGODB_URL } from '../config';

/*
  Generated class for the SosMessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SosMessagesProvider {
  constructor(
    private login: LoginProvider,
    public userProvider: UsersProvider,
    public http: HttpClient
  ) {
    console.log('Hello SosMessagesProvider Provider');
  }

  sendMessage(sosId: string, message: Message): Promise<Message> {
    console.log(
      '[SosMessagesProvider] sendMessage( sosId: ' +
        sosId +
        ', message: ' +
        JSON.stringify(message) +
        ')'
    );

    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url =
            MONGODB_URL + `/protected/users/${user.id}/sos/${sosId}/messages`;
          this.http
            .post(url, message)
            .subscribe(
              (message: Message) => resolve(message),
              err => reject(err)
            );
        })
        .catch(err => reject(err));
    });
  }

  getUsersList(sosId: string): Promise<User[]> {
    console.log('[SosMessagesProvider] getUsersList( sosId: ' + sosId + ')');
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url =
            MONGODB_URL +
            `/protected/users/${user.id}/sos/${sosId}/messages/helpers`;
          this.http.get(url).subscribe(
            (users: User[]) => {
              resolve(users);
            },
            err => reject(err)
          );
        })
        .catch(err => reject(err));
    });
  }

  getUnreadCounter(sosID: string, to: string): number {
    //TODO
    return 0;
  }

  getUserMessages(sosId: string, helperId: string): Promise<Message[]> {
    console.log('[SosMessagesProvider] getUserMessages( sosId: ' + sosId + ')');

    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url =
            MONGODB_URL +
            `/protected/users/${
              user.id
            }/sos/${sosId}/messages/helper/${helperId}`;
          this.http.get(url).subscribe(
            (messages: Message[]) => {
              resolve(messages);
            },
            err => reject(err)
          );
        })
        .catch(err => reject(err));
    });
  }

  markMessageAsRead(sosId, message: Message): Promise<Message> {
    console.log(
      '[SosMessagesProvider] markMessageAsRead( sosId: ' +
        sosId +
        ' message: ' +
        JSON.stringify(message) +
        ')'
    );
    return new Promise((resolve, reject) => {
      this.login
        .getUser()
        .then((user: User) => {
          let url =
            MONGODB_URL +
            `/protected/users/${user.id}/sos/${sosId}/messages/${message.id}`;
          this.http
            .put(url, message)
            .subscribe(
              (message: Message) => resolve(message),
              err => reject(err)
            );
        })
        .catch(err => reject(err));
    });
  }
}
