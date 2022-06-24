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
        {
          name: 'mod',
          title: 'Modifica periodi <i></i>',
          isActionEditing: true,
        },
      ],
      edit: true,
      delete: true,
      add: true,
      paste: true,
      cleanFilters: true,
      position: 'right',
    },

    paste: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    delete: {
      confirmDelete: true,
      tableConfirmDelete: true,
      andMode: 'inline',
    },
    add: {
      confirmCreate: true,
      mode: 'inline',
      tooltipMessage: 'pippo pluto e paperino',
    },
    columns: {
      codiceCausale: {
        width: '120px',
        title: 'Causale',
        editable: false,
      },
      codiceAttributo1: {
        width: '120px',
        title: 'Attributo 1',
        editable: false,
        filter: {
          config: {
            delay: 500,
          },
        },
      },
      codiceAttributo2: {
        width: '120px',
        title: 'Attributo 2',
        editable: false,
        filter: {
          config: {
            delay: 500,
          },
        },
      },
      codiceAttributo3: {
        width: '120px',
        editable: false,
        title: 'Attributo 3',
        filter: {
          config: {
            delay: 500,
          },
        },
      },
      codiceAttributo4: {
        width: '120px',
        editable: false,
        title: 'Attributo 4',
        filter: {
          config: {
            delay: 500,
          },
        },
      },
      segno: {
        width: '40px',
        title: 'Segno',
        defaultValue: '+',
        filter: {
          type: 'list',
          config: {
            selectText: '           ',
            list: [
              { value: '+', title: '+' },
              { value: '-', title: '-' },
            ],
          },
        },
        valuePrepareFunction: (created: any, row: any) => {
          if (!created) {
            return '+';
          }
          return created;
        },
        editor: {
          type: 'list',

          config: {
            selectText: '           ',
            list: [
              { value: '+', title: '+' },
              { value: '-', title: '-' },
            ],
            afterSelect: function (row: any, val: any) {
              let cellDare, cellAvere;
              for (const cell of row.cells) {
                if (cell.column['id'] === 'codCogeDare') {
                  cellDare = cell;
                } else if (cell.column['id'] === 'codCogeAvere') {
                  cellAvere = cell;
                }
              }
              if (val === '+') {
                [cellDare['newValue'], cellAvere['newValue']] = [
                  cellDare['value'],
                  cellAvere['value'],
                ];
              } else {
                [cellDare['newValue'], cellAvere['newValue']] = [
                  cellAvere['value'],
                  cellDare['value'],
                ];
              }
            },
          },
        },
      },
      importoEu: {
        width: '120px',
        title: 'Importo Euro',
        type: 'html',
        sort: false,

        filter: false,
      },
      importoDiv: {
        width: '120px',
        title: 'Importo Divisa',
        sort: false,
        filter: false,

        type: 'html',
      },
      codCogeDare: {
        width: '130px',
        editable: false,
        title: 'COGE Dare',
        filter: {
          config: {
            delay: 500,
          },
        },
      },
      codCogeAvere: {
        width: '130px',
        editable: false,
        title: 'COGE Avere',
        filter: {
          config: {
            delay: 500,
          },
        },
      },

      codRegolaDataContabile: {
        width: '120px',
        editable: false,
        title: 'Regola Data Contabile',
        filter: {
          config: {
            delay: 500,
          },
        },
      },
    },
    attr: {
      class: 'table table-bordered',
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
      endPoint:
        'http://localhost:8090/singoloDataload/listaRegoleContabiliEvento?codiceEvento.equals=ACQ6000N',
      pagerPageKey: 'page',
      pagerLimitKey: 'size',
      perPage: 5,
      sortFieldKey: 'sort',
      filterFieldKey: '#field#.contains',
      pk: [
        'codiceCausale',
        'codiceAttributo1',
        'codiceAttributo2',
        'codiceAttributo3',
        'codiceAttributo4',
      ],
      defaultSort: [
        'pk.codiceCausale,pk.codiceAttributo1,pk.codiceAttributo2,pk.codiceAttributo3,pk.codiceAttributo4,asc',
      ],
    });
  }

  onSaveConfirm(event) {
    console.log('Normale edit');
    event.data.importoEu = event.newData.importoEu;
    event.data.importoDiv = event.newData.importoDiv;
    event.data.segno = event.newData.segno;
    //this.addToCacheList(event.newData);

    event.confirm.resolve();
  }

  onClean() {
    this.source.reset();
  }

  onCustomEdit(event) {
    console.log('custom edit', event);
  }
}
