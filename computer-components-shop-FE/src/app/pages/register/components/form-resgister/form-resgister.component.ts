import { NgxOtpInputConfig } from 'ngx-otp-input';

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IRegister } from '../../models/register.model';
import { RegisterFacade } from '../../facades/register.facades';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../layout/service/app.layout.service';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';


@Component({
    selector: 'app-form-resgister',
    templateUrl: './form-resgister.component.html',
    styleUrls: ['./form-resgister.component.scss'],
})
export class FormResgisterComponent {
    form?: FormGroup;
    formDialog?: FormGroup;
    data?: IRegister;
    visible: boolean = false;
    loading: boolean = false;
    loadingVerify: boolean = false;
    emailValue?: string;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private registerFacades: RegisterFacade,
        private router: Router
    ) {
    }
    ngOnInit() {
        this._formInit();
        this._formOTP();
        this.registerFacades.visible.subscribe((visible) => {
            this.visible = visible;
        });
        this.registerFacades.loading.subscribe((loading) => {
            this.loading = loading;
        });
        this.registerFacades.loadingVerify.subscribe((loadingVerify) => {
            this.loadingVerify = loadingVerify;
        });
    }
    public get f(): { [key: string]: AbstractControl } {
        return this.form!.controls;
    }
    public get f1(): { [key: string]: AbstractControl } {
        return this.formDialog!.controls;
    }

   

    private _formInit() {
        this.form = this.fb.group({
            fullName: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            email: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(6),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            mobile: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(10),
                    Validators.minLength(10),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            password: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(6),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            passwordConfirm: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(6),
                    CustomVaidators.NoWhiteSpaceValidator(),
                    CustomVaidators.CheckPassWord(),
                ]),
            ],
        });
    }

    private _formOTP() {
        this.formDialog = this.fb.group({
            otp: ['', Validators.compose([
                Validators.required,
                CustomVaidators.NoWhiteSpaceValidator(),
            ]),]
        });
    }

    cancelRegister() {
        this.router.navigate(['/auth']);
    }
    showDialog() {
        this.loading = true
        this.emailValue = this.form?.value.email
        this.registerFacades.register(this.form?.value!);
        this.visible;
        this.loading
    }

    verify() {
        this.loadingVerify = true
        this.registerFacades.verify(this.form?.value.email, this.formDialog?.value.otp);   
        this.formDialog?.reset()
        this.loadingVerify     
    }

    otpInputConfig: NgxOtpInputConfig = {
        otpLength: 6,
        autofocus: true,
        classList: {
          inputBox: 'my-super-box-class',
          input: 'my-super-class',
          inputFilled: 'my-super-filled-class',
          inputDisabled: 'my-super-disable-class',
          inputSuccess: 'my-super-success-class',
          inputError: 'my-super-error-class',
        },
      };
    
      handeOtpChange(value: string[]): void {
        this.formDialog?.controls['otp'].setValue("");
      }
      
      handleFillEvent(value: string): void {
        this.formDialog?.controls['otp'].setValue(value);
      }
}
