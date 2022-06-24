import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  OnChanges,
} from '@angular/core';

import { Grid } from '../../../lib/grid';
import { DataSource } from '../../../lib/data-source/data-source';

@Component({
  selector: '[ng2-st-add-button]',
  template: `
    <a
      *ngIf="isActionAdd"
      href="#"
      class="ng2-smart-action ng2-smart-action-add-add"
      attr.data-title="{{ tooltipMessage }}"
      [innerHTML]="addNewButtonContent"
      (click)="onAdd($event, hideAddAction)"
      [ngClass]="{ disabledAnchor: hideAddAction }"
    ></a>
    <a
      *ngIf="isCleanFilters"
      href="#"
      class="ng2-smart-action ng2-smart-action-clean-filters"
      [innerHTML]="cleanFiltersButtonContent"
      (click)="onCleanFilters($event)"
    ></a>
  `,
  styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent implements AfterViewInit, OnChanges {
  @Input() hideAddAction: boolean;
  @Input() grid: Grid;
  @Input() source: DataSource;
  @Output() create = new EventEmitter<any>();
  @Output() cleanFilters = new EventEmitter<any>();

  isActionAdd: boolean;
  isCleanFilters: boolean;
  addNewButtonContent: string;
  cleanFiltersButtonContent: string;
  tooltipMessage: string;

  constructor(private ref: ElementRef) {}

  ngAfterViewInit() {
    this.ref.nativeElement.classList.add(
      'ng2-smart-actions-title',
      'ng2-smart-actions-title-add'
    );
  }

  ngOnChanges() {
    this.isActionAdd = this.grid.getSetting('actions.add');
    this.isCleanFilters = this.grid.getSetting('actions.cleanFilters');
    this.addNewButtonContent = this.grid.getSetting('add.addButtonContent');
    this.tooltipMessage = this.grid.getSetting('add.tooltipMessage');
    this.cleanFiltersButtonContent = this.grid.getSetting(
      'cleanFilters.cleanFiltersButtonContent'
    );
  }

  onAdd(event: any, hideAddAction: boolean) {
    event.preventDefault();
    event.stopPropagation();
    if (!hideAddAction) {
      if (this.grid.getSetting('mode') === 'external') {
        this.create.emit({
          source: this.source,
        });
      } else {
        this.grid.createFormShown = true;
      }
    }
  }

  onCleanFilters(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.cleanFilters.emit();
  }
}
