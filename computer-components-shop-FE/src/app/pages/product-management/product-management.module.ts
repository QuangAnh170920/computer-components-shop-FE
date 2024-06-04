import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PToolbarModule } from '../../shared/components/p-toolbar/p-toolbar.module';
import { PDialogModule } from '../../shared/components/p-dialog/p-dialog.module';
import { PActionbarModule } from '../../shared/components/p-actionbar/p-actionbar.module';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { ProductManagementDetailComponent } from './components/product-management-detail/product-management-detail.component';

@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductManagementDetailComponent,
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
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
export class ProductManagementModule {}
