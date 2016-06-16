import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DateHelper} from "../../services/DateHelper";
import {Toast} from "../../../node_modules/ionic-angular/components/toast/toast";
import {LocalNotifications} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/movie-page/movie-page.html',
  providers: [DateHelper]
})
export class MoviePage {

  private movie:any;
  private day:any;


  constructor(private _navController: NavController,
              private _navParams: NavParams,
              private dateHelper: DateHelper) {
    this.movie = this._navParams.data.movie;
    this.day = this._navParams.data.day;
  }

  goBack() {
    this._navController.pop();
  }

  setReminder(movie) {
    let todayDate = new Date();
    let titleReleaseDate = this.getTitleDate(movie);

    if (titleReleaseDate <= todayDate) {
      this.presentToast(movie, "is already released.");
      return;
    }

    this.presentToast(movie, "- Reminder set.");
    this.addNotification(movie, titleReleaseDate);
  }

  addNotification(movie, titleReleaseDate) {
    LocalNotifications.schedule({
      id: movie.Title + movie.Year,
      text: "Released on Netflix today!",
      title: movie.Title,
      at: titleReleaseDate,
      led: "FF0000",
      sound: null
    });
  }

  getTitleDate (movie) {
    var day = movie.day;
    var monthYear = movie.month;
    var month = monthYear.substring(0, movie.month.length - 4);
    var monthIndex = this.dateHelper.getMonthIndexByName(month);
    var year = monthYear.substring(monthYear.length - 4, monthYear.length);
    return new Date(parseInt(year), monthIndex - 1, day);
  }

  presentToast(movie, message) {
    let toast = Toast.create({
      message: `${movie.Title} ${message}`,
      duration: 2000,
      cssClass: 'positiveToast',
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: "Ok"
    });

    this._navController.present(toast);
  }
}