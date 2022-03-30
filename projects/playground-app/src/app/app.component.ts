import { Component } from '@angular/core';

import {BasicExampleLoadService} from "./basic-example-load.service";
import {LocalDataSource} from "ng2-smart-table";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [BasicExampleLoadService],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  source: LocalDataSource;

  settings = {
    columns: {
      id: {
        title: 'ID',
        editable: false,
        addable: false,
      },


      name: {
        title: 'Full Name',
      },
      username: {
        title: 'User Name',
      },
      email: {
        title: 'Email',
      },
    },
  };

  constructor(protected service: BasicExampleLoadService) {
    this.source = new LocalDataSource();

    this.service.getData().then((data) => {
      this.source.load(data);
    });
  }
}
