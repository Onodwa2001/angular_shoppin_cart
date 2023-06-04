import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  totalNumber: number = 0;

  constructor() {
    let count = 0;

    for (let i = 0; i < sessionStorage.length; i++) {
      count += JSON.parse(String(sessionStorage.getItem(JSON.parse(String(sessionStorage.key(i)))))).qty;
    }
    this.totalNumber = count;
  }
}
