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
import { HttpClient } from '@angular/common/http';
import { IProduct, IProductUpdate } from '../../models/product-management.model';

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
  imageUrl: string | undefined;
  selectedFile: File | undefined;
  dataDetail?: IProductUpdate;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private _productManagementFacadee: ProductManagementFacade,
    private _dropListService: DropListService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
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
    this.loadDetail();
  }

  loadDetail() {
    this._productManagementFacadee.productPaging$.subscribe((res: any) => {
      if (res) {
        this.dataDetail = res.responseData;

        this.form?.patchValue({
          id: this.dataDetail?.id,
          code: this.dataDetail?.code,
          name: this.dataDetail?.name,
          description: this.dataDetail?.description,
          price: this.dataDetail?.price,
          finalTotalPrice: this.dataDetail?.finalTotalPrice,
          power: this.dataDetail?.power,
          imageUrl: this.dataDetail?.imageUrl,
          categoryId: this.dataDetail?.categoryId,
          promotionId: this.dataDetail?.promotionId,
        });

        const productFeaturesArray = this.form?.get(
          'productFeatures'
        ) as FormArray;
        productFeaturesArray.clear();

        if (
          this.dataDetail?.productFeatures &&
          this.dataDetail.productFeatures.length > 0
        ) {
          this.dataDetail.productFeatures.forEach((feature: any) => {
            productFeaturesArray.push(
              this.fb.group({
                feature: [feature.feature, Validators.required],
                priority: [
                  feature.priority,
                  [Validators.required, Validators.min(1), Validators.max(10)],
                ],
              })
            );
          });
        }
      }
    });
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
      productFeatures: this.fb.array([
        this.fb.group({
          feature: ['', Validators.required],
          priority: [
            1,
            [Validators.required, Validators.min(1), Validators.max(10)],
          ],
        }),
      ]),
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

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file && this.isValidImage(file)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.selectedFile = file;
        this.form?.patchValue({ imageUrl: this.imageUrl });
      };
      reader.readAsDataURL(file);
    } else {
      this.toastService.showWarning('Please select a valid image file.');
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http
        .post(
          'http://192.168.1.16:8080/computer-components-admin-api/v1/api/admin/upload/upload',
          formData,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        )
        .subscribe({
          next: (response: any) => {
            console.log('Upload thành công!', response);
            this.toastService.showSuccess('Upload image successfully!');

            const uploadedUrl = response?.responseData?.url;
            if (uploadedUrl) {
              const imageUrl = uploadedUrl.replace(
                /^.*src\/assets\//,
                '/assets/'
              );
              this.form?.patchValue({
                imageUrl: imageUrl,
              });
              this.selectedFile = undefined;
            } else {
              this.toastService.showWarning('No URL returned from the server.');
            }
          },
          error: (error) => {
            console.error('Upload thất bại!', error);
            this.toastService.showError('Failed to upload image.');
          },
        });
    } else {
      this.toastService.showWarning('Please choose an image before uploading.');
    }
  }

  cancelImage() {
    this.imageUrl = undefined;
    this.selectedFile = undefined;
  }

  removeCurrentImage() {
    this.form?.patchValue({
      imageUrl: null,
    });
    this.imageUrl = undefined;
    this.selectedFile = undefined;
    this.toastService.showSuccess('Image removed successfully.');
  }

  isValidImage(file: File): boolean {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validImageTypes.includes(file.type);
  }
}
