import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';

@Component({
  selector: 'table-cell-edit-mode',
  template: `
    <div [ngSwitch]="getEditorType()">
      <table-cell-custom-editor
        *ngSwitchCase="'custom'"
        [cell]="cell"
        [inputClass]="inputClass"
        (edited)="onEdited($event)"
        [isCustomEditing]="isCustomEditing"
        [isInPasting]="isInPasting"
      >
      </table-cell-custom-editor>
      <table-cell-default-editor
        *ngSwitchDefault
        [cell]="cell"
        [isInPasting]="isInPasting"
        [inputClass]="inputClass"
        (edited)="onEdited($event)"
        [isCustomEditing]="isCustomEditing"
      >
      </table-cell-default-editor>
    </div>
  `,
})
export class EditCellComponent {
  @Input() cell: Cell;
  @Input() inputClass: string = '';
  @Input() isInPasting: boolean = false;
  @Input() isCustomEditing: boolean = false;
  @Output() edited = new EventEmitter<any>();

  onEdited(event: any): boolean {
    this.edited.next(event);
    return false;
  }

  getEditorType(): string {
    return this.cell.getColumn().editor && this.cell.getColumn().editor.type;
  }
}
