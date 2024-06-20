import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {
  DynamicDialogModule,
  DialogService,
  DynamicDialogRef,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { PActionbarModule } from '../../shared/components/p-actionbar/p-actionbar.module';
import { PDialogModule } from '../../shared/components/p-dialog/p-dialog.module';
import { PToolbarModule } from '../../shared/components/p-toolbar/p-toolbar.module';
import { ShippingInventoryDetailComponent } from './components/shipping-inventory-detail/shipping-inventory-detail.component';
import { ShippingInventoryComponent } from './components/shipping-inventory/shipping-inventory.component';
import { ShippingInventoryRoutingModule } from './shipping-inventory-routing.module';

@NgModule({
  declarations: [ShippingInventoryComponent, ShippingInventoryDetailComponent],
  imports: [
    CommonModule,
    ShippingInventoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    PToolbarModule,
    PDialogModule,
    PActionbarModule,
    DynamicDialogModule,
    ToolbarModule,
    ButtonModule,
    CalendarModule,
    StepsModule,
    CardModule,
    TabMenuModule,
    ListboxModule,
    DialogModule,
    CheckboxModule,
  ],
  providers: [DialogService, DynamicDialogRef, DynamicDialogConfig],
})
export class ShippingInventoryModule {}
