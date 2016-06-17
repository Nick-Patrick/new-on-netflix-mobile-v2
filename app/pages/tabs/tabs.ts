import {Component} from '@angular/core'
import {PreviousMonthPage} from '../previous-month-page/previous-month-page';
import {CurrentMonthPage} from '../current-month-page/current-month-page';
import {NextMonthPage} from '../next-month-page/next-month-page';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = PreviousMonthPage;
    this.tab2Root = CurrentMonthPage;
    this.tab3Root = NextMonthPage;
  }
}
