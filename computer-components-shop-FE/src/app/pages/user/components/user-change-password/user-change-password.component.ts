import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacade } from '../../facades/user.facade';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent {
  form?: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userFacade: UserFacade,
  ) {}

  ngOnInit() {
    this._formInit();
    this.userFacade.loadingPass.subscribe((loadingPass) => {
      this.loading = loadingPass;
    })
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  private _formInit() {
    this.form = this.fb.group({
      currentPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(6),
          CustomVaidators.NoWhiteSpaceValidator(),
        ]),
      ],
      newPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(6),
          CustomVaidators.NoWhiteSpaceValidator(),
        ]),
      ],
      confirmNewPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(6),
          CustomVaidators.NoWhiteSpaceValidator(),
        ]),
      ],
    });
  }

  confirmPassword() {
    this.userFacade.changePassword(this.form?.value!);
  }
}
