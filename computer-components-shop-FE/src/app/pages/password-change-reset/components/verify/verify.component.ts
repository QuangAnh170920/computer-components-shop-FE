import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomVaidators } from '@shared/validators/custom.validator';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  form?: FormGroup;
  loading: boolean = false;
  

  constructor(
    public layoutService: LayoutService,
    private fb: FormBuilder,
    
    private router: Router,
  ) {}

  ngOnInit() {
    this._formInit();
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
                  Validators.maxLength(6),
                  Validators.minLength(6),
                  CustomVaidators.NoWhiteSpaceValidator(),
              ]),
          ],
        });
      }
      changePassword() {
         this.loading = true
         this.router.navigate(['/password/change-password']); 
      }
}
