import {Component} from '@angular/core';
import {NetflixDataService} from '../../services/NetflixData';
import {DateHelper} from '../../services/DateHelper';
import * as _ from 'lodash';
import {MovieListItem} from "../../components/movie-list-item/movie-list-item";
import {NavController, Storage, LocalStorage} from 'ionic-angular';
import {Loading} from "../../../node_modules/ionic-angular/components/loading/loading";
import {LocalStorage} from "../../../node_modules/ionic-angular/platform/storage/local-storage";

@Component({
  templateUrl: 'build/pages/current-month-page/current-month-page.html',
  directives: [MovieListItem],
  providers: [NetflixDataService, DateHelper]
})
export class NextMonthPage {

  private monthTitles: string[] = [];
  private currentDate: any;

  constructor(
    private netflixData: NetflixDataService,
    private dateHelper: DateHelper,
    private navController: NavController
  ) {
    this.presentLoading();
    this.localStorage = this.localStorage || new Storage(LocalStorage);
    this.checkAndSetLocalStorage();
    this.currentDate = dateHelper.getNextMonth();

    this.netflixData.db.child(this.currentDate.month.toLowerCase() + this.currentDate.year).orderByKey().on('value', data => {
      this.monthTitles = data.val();

      this.localStorage.set('nextMonthTitles', this.monthTitles);
      this.monthTitles.days.forEach((day) => {
        //noinspection TypeScriptUnresolvedVariable
        day.titles = _.values(day.titles);
      });
      this.loading.dismiss();
    });
  }

  checkAndSetLocalStorage() {
    if(this.localStorage.get('nextMonthTitles') && this.localStorage.get('nextMonthTitles').length > 0) {
      this.monthTitles = this.localStorage.get('nextMonthTitles');
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
