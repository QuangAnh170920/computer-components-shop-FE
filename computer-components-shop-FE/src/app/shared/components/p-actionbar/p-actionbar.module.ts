import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PActionbarComponent } from './components/p-actionbar/p-actionbar.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    PActionbarComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule
  ],
  exports:[
    PActionbarComponent
  ]
})
export class PActionbarModule { }
