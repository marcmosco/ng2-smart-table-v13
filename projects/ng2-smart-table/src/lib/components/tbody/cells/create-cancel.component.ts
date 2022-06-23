import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  Output,
} from '@angular/core';

import { Grid } from '../../../lib/grid';
import { Row } from '../../../lib/data-set/row';

@Component({
  selector: 'ng2-st-tbody-create-cancel',
  template: `
    <a
      href="#"
      class="ng2-smart-action ng2-smart-action-edit-save"
      [innerHTML]="saveButtonContent"
      (click)="
        this.customEditingActionName
          ? onSaveCustomAction($event)
          : onSave($event)
      "
    ></a>
    <a
      href="#"
      class="ng2-smart-action ng2-smart-action-edit-cancel"
      [innerHTML]="cancelButtonContent"
      (click)="onCancelEdit($event)"
    ></a>
  `,
})
export class TbodyCreateCancelComponent implements OnChanges {
  @Input() grid: Grid;
  @Input() row: Row;
  @Input() customEditingActionName: string;
  @Input() editConfirm: EventEmitter<any>;
  @Input() customEditConfirm: EventEmitter<any>;
  @Output() undoEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() cleanCustomAction: EventEmitter<any> = new EventEmitter<any>();

  cancelButtonContent: string;
  saveButtonContent: string;

  onSave(event: any) {
    event.preventDefault();
    event.stopPropagation();

    this.grid.save(this.row, this.editConfirm);
  }

  onSaveCustomAction(event) {
    event.preventDefault();
    event.stopPropagation();

    this.cleanCustomAction.emit(true);

    this.grid.save(
      this.row,
      this.customEditConfirm,
      this.customEditingActionName
    );
  }

  onCancelEdit(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.row.reset();
    this.row.isInEditing = false;
    this.undoEvent.emit();
  }

  ngOnChanges() {
    this.saveButtonContent = this.grid.getSetting('edit.saveButtonContent');
    this.cancelButtonContent = this.grid.getSetting('edit.cancelButtonContent');
  }
}
