import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EFormAction } from '../../../../shared/models/form.model';
import { IPromotion } from '../../../promotion/models/promotion.model';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SaleOrderFacade } from '../../facade/sales-order.facade';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';
import { DropListService } from '../../../../shared/services/drop-list.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { IOrdersUpdate } from '../../models/sales-order.model';

@Component({
  selector: 'app-sales-order-detail',
  templateUrl: './sales-order-detail.component.html',
  styleUrls: ['./sales-order-detail.component.scss']
})
export class SalesOrderDetailComponent {
  form?: FormGroup;
  action: EFormAction = EFormAction.VIEW;
  actionView: boolean = false; 
  dataDetail?: IOrdersUpdate;
  displayProductDialog: boolean = false;
  selectedProduct: any = null;
  productList: any[] = [];

  paymentMethodList = [
    { value: '1', label: 'Tiền mặt' },          // CASH
    { value: '2', label: 'Chuyển khoản' },     // BANK_TRANSFER
    { value: '3', label: 'Thanh toán di động' } // MOBILE_PAYMENT
  ];
  paymentStatusList = [
    { value: '1', label: 'Đơn hàng đang được xử lý' },    // PROCESSING
    { value: '2', label: 'Đơn hàng đã được gửi đi' },    // SHIPPED
    { value: '3', label: 'Đơn hàng đang chờ xử lý' }, // PENDING
    { value: '4', label: 'Đơn hàng đã được giao' },  // DELIVERED
    { value: '5', label: 'Đơn hàng đã bị hủy' }, // CANCELLED
    { value: '6', label: 'Đơn hàng đã được trả lại' }          // RETURNED
  ];

  totalQuantity: number = 0;
  totalPrice: number = 0;

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
    this.updateTotals();
    this.getProductList();
    switch (this.action) {
      case EFormAction.INSERT: {
        this.form?.get('totalQuantity')?.disable();
        this.form?.get('totalPrice')?.disable();
        this.form?.reset();
        break;
      }
      case EFormAction.VIEW: {
        this.loadDetail();
        this.form?.disable();
        break;
      }
      case EFormAction.EDIT: {
        this.loadDetail();
        this.form?.get('totalQuantity')?.disable();
        this.form?.get('totalPrice')?.disable();
        break;
      }
    }
  }

  loadDetail() {
    
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
      shippingAddress: [''],
      paymentMethod: [''],
      totalQuantity: [''],
      totalPrice: [''],
      status: [''],
      userId: [''],
      createdAt: [''],
      orderDetail: this.fb.array([]),
      description: [''],
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
    this.updateTotals();
    if (this.form?.valid) {
      if (this.form?.value.id) {
        this._saleOrderFacade.update({
          id: this.dataDetail?.id,
          code: this.f['code']?.value,
          name: this.f['name']?.value,
          shippingAddress: this.f['shippingAddress']?.value,
          paymentMethod: this.f['paymentMethod']?.value,
          totalQuantity: this.f['totalQuantity']?.value,
          totalPrice: this.f['totalPrice']?.value,
          status: this.f['status']?.value,
          userId: this.f['userId']?.value,
          createdAt: this.f['createdAt']?.value,
          orderDetail: this.f['orderDetail']?.value || [],
          description: this.f['description']?.value,
        });
      } else {
        this._saleOrderFacade.create({
          code: this.f['code']?.value,
          name: this.f['name']?.value,
          shippingAddress: this.f['shippingAddress']?.value,
          paymentMethod: this.f['paymentMethod']?.value,
          totalQuantity: this.f['totalQuantity']?.value,
          totalPrice: this.f['totalPrice']?.value,
          status: this.f['status']?.value,
          userId: this.f['userId']?.value,
          createdAt: this.f['createdAt']?.value,
          orderDetail: this.f['orderDetail']?.value || [],
          description: this.f['description']?.value,
        });
      }
      this.dialogRef.close();
    }
    if (!e) {
      this.dialogRef.close();
    }
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
      this.orderDetail.push(
        this.fb.group({
          productId: [this.selectedProduct.id],
          quantity: [1],
          price: [this.selectedProduct.price],
        })
      );
  
      this.displayProductDialog = false;
      this.selectedProduct = null;
    }
  }

  getProductName(productId: number): string {
    const product = this.productList.find((p) => p.id === productId);
    return product ? product.name : '';
  }

  actionViewDisable(): boolean {
    if (this.action === EFormAction.VIEW) {
      return this.actionView = true;
    } else {
      return this.actionView = false;
    }
  }

  updateTotals() {
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.orderDetail.controls.forEach((control) => {
      const quantity = control.get('quantity')?.value || 0;
      const price = control.get('price')?.value || 0;
      this.totalQuantity += quantity;
      this.totalPrice += quantity * price;
    });

    this.form?.patchValue({
      totalQuantity: this.totalQuantity,
      totalPrice: this.totalPrice
    });
  }
}
