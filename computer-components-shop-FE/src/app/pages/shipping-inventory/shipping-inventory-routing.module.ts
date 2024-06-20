import { RouterModule, Routes } from '@angular/router';
import { ShippingInventoryComponent } from './components/shipping-inventory/shipping-inventory.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ShippingInventoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingInventoryRoutingModule {}
