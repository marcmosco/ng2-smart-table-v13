import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';

@Component({
  template: '',
})
export class EditCellDefault {
  @Input() cell: Cell;
  @Input() inputClass: string = '';
  @Input() isInPasting: boolean = false;
  @Input() isCustomEditing: boolean = false;
  @Output() edited = new EventEmitter<any>();

  onEdited(event: any): boolean {
    this.edited.next(event);
    return false;
  }

  onStopEditing(): boolean {
    this.cell.getRow().isInEditing = false;
    return false;
  }

  onClick(event: any) {
    event.stopPropagation();
  }
}
