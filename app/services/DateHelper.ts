import {Injectable} from '@angular/core';

@Injectable()
export class DateHelper {

  constructor() {
  }

  getMonthAndYearByIndex(monthIndex: number) {
    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return {
      month: month[monthIndex],
      year: this.getYearOfMonth(monthIndex)
    };
  }

  getCurrentMonthIndex () {
    return new Date().getMonth();
  }

  getNextMonthIndex () {
    var currentMonthIndex = this.getCurrentMonthIndex();
    return currentMonthIndex === 11 ? 0 : (currentMonthIndex + 1);
  }

  getPreviousMonthIndex () {
    var currentMonthIndex = this.getCurrentMonthIndex();
    return currentMonthIndex === 0 ? 11 : (currentMonthIndex - 1);
  }

  getCurrentMonth () {
    return this.getMonthAndYearByIndex(this.getCurrentMonthIndex());
  }

  getNextMonth () {
    return this.getMonthAndYearByIndex(this.getNextMonthIndex());
  }

  getPreviousMonth () {
    return this.getMonthAndYearByIndex(this.getPreviousMonthIndex())
  }

  getCurrentYear () {
    return new Date().getFullYear();
  }

  getYearOfMonth (monthIndex: number) {
    var currentYear = this.getCurrentYear();

    if (monthIndex === this.getPreviousMonthIndex() && this.getCurrentMonthIndex() === 0) {
      return currentYear - 1;
    }
    if (monthIndex === this.getNextMonthIndex() && this.getCurrentMonthIndex() === 11) {
      return currentYear + 1;
    }

    return currentYear;
  }

  getToday () {
    return new Date().getDate();
  }

  getMonthIndexByName (monthName: any) {
    if (monthName === "january") return 1;
    if (monthName === "february") return 2;
    if (monthName === "march") return 3;
    if (monthName === "april") return 4;
    if (monthName === "may") return 5;
    if (monthName === "june") return 6;
    if (monthName === "july") return 7;
    if (monthName === "august") return 8;
    if (monthName === "september") return 9;
    if (monthName === "october") return 10;
    if (monthName === "november") return 11;
    if (monthName === "december") return 12;
    return null;
  }
}