import { RouterModule, Routes } from '@angular/router';
import { SalesOrderComponent } from './components/sales-order/sales-order.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: SalesOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesOrderRoutingModule {}
