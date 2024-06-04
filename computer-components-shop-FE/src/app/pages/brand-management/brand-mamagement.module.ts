import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandManagementRoutingModule } from './brand-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
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
import { BrandManagementComponent } from './components/brand-management/brand-management.component';
import { BrandManagementDetailComponent } from './components/brand-management-detail/brand-management-detail.component';



@NgModule({
  declarations: [
    BrandManagementComponent,
    BrandManagementDetailComponent,
  ],
  imports: [
    CommonModule,
    BrandManagementRoutingModule,
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
export class BrandMamagementModule { }
