import { Component, OnInit } from '@angular/core';

import { DefaultEditor } from './default-editor';

@Component({
  selector: 'input-editor',
  styleUrls: ['./editor.component.scss'],
  template: `
    <input
      [ngClass]="inputClass"
      class="form-control"
      [(ngModel)]="cell.newValue"
      [name]="cell.getId()"
      [placeholder]="cell.getTitle()"
      [disabled]="isDisabled()"
      [maxLength]="cell.getMaxLength()"
      (click)="onClick.emit($event)"
      (keydown.enter)="onEdited.emit($event)"
      (keydown.esc)="onStopEditing.emit()"
    />
  `,
})
export class InputEditorComponent extends DefaultEditor implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
    if (!this.cell.newValue && this.cell.getDefaultValue() !== '') {
      this.cell.newValue = this.cell.getDefaultValue();
    }
  }
  isDisabled() {
    if (this.isInPasting) {
      return !this.cell.isPasteble();
    } else {
      return !this.cell.isEditable();
    }
  }
}
