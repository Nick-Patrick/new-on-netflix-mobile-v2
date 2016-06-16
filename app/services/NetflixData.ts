import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class NetflixDataService {
  public db: any;
  constructor() {
    this.db = firebase.database().ref('/netflix/months/');
  }
}