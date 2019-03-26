import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import * as firebase from 'firebase';
import {StatusBar, AdMob} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform) {
    this.rootPage = TabsPage;
    this.admobid = {
      banner: 'ca-app-pub-3981028455625793/9868380111',
      interstitial: 'ca-app-pub-3981028455625793/9728779310'
    };

    this.initFirebase();
    this.authFirebase();

    platform.ready().then(() => {
      StatusBar.styleDefault();
      this.initAdmob();
    });
  }

  initFirebase() {
    firebase.initializeApp(fbConf);
  }

  authFirebase() {
    firebase.auth().signInAnonymously().catch(function(error) {
      console.log(error)
    });
  }

  initAdmob() {
    if (AdMob) {
      AdMob.createBanner({
        adId: this.admobid.banner,
        autoShow: true
      });
    }
  }
}

ionicBootstrap(MyApp);
