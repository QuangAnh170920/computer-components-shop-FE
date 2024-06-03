import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PToolbarComponent} from './components/p-toolbar.component'
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    PToolbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    SplitterModule,
    InputTextModule
  ],
  exports:[
    PToolbarComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PToolbarModule { }
