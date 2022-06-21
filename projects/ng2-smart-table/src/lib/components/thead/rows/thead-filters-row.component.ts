import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

import { Grid } from '../../../lib/grid';
import { DataSource } from '../../../lib/data-source/data-source';
import { Column } from '../../../lib/data-set/column';

@Component({
  selector: '[ng2-st-thead-filters-row]',
  styleUrls: ['./thead-filters-row.component.scss'],
  template: `
    <th *ngIf="isMultiSelectVisible"></th>
    <th
      ng2-st-add-button
      *ngIf="showActionColumnLeft"
      [grid]="grid"
      (create)="create.emit($event)"
      (cleanFilters)="onCleanFilters($event)"
    ></th>
    <th
      *ngFor="let column of getVisibleColumns(grid.getColumns())"
      class="ng2-smart-th {{ column.id }}"
    >
      <ng2-smart-table-filter
        [source]="source"
        [column]="column"
        [inputClass]="filterInputClass"
        (filter)="filter.emit($event)"
      >
      </ng2-smart-table-filter>
    </th>
    <th
      ng2-st-add-button
      *ngIf="showActionColumnRight"
      [grid]="grid"
      [source]="source"
      [hideAddAction]="hideAddAction"
      (create)="create.emit($event)"
      (cleanFilters)="onCleanFilters($event)"
    ></th>
  `,
})
export class TheadFitlersRowComponent implements OnChanges {
  @Input() grid: Grid;
  @Input() source: DataSource;
  @Input() hideAddAction: boolean;
  @Output() create = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();
  @Output() cleanFilters = new EventEmitter<any>();

  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  filterInputClass: string;

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.filterInputClass = this.grid.getSetting('filter.inputClass');
  }

  getVisibleColumns(columns: Array<Column>): Array<Column> {
    return (columns || []).filter((column: Column) => !column.hide);
  }

  onCleanFilters(event: any) {
    this.cleanFilters.emit();
  }
}
