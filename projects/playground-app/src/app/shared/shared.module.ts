import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {Ng2SmartTableModule} from 'ng2-smart-table';

import {HeaderComponent} from './components/header/header.component';
import {BasicExampleDataComponent} from './components/basic-example/basic-example-data.component';
import {BasicExampleComponent} from './components/basic-example/basic-example.component';

import {HighlightCodeDirective} from './directives/highlight.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const SHARED_COMPONENTS = [
  HeaderComponent,
  BasicExampleComponent,
  BasicExampleDataComponent,
];

const SHARED_DIRECTIVES = [
  HighlightCodeDirective,
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
  ],
})
export class SharedModule { }
