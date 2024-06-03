import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusbarComponent } from './components/statusbar/statusbar.component';



@NgModule({
  declarations: [
    StatusbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    StatusbarComponent
  ]
})
export class PStatusbarModule { }
