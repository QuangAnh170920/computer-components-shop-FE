import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';
import { TableModule } from 'primeng/table';
import { PToolbarModule } from '@shared/components/p-toolbar/p-toolbar.module';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    TableModule,
    PToolbarModule,
    DropdownModule
  ]
})
export class ProductModule { }
