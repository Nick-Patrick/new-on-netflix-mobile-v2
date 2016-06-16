import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MoviePage} from '../../pages/movie-page/movie-page';
import {Toast} from "../../../node_modules/ionic-angular/components/toast/toast";
import {DateHelper} from "../../services/DateHelper";
import {LocalNotifications} from 'ionic-native';

@Component({
  selector: 'MovieListItem',
  templateUrl: 'build/components/movie-list-item/movie-list-item.html',
  inputs: ['title: title', 'day: day'],
  providers: [DateHelper]
})
export class MovieListItem {
  constructor(private _navController: NavController,
              private dateHelper: DateHelper
  ) {
  }

  selectMovie(movie, day) {
    this._navController.push(MoviePage, {movie: movie, day: day});
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