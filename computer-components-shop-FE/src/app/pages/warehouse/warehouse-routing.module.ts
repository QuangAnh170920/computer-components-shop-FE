import { RouterModule, Routes } from '@angular/router';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: WarehouseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
