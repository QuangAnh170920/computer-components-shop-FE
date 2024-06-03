import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractAddendumTemplatesComponent } from "./components/contract-addendum-templates/contract-addendum-templates.component";

const routes: Routes = [
    {
        path: '',
        component: ContractAddendumTemplatesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContractAddendumTemplatesRoutingModule {}