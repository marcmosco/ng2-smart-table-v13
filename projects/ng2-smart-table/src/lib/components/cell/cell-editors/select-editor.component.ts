import { Component } from '@angular/core';
import { DefaultEditor } from './default-editor';

@Component({
  selector: 'select-editor',
  template: `
    <select
      [ngClass]="inputClass"
      class="form-control"
      [(ngModel)]="cell.newValue"
      [name]="cell.getId()"
      [disabled]="!cell.isEditable()"
      (click)="onClick.emit($event)"
      (keydown.enter)="onEdited.emit($event)"
      (keydown.esc)="onStopEditing.emit()"
      (change)="onChange($event)"
    >
      <option
        *ngFor="let option of cell.getColumn().getConfig()?.list"
        [value]="option.value"
        [selected]="option.value === cell.getValue()"
      >
        {{ option.title }}
      </option>
    </select>
  `,
})
export class SelectEditorComponent extends DefaultEditor {
  constructor() {
    super();
  }

  onChange(event): void {
    let fun = this.cell.getColumn().getConfig().afterSelect;
    if (fun) {
      fun(this.cell.getRow(), this.cell.newValue);
    }
  }
}
