import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EToolBarAction } from '../models/toolbar.model';

@Component({
  selector: 's-toolbar',
  templateUrl: './p-toolbar.component.html',
  styleUrls: ['./p-toolbar.component.scss']
})
export class PToolbarComponent {
  @Input() add:boolean = true
  @Input() sync:boolean = false
  @Input() count:number = 0
  @Input() keyword?:string
  @Input() placeHolder?:string = 'Từ khóa tìm kiếm'
  @Output() onClick:EventEmitter<EToolBarAction> = new EventEmitter()
  @Output() onSearch:EventEmitter<string> = new EventEmitter()
  items: MenuItem[] = [];

  ngOnInit() {

  }

  click(e:string) {
    this.onClick.emit(e as EToolBarAction)
 }



  search() {
    this.onSearch.emit(this.keyword)
  }



}
