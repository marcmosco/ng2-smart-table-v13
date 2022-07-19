import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';
import { Row } from '../../../lib/data-set/row';

@Component({
  selector: 'table-cell-view-mode',
  styleUrls: ['./view-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [ngSwitch]="cell.getColumn().type">
      <custom-view-component
        *ngSwitchCase="'custom'"
        [cell]="cell"
      ></custom-view-component>
      <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue()"></div>
      <div *ngSwitchDefault>
        <span
          class="viewText"
          attr.data-title="{{
            row.getData()[cell.getColumn().tooltipDataField]
          }}"
          [ngClass]="{ tooltip: !!cell.getColumn().tooltipDataField }"
          >{{ cell.getValue() }}</span
        >
      </div>
    </div>
  `,
})
export class ViewCellComponent {
  @Input() cell: Cell;
  @Input() row: Row;
}
