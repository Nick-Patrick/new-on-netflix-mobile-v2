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

    platform.ready().then(() => {
      StatusBar.styleDefault();
      this.initFirebase();
      this.authFirebase();
      this.initAdmob();
      this.initGA();
    });
  }

  initFirebase() {
    const fbConf = {
      apiKey: 'AIzaSyAA4BsLduX1c0wnXN_N7RWXrIQD24VoMVA',
      authDomain: 'netflixtitles.firebaseapp.com',
      databaseURL: 'https://netflixtitles.firebaseio.com',
      storageBucket: 'netflixtitles.appspot.com'
    };

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

  initGA() {
    window.analytics.startTrackerWithId("UA-56321517-2");
  }
}

ionicBootstrap(MyApp);
