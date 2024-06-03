import { NgModule } from "@angular/core";
import { ContractAddendumTemplatesDetailComponent} from "./components/contract-addendum-templates-detail/contract-addendum-templates-detail.component";
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
import { ContractAddendumTemplatesRoutingModule} from "./contract-addendum-templates-routing.module";
import { ContractAddendumTemplatesComponent } from "./components/contract-addendum-templates/contract-addendum-templates.component";
import { FileUploadModule } from "primeng/fileupload";
import { DialogModule } from "primeng/dialog";

@NgModule({
    declarations: [ContractAddendumTemplatesComponent, ContractAddendumTemplatesDetailComponent],
    imports: [
        CommonModule,
        ContractAddendumTemplatesRoutingModule,
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
        FileUploadModule,
        DialogModule,
    ],
    providers: [DialogService, DynamicDialogRef, DynamicDialogConfig],
})
export class ContractTemplatesModule {}