import { RouterModule, Routes } from '@angular/router';
import { ReceivingInventoryComponent } from './components/receiving-inventory/receiving-inventory.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ReceivingInventoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivingInventoryRoutingModule {}
