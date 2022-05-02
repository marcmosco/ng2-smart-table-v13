import { Component, OnInit } from '@angular/core';

import { DefaultEditor } from './default-editor';

@Component({
  selector: 'input-editor',
  styleUrls: ['./editor.component.scss'],
  template: `
    <input
      [ngClass]="inputClass"
      class="form-control"
      [(ngModel)]="
        cell.getDefaultValue() ? cell.getDefaultValue() : cell.newValue
      "
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
export class InputEditorComponent extends DefaultEditor {
  constructor() {
    super();
  }

  isDisabled() {
    if (this.isInPasting) {
      return !this.cell.isPasteble();
    } else {
      return !this.cell.isEditable();
    }
  }
}
