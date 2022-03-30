import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { routes } from './demo.routes';

import { DemoComponent } from './demo.component';
import {DemoRoutingModule} from "./demo.routing.module";

const DEMO_COMPONENTS = [
  DemoComponent,
];

@NgModule({
  imports: [
    CommonModule,
    DemoRoutingModule,
    SharedModule,
  ],
  declarations: [
    ...DEMO_COMPONENTS,
  ],
})
export class DemoModule { }
