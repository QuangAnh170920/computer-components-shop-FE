import { ResponseData } from './../../../../shared/models/paging.model';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductManagementFacade } from '../../facades/product-management.facade';
import { EFormAction } from '../../../../shared/models/form.model';
import { DropListService } from '../../../../shared/services/drop-list.service';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-product-management-detail',
  templateUrl: './product-management-detail.component.html',
  styleUrls: ['./product-management-detail.component.scss'],
})
export class ProductManagementDetailComponent {
  form?: FormGroup;
  action: EFormAction = EFormAction.VIEW;
  promotionList: any[] = [];
  categoriesList: any[] = [];
  discountPercentage: any;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private _productManagementFacadee: ProductManagementFacade,
    private _dropListService: DropListService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
  ) {
    this.action = dialogConfig.data?.action;
  }

  ngOnInit() {
    this._formInit();
    this.getPromotionList();
    this.getCategoriesList();

    this.form
      ?.get('price')
      ?.valueChanges.subscribe(() => this.updateFinalTotalPrice());
    this.form
      ?.get('promotionId')
      ?.valueChanges.subscribe((promotionId) =>
        this.onPromotionChange(promotionId)
      );

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

  

  getPromotionList() {
    this._dropListService.getPromotionList().subscribe((res: any) => {
      if (res) {
        this.promotionList = res.responseData;
        this.discountPercentage = res.ResponseData.discountPercentage;
      }
    });
  }

  getCategoriesList() {
    this._dropListService.getCategoriesList().subscribe((res: any) => {
      if (res) {
        this.categoriesList = res.responseData;
      }
    });
  }

  onPromotionChange(promotionId: any) {
    const selectedPromotion = this.promotionList.find(
      (p) => p.id === promotionId
    );
    this.discountPercentage = selectedPromotion
      ? selectedPromotion.discountPercentage
      : 0;
    this.updateFinalTotalPrice();
  }

  updateFinalTotalPrice() {
    const price = this.form?.get('price')?.value || 0;
    const finalPrice = price - (price * this.discountPercentage) / 100;
    this.form
      ?.get('finalTotalPrice')
      ?.setValue(finalPrice, { emitEvent: false });
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  get productFeatures(): FormArray {
    return this.form?.get('productFeatures') as FormArray;
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
      price: [''],
      finalTotalPrice: [''],
      power: [''],
      imageUrl: [''],
      categoryId: [''],
      promotionId: [''],
      productFeatures: this.fb.array([]),
    });
    this.form?.reset();
  }

  close() {
    this.dialogRef.close(true);
  }

  save(e: boolean = false) {
    console.log('this.f', this.f);
    if (this.form?.valid) {
      if (this.form?.value.id) {
        this._productManagementFacadee.update(this.form?.value);
      } else {
        this._productManagementFacadee.create({
          code: this.f['code']?.value,
          name: this.f['name']?.value,
          description: this.f['description']?.value,
          price: this.f['price']?.value,
          finalTotalPrice: this.f['finalTotalPrice']?.value,
          power: this.f['power']?.value,
          imageUrl: this.f['imageUrl']?.value,
          categoryId: this.f['categoryId']?.value,
          promotionId: this.f['promotionId']?.value,
          productFeatures: this.f['productFeatures']?.value || [],
        });
      }
      this.dialogRef.close();
    }
    if (!e) {
      this.dialogRef.close();
    }
  }

  addFeature() {
    if (this.productFeatures.length < 10) {
      this.productFeatures.push(
        this.fb.group({
          feature: [''],
          priority: [''],
        })
      );
    } else {
      this.toastService.showWarning('Chỉ được thêm tối đa 10 tính năng!');
    }
  }

  removeFeature(i: number) {
    const row = this.productFeatures.at(i).value;
    const isEmpty = !row.feature;
    if (isEmpty) {
      this.productFeatures.removeAt(i);
  } else {
      this.confirmationService.confirm({
          message: 'Bạn có muốn xóa thông tin này?',
          header: 'Xác nhận',
          acceptLabel: 'Xóa',
          rejectLabel: 'Hủy bỏ',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.productFeatures.removeAt(i);
          },
          reject: () => {},
      });
  }
  }
}
