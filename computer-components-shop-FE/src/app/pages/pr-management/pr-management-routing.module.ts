import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrManagementComponent } from './components/pr-management/pr-management.component';
import { PrSupplierLisComponent } from './components/pr-supplier-lis/pr-supplier-lis.component';

const routes: Routes = [
    {
        path: '',
        component: PrManagementComponent,
    },
    {
        path: 'vendor/get-list-vendor',
        component: PrSupplierLisComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrManagementRoutingmodule {}
