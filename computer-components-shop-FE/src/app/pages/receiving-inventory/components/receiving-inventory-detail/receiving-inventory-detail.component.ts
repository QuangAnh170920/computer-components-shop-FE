import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DropListService } from '../../../../shared/services/drop-list.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EFormAction } from '../../../../shared/models/form.model';

@Component({
  selector: 'app-receiving-inventory-detail',
  templateUrl: './receiving-inventory-detail.component.html',
  styleUrls: ['./receiving-inventory-detail.component.scss']
})
export class ReceivingInventoryDetailComponent {
  form?: FormGroup;
  action: EFormAction = EFormAction.VIEW;
  productList: any[] = [];

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private _dropListService: DropListService
  ) {
    this.action = dialogConfig.data?.action;
  }

  ngOnInit() {
    this.getProductList();
    switch (this.action) {
      case EFormAction.INSERT: {
        this.form?.reset();
        break;
      }
      case EFormAction.VIEW: {
        this.form?.disable();
        break;
      }
      case EFormAction.EDIT: {
        break;
      }
    }
  }

  getProductList() {
    this._dropListService.getProductList().subscribe((res: any) => {
      if (res) {
        this.productList = res.responseData;
      }
    });
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  close() {
    this.dialogRef.close(true);
  }

  save(e: boolean = false) {
    if (this.form?.valid) {
      if (this.form?.value.id) {
        
      } else {
        
      }
      this.dialogRef.close();
    }
    if (!e) {
      this.dialogRef.close();
    }
  }
}
