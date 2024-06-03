import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomVaidators } from '@shared/validators/custom.validator';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { ChangePasswordFacade } from '../../facades/change-password.facade';
import { NgxOtpInputConfig } from 'ngx-otp-input';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  form?: FormGroup;
  loading: boolean = false;
  email:string = this.dataSharingService.email;
  
  constructor(
    public layoutService: LayoutService,
    private dataSharingService: DataSharingService,
    private changePasswordFacade:ChangePasswordFacade,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this._formInit();
    this.changePasswordFacade.loadingPass.subscribe((loadingPass) => {
      this.loading = loadingPass;
  });
  }
  public get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }
  
  private _formInit() {
    this.form = this.fb.group({
      otp: [
        '',
        Validators.compose([
            Validators.required,
            CustomVaidators.NoWhiteSpaceValidator(),
        
        ]),
    ],
    email: [
      this.email,
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
      confirmPassword: [
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
  confirmPassword() {
    this.loading = true
    this.changePasswordFacade.changePassword(this.form?.value!);
    this.loading
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
        this.form?.controls['otp'].setValue("");
  }
  
  handleFillEvent(value: string): void {
        this.form?.controls['otp'].setValue(value);
  }
}
