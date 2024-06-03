import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrouppermissionsListComponent } from './compoments/group/group-permissions-list/group-permissions-list.component';
import { PermissionsComponent } from './compoments/permissons/permissions.component';



const routes: Routes = [
  {
  path:'group-permission',
  component: GrouppermissionsListComponent
},
{
  path:'permission',
  component: PermissionsComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrouppermissionsRoutingModule { }
