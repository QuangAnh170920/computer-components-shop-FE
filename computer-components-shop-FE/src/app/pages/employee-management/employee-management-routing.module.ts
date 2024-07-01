import { RouterModule, Routes } from "@angular/router";
import { EmployeeManagementComponent } from "./components/employee-management/employee-management.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: EmployeeManagementComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class EmployeeManagementRoutingModule { }