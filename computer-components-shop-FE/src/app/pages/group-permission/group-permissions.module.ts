import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { EditorModule } from 'primeng/editor';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GrouppermissionsRoutingModule } from './group-permissions-routing.module';
import { GroupPermissionsDetailComponent } from './compoments/group/group-permissons-detail/group-permissions-detail.component';
import { GrouppermissionsListComponent } from './compoments/group/group-permissions-list/group-permissions-list.component';
import { PermissionsComponent } from './compoments/permissons/permissions.component';
import { PToolbarModule } from '../../shared/components/p-toolbar/p-toolbar.module';
import { PActionbarModule } from '../../shared/components/p-actionbar/p-actionbar.module';
import { PDialogModule } from '../../shared/components/p-dialog/p-dialog.module';
import { PStatusbarModule } from '../../shared/components/p-statusbar/p-statusbar.module';
import { PDialogService } from '../../shared/components/p-dialog/services/m-dialog.service';


@NgModule({
  declarations: [
   GroupPermissionsDetailComponent,
   GrouppermissionsListComponent,
   PermissionsComponent

  ],
  imports: [
    CommonModule,
    GrouppermissionsRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    PToolbarModule,
    TableModule,
    PActionbarModule,
    CheckboxModule,
    InputTextareaModule, 
    DropdownModule,
    PDialogModule,
    ButtonModule,
    BreadcrumbModule,
    PStatusbarModule, 
    EditorModule,
    InputNumberModule, 
    DynamicDialogModule
  ],
  providers:[
    PDialogService,
    DialogService,
    // MDialogRef
    DynamicDialogRef
  ]
})
export class GrouppermissionsModule { }
