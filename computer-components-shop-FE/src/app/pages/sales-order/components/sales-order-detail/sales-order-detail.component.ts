import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EFormAction } from '../../../../shared/models/form.model';
import { IPromotion } from '../../../promotion/models/promotion.model';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { SaleOrderFacade } from '../../facade/sales-order.facade';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';
import { NewResponseData } from '../../../../shared/models/paging.model';
import { ISaleOrder } from '../../models/sales-order.model';

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.component.html',
  styleUrls: ['./sales-order-detail.component.scss']
})
export class SalesOrderDetailComponent {
  form?: FormGroup;
  action: EFormAction = EFormAction.VIEW;
  dataDetail?: IPromotion;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private _saleOrderFacade: SaleOrderFacade,
    private dialogService: DialogService,
  ) {
    this.action = dialogConfig.data?.action;
  }

  ngOnInit() {
    this._formInit();
    switch (this.action) {
      case EFormAction.INSERT: {
        this.form?.reset();
        break;
      }
      case EFormAction.VIEW: {
        this.loadBrandDetail();
        this.form?.disable();

        break;
      }
      case EFormAction.EDIT: {
        this.loadBrandDetail();
        break;
      }
    }
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  private _formInit() {
    this.form = this.fb.group({
      id: [''],
      code: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          CustomVaidators.NoWhiteSpaceValidator(),
        ]),
      ],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          CustomVaidators.NoWhiteSpaceValidator(),
        ]),
      ],
      description: [''],
    });
    this.form?.reset();
  }

  loadBrandDetail() {
    this._saleOrderFacade.saleOrderPaging$.subscribe(
      (res: NewResponseData<ISaleOrder> | null) => {
        if (res) {
          this.dataDetail = res.responseData;
          this.form?.patchValue(this.dataDetail!);
        }
      }
    );
  }

  close() {
    this.dialogRef.close(true);
  }

  save(e: boolean = false) {
    if (this.form?.valid) {
      if (this.form?.value.id) {
        this._saleOrderFacade.update(this.form?.value);
      } else {
        this._saleOrderFacade.create(this.form?.value);
      }
      this.dialogRef.close();
    }
    if (!e) {
      this.dialogRef.close();
    }
  }

  openPopupProduct(e: any) {

  }

  // private _loadDialog(data: any, e: EFormAction) {
  //   const _title = this._setFormTitle(e);
  //   const ref = this.dialogService.open(, {
  //     header: _title,
  //     footer: ' ',
  //     width: '50%',
  //     contentStyle: { overflow: 'auto' },
  //     baseZIndex: 10000,
  //     maximizable: true,
  //     data: data,
  //   });

  //   this.ref?.onClose.subscribe((res) => {
  //     this.lazyLoad();
  //   });
  // }
}
