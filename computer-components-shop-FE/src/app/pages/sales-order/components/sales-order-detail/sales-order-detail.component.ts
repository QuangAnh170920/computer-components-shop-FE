import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EFormAction } from '../../../../shared/models/form.model';
import { IPromotion } from '../../../promotion/models/promotion.model';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SaleOrderFacade } from '../../facade/sales-order.facade';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';
import { NewResponseData } from '../../../../shared/models/paging.model';
import { ISaleOrder } from '../../models/sales-order.model';
import { DropListService } from '../../../../shared/services/drop-list.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.component.html',
  styleUrls: ['./sales-order-detail.component.scss']
})
export class SalesOrderDetailComponent {
  form?: FormGroup;
  action: EFormAction = EFormAction.VIEW;
  dataDetail?: IPromotion;
  displayProductDialog: boolean = false;
  selectedProduct: any = null;
  productList: any[] = [];

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private _saleOrderFacade: SaleOrderFacade,
    private dialogService: DialogService,
    private _dropListService: DropListService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) {
    this.action = dialogConfig.data?.action;
  }

  ngOnInit() {
    this._formInit();
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

  public get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  get orderDetail(): FormArray {
    return this.form?.get('orderDetail') as FormArray;
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
      shippingAddress: [''],
      paymentMethod: [''],
      paymentStatus: [''],
      totalQuantity: [''],
      totalPrice: [''],
      orderDetail: this.fb.array([]),
    });
    this.form?.reset();
  }

  getProductList() {
    this._dropListService.getProductList().subscribe((res: any) => {
      if (res) {
        this.productList = res.responseData;
      }
    });
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

  addProduct() {
    this.displayProductDialog = true;
  }

  removeProduct(i: number) {
    const row = this.orderDetail.at(i).value;
    const isEmpty = !row.feature;
    if (isEmpty) {
      this.orderDetail.removeAt(i);
    } else {
      this.confirmationService.confirm({
        message: 'Bạn có muốn xóa thông tin này?',
        header: 'Xác nhận',
        acceptLabel: 'Xóa',
        rejectLabel: 'Hủy bỏ',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.orderDetail.removeAt(i);
        },
        reject: () => {},
      });
    }
  }

  selectProduct() {
    if (this.selectedProduct) {
      // Thêm sản phẩm đã chọn vào danh sách
      this.orderDetail.push(
        this.fb.group({
          productId: [this.selectedProduct.id],
          quantity: [1], // Đặt số lượng mặc định là 1
          price: [this.selectedProduct.price], // Điền giá sản phẩm
        })
      );
  
      // Đóng popup và reset biến
      this.displayProductDialog = false;
      this.selectedProduct = null;
    }
  }

  getProductName(productId: number): string {
    const product = this.productList.find((p) => p.id === productId);
    return product ? product.name : '';
  }
}
