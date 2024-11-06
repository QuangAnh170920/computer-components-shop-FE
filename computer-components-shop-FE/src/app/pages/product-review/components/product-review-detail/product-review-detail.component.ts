import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EFormAction } from '../../../../shared/models/form.model';
import { IProductReview } from '../../models/product-review.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ProductReviewFacade } from '../../facade/product-review.facade';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';
import { NewResponseData } from '../../../../shared/models/paging.model';
import { DropListService } from '../../../../shared/services/drop-list.service';

@Component({
  selector: 'app-product-review-detail',
  templateUrl: './product-review-detail.component.html',
  styleUrls: ['./product-review-detail.component.scss'],
})
export class ProductReviewDetailComponent {
  form?: FormGroup;
  action: EFormAction = EFormAction.VIEW;
  dataDetail?: IProductReview;
  productList: any[] = [];
  productId: number | any;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private _productReviewFacade: ProductReviewFacade,
    private _dropListService: DropListService
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
        this.loadBrandDetail();
        this.form?.disable();
        break;
      }
      case EFormAction.EDIT: {
        this.loadBrandDetail();
        this.form?.get('userId')?.disable();
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

  private _formInit() {
    this.form = this.fb.group({
      id: [''],
      productId: [''],
      comment: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(250),
          CustomVaidators.NoWhiteSpaceValidator(),
        ]),
      ],
      rate: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.max(10),
        ]),
      ],
      userId: [''],
    });
    this.form?.reset();
  }

  loadBrandDetail() {
    this._productReviewFacade.reviewPaging$.subscribe(
      (res: NewResponseData<IProductReview> | null) => {
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
        this._productReviewFacade.update(this.form?.value);
      } else {
        this._productReviewFacade.create(this.form?.value);
      }
      this.dialogRef.close();
    }
    if (!e) {
      this.dialogRef.close();
    }
  }
}
