import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrandManagementComponent } from './components/brand-management/brand-management.component';

const routes: Routes = [
  {
      path: '',
      component: BrandManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandManagementRoutingModule { }
