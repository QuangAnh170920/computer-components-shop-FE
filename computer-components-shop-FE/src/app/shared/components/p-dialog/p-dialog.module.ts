import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { InsertionDirective } from './directive/insertion.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { ButtonModule } from 'primeng/button';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { DialogFooterComponent } from './components/dialog-footer/dialog-footer.component';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
    DialogComponent,
    InsertionDirective,
    DialogHeaderComponent,
    DialogContentComponent,
    DialogFooterComponent,
  ],
  imports: [
    CommonModule, 
    SidebarModule, 
    ButtonModule, 
    DialogModule],
  exports: [
    DialogHeaderComponent,
    DialogContentComponent,
    DialogFooterComponent
  ],
})
export class PDialogModule { }
