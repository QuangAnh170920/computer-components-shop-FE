import { NgModule } from "@angular/core";
import { BaoGiaTemplatesComponent } from "./components/bao-gia-templates/bao-gia-templates.component";
import { BaoGiaTemplatesDetailComponent } from "./components/bao-gia-templates-detail/bao-gia-templates-detail.component";
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
import { BaoGiaTemplatesRoutingModule } from "./bao-gia-templates-routing.module";
import { DialogModule } from "primeng/dialog";

@NgModule({
    declarations: [BaoGiaTemplatesComponent, BaoGiaTemplatesDetailComponent],
    imports: [
        CommonModule,
        BaoGiaTemplatesRoutingModule,
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
        DialogModule,
    ],
    providers: [DialogService, DynamicDialogRef, DynamicDialogConfig],
})
export class BaoGiaTemplatesModule {}