import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropListService } from '../../../../shared/services/drop-list.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EFormAction } from '../../../../shared/models/form.model';
import { ToastService } from '../../../../shared/services/toast.service';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';
import { ReceivingInventoryFacade } from '../../facade/receiving-inventory.facade';
import { IReceivingInventory, IReceivingInventoryUpdate } from '../../models/receiving-inventory.model';

@Component({
  selector: 'app-receiving-inventory-detail',
  templateUrl: './receiving-inventory-detail.component.html',
  styleUrls: ['./receiving-inventory-detail.component.scss'],
})
export class ReceivingInventoryDetailComponent {
  form?: FormGroup;
  action: EFormAction = EFormAction.VIEW;
  actionView: boolean = false; 
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

  totalQuantity: number = 0;
  totalPrice: number = 0;
  dataDetail?: IReceivingInventoryUpdate;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private _dropListService: DropListService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private _receivingInventoryFacade: ReceivingInventoryFacade,
  ) {
    this.action = dialogConfig.data?.action;
  }

  ngOnInit() {
    this._formInit();
    this.getProductList();
    switch (this.action) {
      case EFormAction.INSERT: {
        this.form?.get('totalQuantity')?.disable();
        this.form?.get('totalPrice')?.disable();
        this.form?.reset();
        break;
      }
      case EFormAction.VIEW: {
        this.form?.disable();
        break;
      }
      case EFormAction.EDIT: {
        this.form?.get('totalQuantity')?.disable();
        this.form?.get('totalPrice')?.disable();
        break;
      }
    }
    this.loadDetail();
  }

  loadDetail() {
    this._receivingInventoryFacade.receivingInventoryPaging$.subscribe((res: any) => {
      if (res) {
        this.dataDetail = res.responseData;
        const transactionDate = this.dataDetail?.transactionDate
        ? new Date(this.dataDetail.transactionDate)
        : null;

        this.form?.patchValue({
          id: this.dataDetail?.id,
          code: this.dataDetail?.code,
          name: this.dataDetail?.name,
          supplier: this.dataDetail?.supplier,
          type: this.dataDetail?.type,
          totalQuantity: this.dataDetail?.totalQuantity,
          totalPrice: this.dataDetail?.totalPrice,
          paymentMethod: this.dataDetail?.paymentMethod,
          paymentStatus: this.dataDetail?.paymentStatus,
          description: this.dataDetail?.description,
          transactionDate: transactionDate,
        });

        const warehouseProductArray = this.form?.get(
          'warehouseProductDTOS'
        ) as FormArray;
        warehouseProductArray.clear();

        if (
          this.dataDetail?.warehouseProductDTOS &&
          this.dataDetail.warehouseProductDTOS.length > 0
        ) {
          this.dataDetail.warehouseProductDTOS.forEach((warehouseProduct: any) => {
            warehouseProductArray.push(
              this.fb.group({
                productId: [warehouseProduct.productId, Validators.required],
                quantity: [
                  warehouseProduct.quantity,
                  [Validators.required],
                ],
                price: [
                  warehouseProduct.price,
                  [Validators.required],
                ],
              })
            );
          });
        }
      }
    });
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
      description: [''],
      transactionDate: [''],
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
        this._receivingInventoryFacade.update(this.form?.value);
      } else {
        this._receivingInventoryFacade.create({
          code: this.f['code']?.value,
          name: this.f['name']?.value,
          supplier: this.f['supplier']?.value,
          type: '1',
          totalQuantity: this.f['totalQuantity']?.value,
          totalPrice: this.f['totalPrice']?.value,
          employeeId: this.f['employeeId']?.value,
          paymentMethod: this.f['paymentMethod']?.value,
          paymentStatus: this.f['paymentStatus']?.value,
          warehouseProductDTOS: this.f['warehouseProductDTOS']?.value || [],
          description: this.f['description']?.value,
          transactionDate: this.f['transactionDate']?.value,
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

  updateTotals() {
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.warehouseProductDTOS.controls.forEach((control) => {
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

  actionViewDisable(): boolean {
    if (this.action === EFormAction.VIEW) {
      return this.actionView = true;
    } else {
      return this.actionView = false;
    }
  }
}
