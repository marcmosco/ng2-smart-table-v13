import { Component, OnInit, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime, skip } from 'rxjs/operators';

import { DefaultFilter } from './default-filter';

@Component({
  selector: 'select-filter',
  template: `
    <select
      #selectFilter
      [ngClass]="inputClass"
      class="form-control"
      #inputControl
      [(ngModel)]="query"
      (change)="selectFilter.size = 1; selectFilter.blur()"
      (focus)="selectFilter.size = 5"
      (blur)="selectFilter.size = 1"
    >
      <option value="">{{ column.getFilterConfig().selectText }}</option>
      <option
        *ngFor="let option of column.getFilterConfig().list"
        [value]="option.value"
      >
        {{ option.title }}
      </option>
    </select>
  `,
})
export class SelectFilterComponent extends DefaultFilter implements OnInit {
  @ViewChild('inputControl', { read: NgControl, static: true })
  inputControl: NgControl;

  constructor() {
    super();
  }

  ngOnInit() {
    this.inputControl.valueChanges
      .pipe(skip(1), distinctUntilChanged(), debounceTime(this.delay))
      .subscribe((value: string) => this.setFilter());
  }
}
