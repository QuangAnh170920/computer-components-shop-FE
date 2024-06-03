import { RouterModule, Routes } from "@angular/router";
import { PoManagementComponent } from "./components/po-management/po-management.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: PoManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PoManagementRoutingModule {}