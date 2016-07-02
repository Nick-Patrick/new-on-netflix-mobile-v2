import {Component} from '@angular/core';
import {NetflixDataService} from '../../services/NetflixData';
import {DateHelper} from '../../services/DateHelper';
import * as _ from 'lodash';
import {MovieListItem} from "../../components/movie-list-item/movie-list-item";
import {Platform, NavController} from 'ionic-angular';
import {Loading} from "../../../node_modules/ionic-angular/components/loading/loading";

@Component({
  templateUrl: 'build/pages/current-month-page/current-month-page.html',
  directives: [MovieListItem],
  providers: [NetflixDataService, DateHelper]
})
export class PreviousMonthPage {

  private monthTitles: string[] = [];
  private currentDate: any;

  constructor(
    private platform: Platform,
    private netflixData: NetflixDataService,
    private dateHelper: DateHelper,
    private navController: NavController
  ) {
    this.presentLoading();
    this.currentDate = dateHelper.getPreviousMonth();

    this.netflixData.db.child(this.currentDate.month.toLowerCase() + this.currentDate.year).orderByKey().on('value', data => {
      this.monthTitles = data.val();
      this.monthTitles.days.forEach((day) => {
        //noinspection TypeScriptUnresolvedVariable
        day.titles = _.values(day.titles);
      });
      this.loading.dismiss();
    });

    this.trackView("Previous Month");
  }

  trackView(viewText) {
    this.platform.ready().then(() => {
      window.analytics.trackView(viewText);
    });
  }

  presentLoading() {
    this.loading = Loading.create({
      content: "Searching Netflix...",
      duration: 10000
    });
    this.navController.present(this.loading);
  }
}
