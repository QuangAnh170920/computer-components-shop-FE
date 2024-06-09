import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EFormAction } from '../../../../shared/models/form.model';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';
import { BrandManagementService } from '../../services/brand-management.service';
import { IBrand } from '../../models/brand-management.model';
import { BrandManagementFacade } from '../../facade/brand-management.facade';
import { NewResponseData } from '../../../../shared/models/paging.model';

@Component({
  selector: 'app-brand-management-detail',
  templateUrl: './brand-management-detail.component.html',
  styleUrls: ['./brand-management-detail.component.scss'],
})
export class BrandManagementDetailComponent {
  form?: FormGroup;
  action: EFormAction = EFormAction.VIEW;
  dataDetail?: IBrand;

  constructor(
    private dialogConfig: DynamicDialogConfig,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private _brandFacade: BrandManagementFacade
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
    this._brandFacade.brandPaging$.subscribe((res:  NewResponseData<IBrand> | null) => {
      if (res) {
        this.dataDetail = res.responseData;
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
        this._brandFacade.update(this.form?.value);
      } else {
        this._brandFacade.create(this.form?.value);
      }
      this.dialogRef.close();
    }
    if (!e) {
      this.dialogRef.close();
    }
  }


}
