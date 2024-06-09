import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EFormAction } from '../../../../shared/models/form.model';
import { ICategories } from '../../models/categories-management.model';
import { CategoriesManagementFacade } from '../../facades/categories-management.facade';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';

@Component({
  selector: 'app-categories-management-detail',
  templateUrl: './categories-management-detail.component.html',
  styleUrls: ['./categories-management-detail.component.scss']
})
export class CategoriesManagementDetailComponent {
  form?: FormGroup;
  action: EFormAction = EFormAction.VIEW;
  dataDetail?: ICategories;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private _categoriesFacade: CategoriesManagementFacade
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
        this.loadDetail();
        this.form?.disable();
        
        break;
      }
      case EFormAction.EDIT: {
        this.loadDetail();
        break;
      }
    }
    this.loadDetail();
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

  loadDetail() {
    this._categoriesFacade.categoryPaging$.subscribe((res: any) => {
      if (res) {
        this.dataDetail = res.responseData;
        console.log(this.dataDetail, '1111111111111111');
        this.form?.patchValue(this.dataDetail!);
      }
    })
  }

  close() {
    this.dialogRef.close(true);
  }

  save(e: boolean = false) {
    if (this.form?.valid) {
      if (this.form?.value.id) {
        this._categoriesFacade.update(this.form?.value);
      } else {
        this._categoriesFacade.create(this.form?.value);
      }
      this.dialogRef.close();
    }
    if (!e) {
      this.dialogRef.close();
    }
  }
}
