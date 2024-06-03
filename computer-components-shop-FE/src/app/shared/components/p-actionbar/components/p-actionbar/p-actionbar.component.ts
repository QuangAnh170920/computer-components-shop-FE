import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EActionBar } from '../../models/p-actionbar.model';

@Component({
  selector: 'p-actionbar',
  templateUrl: './p-actionbar.component.html',
  styleUrls: ['./p-actionbar.component.scss']
})
export class PActionbarComponent {
  @Input() actions:any[] = []
  @Output() onClick:EventEmitter<EActionBar> = new EventEmitter()
 
  actionClick(e:string) {
    this.onClick.emit(e as EActionBar)
  }


}
