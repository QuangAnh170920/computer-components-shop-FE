import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EFormAction } from '../../../../shared/models/form.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropListService } from '../../../../shared/services/drop-list.service';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-shipping-inventory-detail',
  templateUrl: './shipping-inventory-detail.component.html',
  styleUrls: ['./shipping-inventory-detail.component.scss']
})
export class ShippingInventoryDetailComponent {
  form?: FormGroup;
  action: EFormAction = EFormAction.VIEW;
  productList: any[] = [];
  displayProductDialog: boolean = false;
  selectedProduct: any = null;
  paymentMethodList = [
    { value: 1, label: 'Tiền mặt' },          // CASH
    { value: 2, label: 'Chuyển khoản' },     // BANK_TRANSFER
    { value: 3, label: 'Thanh toán di động' } // MOBILE_PAYMENT
  ];
  paymentStatusList = [
    { value: 1, label: 'Chờ thanh toán' },    // PENDING
    { value: 2, label: 'Đã thanh toán' },    // COMPLETED
    { value: 3, label: 'Thanh toán thất bại' }, // FAILED
    { value: 4, label: 'Đã hủy' },           // CANCELLED
    { value: 5, label: 'Đang xử lý thanh toán' }, // PROCESSING
    { value: 6, label: 'Tạm dừng' }          // ON_HOLD
  ];

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
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
      supplier: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
          CustomVaidators.NoWhiteSpaceValidator(),
        ]),
      ],
      type: [''],
      totalQuantity: [''],
      totalPrice: [''],
      employeeId: [''],
      paymentMethod: [''],
      paymentStatus: [''],
      warehouseProductDTOS: this.fb.array([]),
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

  public get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  get warehouseProductDTOS(): FormArray {
    return this.form?.get('warehouseProductDTOS') as FormArray;
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

  addProduct() {
    // this.warehouseProductDTOS.push(
    //   this.fb.group({
    //     warehouseId: [''],
    //     productId: [''],
    //     quantity: [''],
    //     price: [''],
    //   })
    // );
    this.displayProductDialog = true;
  }

  removeProduct(i: number) {
    const row = this.warehouseProductDTOS.at(i).value;
    const isEmpty = !row.feature;
    if (isEmpty) {
      this.warehouseProductDTOS.removeAt(i);
    } else {
      this.confirmationService.confirm({
        message: 'Bạn có muốn xóa thông tin này?',
        header: 'Xác nhận',
        acceptLabel: 'Xóa',
        rejectLabel: 'Hủy bỏ',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.warehouseProductDTOS.removeAt(i);
        },
        reject: () => {},
      });
    }
  }

  selectProduct() {
    if (this.selectedProduct) {
      // Thêm sản phẩm đã chọn vào danh sách
      this.warehouseProductDTOS.push(
        this.fb.group({
          warehouseId: [''],
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
