import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SOS } from '../../models/sos';
import { SOSHelper } from '../../models/sos-helpers';
import { User } from '../../models/user';
import { LoginProvider } from '../login/login';
import { UsersProvider } from '../users/users';

/*
  Generated class for the SosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SosProvider {
  private id: number = 0;
  private sos: SOS[] = [];
  private user: User;
  private sosHelperID: number = 0;
  private soshelpers: SOSHelper[] = [];

  constructor(
    private usersprovider: UsersProvider,
    private login: LoginProvider,
    public http: HttpClient
  ) {
    console.log('Hello SosProvider Provider');

    this.user = this.login.getUser();

    this.addSOS({
      short_description: 'Perro atropellado',
      need: 'translado a veterinaria',
      status: 'active',
      location: { lat: 111, lng: 222 },
      city: 'San Antonio',
      country: 'Chile',
      date: 1536152400000,
      userID_creator: 1,
      contact_name: 'Peter Parker',
      contact_email: 'pparker@spiderman.com',
    });

    this.addSOS({
      short_description: 'Gatos sin hogar',
      need: 'hogar temporal',
      status: 'active',
      location: { lat: 333, lng: 444 },
      city: 'San Antonio',
      country: 'Chile',
      date: 1536152400000,
      userID_creator: 1,
      contact_name: 'Bruce Wayne',
      contact_email: 'bwayne@batman.com',
    });
    this.addSOSHelper('1', '1');
  }

  addSOS(sos: SOS): SOS {
    sos.id = this.id++;
    this.sos.push(sos);
    return sos;
  }
  getSOS(sosID: string): SOS {
    return this.sos[1];
  }

  listCurrentSOS(): SOS[] {
    return this.sos.sort();
  }

  listMySOS(): SOS[] {
    return this.sos.sort();
  }

  updateSOS(sos: SOS): SOS {
    let index = this.sos.findIndex(_sos => _sos.id === sos.id);
    if (index !== -1) {
      this.sos[index] = sos;
      return sos;
    }
  }

  removeSOS(sos: SOS): boolean {
    let index = this.sos.findIndex(_sos => _sos.id === sos.id);
    if (index !== -1) {
      this.sos.splice(index, 1);
    }
    return index !== -1;
  }

  //sosHelpers
  addSOSHelper(sosID: string, userID: string): SOSHelper {
    let sosHelper: SOSHelper = {
      id: this.sosHelperID++,
      sosID: sosID,
      userID: userID,
    };
    this.soshelpers.push(sosHelper);
    return sosHelper;
  }

  //lists all the helpers (users) of a particular SOS
  listSOShelpers(sosID): User[] {
    return this.soshelpers.map(sos_helper => {
      return this.usersprovider.getUserBasicInfo(sos_helper.userID);
    });
  }

  //lists all the sos where the user is helping out
  listHelpingOutSOS(): SOS[] {
    return this.soshelpers.map(sos_helper => {
      return this.getSOS(sos_helper.sosID);
    });
  }

  isUserHelpingOut(userID: string, sos: SOS): boolean {
    return true;
  }
}
