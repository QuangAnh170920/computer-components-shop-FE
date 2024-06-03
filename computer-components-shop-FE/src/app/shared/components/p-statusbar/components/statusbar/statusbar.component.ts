import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStatusBar } from '../../models/statusbar.model';

@Component({
  selector: 'p-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['./statusbar.component.scss']
})
export class StatusbarComponent {
  @Input() editable:boolean = false
  @Input() status?:IStatusBar[] = []
  @Output() statusChange:EventEmitter<any> = new EventEmitter()


  changeStatus(e:any) {
    if (this.editable) { 
    this.statusChange.emit(e)
    }
  }
}
