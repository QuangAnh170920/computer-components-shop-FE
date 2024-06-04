import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductSpecificationsComponent } from './components/product-specifications/product-specifications.component';

const routes: Routes = [
  {
      path: '',
      component: ProductSpecificationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSpecificationsRoutingModule { }
