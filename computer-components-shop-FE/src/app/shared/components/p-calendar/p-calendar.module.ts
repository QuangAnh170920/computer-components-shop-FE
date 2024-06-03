import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PCalendarComponent } from './components/p-calendar/p-calendar.component';
import { ToolbarModule } from 'primeng/toolbar';
import {CalendarModule} from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    PCalendarComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    CalendarModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    ToastModule,
    // MessageService
  ],
  exports:[
    PCalendarComponent
  ],
})
export class PCalendarModule { }
