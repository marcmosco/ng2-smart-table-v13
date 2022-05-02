import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Grid } from '../../lib/grid';
import { Cell } from '../../lib/data-set/cell';
import { Row } from '../../lib/data-set/row';

@Component({
  selector: 'ng2-smart-table-cell',
  template: `
    <ng-template #noEditing>
      <table-cell-view-mode
        *ngIf="!isInEditing"
        [cell]="cell"
      ></table-cell-view-mode>
    </ng-template>
    <table-cell-edit-mode
      *ngIf="isInEditing || isInPasting; else noEditing"
      [cell]="cell"
      [inputClass]="inputClass"
      (edited)="onEdited($event)"
      [isInPasting]="isInPasting"
    >
    </table-cell-edit-mode>
  `,
})
export class CellComponent {
  @Input() grid: Grid;
  @Input() row: Row;
  @Input() editConfirm: EventEmitter<any>;
  @Input() createConfirm: EventEmitter<any>;
  @Input() isNew: boolean;
  @Input() cell: Cell;
  @Input() inputClass: string = '';
  @Input() mode: string = 'inline';
  @Input() isInEditing: boolean = false;
  @Input() isInPasting: boolean = false;

  @Output() edited = new EventEmitter<any>();

  onEdited(event: any) {
    if (this.isNew) {
      this.grid.create(this.grid.getNewRow(), this.createConfirm);
    } else {
      this.grid.save(this.row, this.editConfirm);
    }
  }
}
