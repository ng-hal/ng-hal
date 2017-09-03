import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Request, Response } from '@angular/http';


/** Demo application */
@Component({
  selector: 'ngh-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  model: any = {
    verb: 'GET',
    url: 'api/orders.json',
    params: [],
    link: undefined
  };

  constructor() {}

  ngOnInit() {
  }

  onFormSubmit() {
  }

  onSwitchTab(name: string) {
  }

}
