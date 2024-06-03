import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomVaidators } from '@shared/validators/custom.validator';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ChangePasswordFacade } from '../../facades/change-password.facade';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.scss']
})
export class SendOtpComponent {
  form?: FormGroup;
  loading: boolean = false;


  constructor(
    public layoutService: LayoutService,
    private fb: FormBuilder,
    private changePasswordFacade:ChangePasswordFacade,
    private router: Router,
  ) {}

  ngOnInit() {
    this._formInit();
    this.changePasswordFacade.loading.subscribe((loading) => {
      this.loading = loading;
  });
    }
    public get f(): { [key: string]: AbstractControl } {
      return this.form!.controls;
  }
    private _formInit() {
      this.form = this.fb.group({
        identityContent: [
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
      sendOTP() {
         this.loading = true
         this.changePasswordFacade.sendOTP(this.form?.value.identityContent)
         this.loading
      }
}
