import { RouterModule, Routes } from "@angular/router";
import { BaoGiaTemplatesComponent } from "./components/bao-gia-templates/bao-gia-templates.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: BaoGiaTemplatesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BaoGiaTemplatesRoutingModule {}