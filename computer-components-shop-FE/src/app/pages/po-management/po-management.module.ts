import { NgModule } from "@angular/core";
import { PoManagementComponent } from "./components/po-management/po-management.component";
import { PoManagementDetailComponent } from "./components/po-management-detail/po-management-detail.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { PToolbarModule } from "@shared/components/p-toolbar/p-toolbar.module";
import { PDialogModule } from "@shared/components/p-dialog/p-dialog.module";
import { PActionbarModule } from "@shared/components/p-actionbar/p-actionbar.module";
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from "primeng/dynamicdialog";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { EditorModule } from "primeng/editor";
import { PoManagementRoutingModule } from "./po-management-routing.module";

@NgModule({
    declarations: [PoManagementComponent, PoManagementDetailComponent],
    imports: [
        CommonModule,
        PoManagementRoutingModule,
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
        EditorModule,
    ],
    providers: [DialogService, DynamicDialogRef, DynamicDialogConfig],
})
export class PoManagementModule {}