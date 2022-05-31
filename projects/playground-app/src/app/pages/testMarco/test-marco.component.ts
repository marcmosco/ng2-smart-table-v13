import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Ng2SmartTableComponent, ServerDataSource } from 'ng2-smart-table';
import * as _ from 'lodash';

@Component({
  selector: 'app-test-marco',
  templateUrl: './test-marco.component.html',
  styleUrls: ['./test-marco.component.css'],
})
export class TestMarcoComponent implements OnInit {
  settings = {
    noDataMessage: 'Dati non disponibili',
    selectMode: 'multi',
    selectAll: false,
    actions: {
      columnTitle: '',
      custom: [
        {
          name: 'view',
          title: 'Titolo <i></i>',
          showAction: function (row: any) {
            return row.data['cevento'] === 'PRE6018N';
          },
        },
      ],
      edit: true,
      delete: true,
      add: true,
      paste: true,
      position: 'right',
    },
    paste: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
      showAction: function (row: any) {
        return row.data.cevento === 'PRE6007N';
      },
    },
    delete: {
      confirmDelete: true,
      tableConfirmDelete: true,
      andMode: 'inline',
    },
    add: {
      confirmCreate: true,
      mode: 'inline',
    },
    columns: {
      cevento: {
        width: '200px',
        editable: false,
        title: 'Codice Evento',
        maxLength: 8,
      },
      sdescr: {
        width: '200px',
        title: 'Descrizione',
        maxLength: 150,
      },
      cchiusu: {
        width: '200px',
        title: 'Codice Chiusura',
      },
      flagias: {
        width: '60px',
        title: 'Flag IAS',
        filter: {
          type: 'list',
          config: {
            selectText: '           ',
            list: [
              { value: 'S', title: 'S' },
              { value: 'N', title: 'N' },
            ],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: '           ',
            list: [
              { value: 'S', title: 'S' },
              { value: 'N', title: 'N' },
            ],
          },
        },
      },
      dinival: {
        addable: false,
        editable: false,
        pasteble: false,
        width: '150px',
        title: 'D Ini Validità',
        defaultValue: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),

        valuePrepareFunction: (created: any) => {
          if (created) {
            return this.datePipe.transform(
              new Date(created),
              'dd/MM/yyyy HH:mm'
            );
          } else {
            return null;
          }
        },
      },
    },
  };

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
    },
    {
      id: 11,
      name: 'Nicholas DuBuque',
      username: 'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz',
    },
  ];
  source: ServerDataSource;

  @ViewChild(Ng2SmartTableComponent) myTable: Ng2SmartTableComponent;

  currentSelected: any[] = [];

  hideAdd = false;

  ngOnInit() {
    setTimeout(() => {
      this.hideAdd = true;
    }, 3000);
    this.source.onChanged().subscribe({
      next: (res) => {
        console.log(res.action);
        if (res.action === 'filter' || res.action === 'sort') {
          this.source.setPage(1);
        }
      },
    });

    this.source.onDataProcessed().subscribe({
      next: (res) => {
        this.myTable.grid.getRows().forEach((row) => {
          if (
            this.currentSelected.find((elem) => _.isEqual(elem, row.getData()))
          ) {
            this.myTable.grid.multipleSelectRow(row);
          }
        });
      },
    });
  }

  constructor(http: HttpClient, public datePipe: DatePipe) {
    this.source = new ServerDataSource(http, {
      endPoint: 'http://localhost:8090/eventi/ricerca',
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      perPage: 5,
      filterFieldKey: '#field#.contains',
      sortFieldKey: 'sort',
      //'https://jsonplaceholder.typicode.com/photos',
    });
  }
  /*
   ngOnInit(): void {
     /!* this.source.onUpdateStarted().subscribe(() => {
       this.isLoadingData = true;
     });*!/

     this.source.onChanged().subscribe({
       next: (res) => {
         console.log(res);
         this.isLoadingData = false;
       },
       error: (err) => {
         this.isLoadingData = false;
       },
     });
   }

   onCustom(event) {
     console.log(
       `Custom event '${event.action}' fired on row №: ${event.data.id}`
     );

     event.source.append(event.data);
   }

   onCreateConfirm(event) {
     if (window.confirm("Are you sure you want to create?")) {
       //console.log(event.newData);

       //call this line inside a post result
       event.confirm.resolve(event.newData);
     } else {
       event.confirm.reject();
     }
   }

   logga(event){
     console.log(event.newData);
   }*/

  public onUserRowSelect(event: any) {
    if (event.isSelected) {
      let obj = this.currentSelected.find((ele) => _.isEqual(ele, event.data));
      if (!obj) {
        this.currentSelected = this.currentSelected.concat([event.data]);
      }
    } else {
      let index = this.currentSelected.findIndex((ele) =>
        _.isEqual(ele, event.data)
      );
      if (index > -1) {
        this.currentSelected.splice(index, 1);
      }
    }

    //    console.log(this.currentSelected);
  }
}
