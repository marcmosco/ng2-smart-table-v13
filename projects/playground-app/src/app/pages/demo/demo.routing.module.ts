import {RouterModule, Routes} from "@angular/router";
import {DemoComponent} from "./demo.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{ path: '', component: DemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
