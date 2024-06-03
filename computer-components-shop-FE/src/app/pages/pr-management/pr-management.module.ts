import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PActionbarModule } from '@shared/components/p-actionbar/p-actionbar.module';
import { PDialogModule } from '@shared/components/p-dialog/p-dialog.module';
import { PToolbarModule } from '@shared/components/p-toolbar/p-toolbar.module';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogModule,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ChatComponent } from './components/chat/chat.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { FileSubmittedComponent } from './components/file-submitted/file-submitted.component';
import { PrManagementComponent } from './components/pr-management/pr-management.component';
import { QuotationComponent } from './components/quotation/quotation.component';
import { PrManagementRoutingmodule } from './pr-management-routing.module';
import { ThreadComponent } from './components/chat/component/thread/thread.component';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { PrSupplierLisComponent } from './components/pr-supplier-lis/pr-supplier-lis.component';
@NgModule({
    declarations: [
        PrManagementComponent,
        ChatComponent,
        FileSubmittedComponent,
        QuotationComponent,
        ContractsComponent,
        ThreadComponent,
        PrSupplierLisComponent,
    ],
    imports: [
        CommonModule,
        PrManagementRoutingmodule,
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
        CheckboxModule
    ],
    providers: [DialogService, DynamicDialogRef, DynamicDialogConfig],
})
export class PrManagementModule {}
