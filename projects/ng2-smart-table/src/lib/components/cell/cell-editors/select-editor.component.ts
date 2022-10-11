import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from './default-editor';

@Component({
  selector: 'select-editor',
  template: `
    <select
      [ngClass]="inputClass"
      class="form-control"
      [(ngModel)]="cell.newValue"
      [name]="cell.getId()"
      [disabled]="checkIsDisabled()"
      (click)="onClick.emit($event)"
      (keydown.enter)="onEdited.emit($event)"
      (keydown.esc)="onStopEditing.emit()"
      (change)="onChange($event)"
      [size]="
        cell.getColumn().getConfig().size
          ? cell.getColumn().getConfig().size
          : 5
      "
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
export class SelectEditorComponent extends DefaultEditor implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
    if (!this.cell.newValue && this.cell.getDefaultValue() !== '') {
      this.cell.newValue = this.cell.getDefaultValue();
    }
  }
  onChange(event): void {
    let fun = this.cell.getColumn().getConfig().afterSelect;
    if (fun) {
      fun(this.cell.getRow(), this.cell.newValue);
    }
  }

  checkIsDisabled() {
    if (!this.isCustomEditing) {
      return !this.cell.isEditable();
    } else {
      return !this.cell.isCustomEditable();
    }
  }
}
