import {Component} from '@angular/core';
import {NetflixDataService} from "../../services/NetflixData";
import {DateHelper} from "../../services/DateHelper";
import * as _ from 'lodash';
import {MovieListItem} from "../../components/movie-list-item/movie-list-item";
import {Platform, NavController, Storage, LocalStorage} from 'ionic-angular';
import {Loading} from "../../../node_modules/ionic-angular/components/loading/loading";

@Component({
  templateUrl: 'build/pages/current-month-page/current-month-page.html',
  directives: [MovieListItem],
  providers: [NetflixDataService, DateHelper]
})
export class CurrentMonthPage {

  private monthTitles: string[] = [];
  private currentDate: any;

  constructor(
    private platform: Platform,
    private netflixData: NetflixDataService,
    private dateHelper: DateHelper,
    private navController: NavController
  ){
    navigator.splashscreen.hide();

    this.presentLoading();
    this.localStorage = this.localStorage || new Storage(LocalStorage);
    this.checkAndSetLocalStorage();
    this.currentDate = dateHelper.getCurrentMonth();

    this.netflixData.db.child(this.currentDate.month.toLowerCase() + this.currentDate.year).orderByKey().on('value', data => {
      this.monthTitles = data.val();
      this.localStorage.set('currentMonthTitles', this.monthTitles);

      this.monthTitles.days.forEach((day) => {
        //noinspection TypeScriptUnresolvedVariable
        day.titles = _.values(day.titles);
      });
      this.loading.dismiss();
    });

    this.trackView("Current Month");
  }

  trackView(viewText) {
    this.platform.ready().then(() => {
      window.analytics.trackView(viewText);
    });
  }

  checkAndSetLocalStorage() {
    if (this.localStorage.get('currentMonthTitles') && this.localStorage.get('currentMonthTitles').length > 0) {
      this.monthTitles = this.localStorage.get('currentMonthTitles');
      this.loading.dismiss();
    }
  }

  presentLoading() {
    this.loading = Loading.create({
      content: "Searching Netflix...",
      duration: 10000
    });
    this.navController.present(this.loading);
  }
}