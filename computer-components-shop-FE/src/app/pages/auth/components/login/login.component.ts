import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AuthFacade } from '../../facades/auth.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthInfo } from '../../models/auth.model';
import { LayoutService } from '../../../../layout/service/app.layout.service';
import { SessionService } from '../../../../shared/services/session.service';
import { CustomVaidators } from '../../../../shared/validators/custom.validator';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    valCheck: string[] = ['remember'];

    password!: string;
    remember: boolean = false;
    form?: FormGroup;
    data?: IAuthInfo;
    sso: boolean = false;
    loadingLogin: boolean = false;
    loadingRegister: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private authFacade: AuthFacade,
        private router: Router,
        // private cookieService: CookieService
        private sessionService: SessionService,
        
    ) {
    }

    ngOnInit() {
        this.remember = (localStorage.getItem('remember') === 'true')
        this._formInit();
        this._loggedCheck()
        this.rememberUser()
        this.authFacade.loading.subscribe((loading) => {
            this.loadingLogin = loading;
        });

    }

    public get f(): { [key: string]: AbstractControl } {
        return this.form!.controls;
    }


   

    private _formInit() {
        this.form = this.fb.group({
            username: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            password: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(20),
                    Validators.minLength(6),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
        });
    }
    rememberUser() {
        if (localStorage.getItem('username') && localStorage.getItem('password')) {
            this.form?.patchValue({
                username: localStorage.getItem('username'),
            });
            this.password = localStorage.getItem('password') ?? ''
        }
    }

    login() {
        this.loadingLogin = true
        this.authFacade.login(this.form?.value!, this.remember);
        this.loadingLogin
    }
    regsiter(){
        this.loadingRegister = true
        this.router.navigate(['/register/form-register']);  
        this.loadingRegister = false
    }
    changePassword(){
        this.router.navigate(['/password/send-otp']);  
    }

    private _loggedCheck() {
        if (this.sessionService.checkToken()) {
            this.router.navigate(['/'])
        }
    }

    // private _loadUserProfile() {
    //     this.authFacade.authInfo$.subscribe((res: IAuthInfo) => {
    //         if (res.token) {
    //         }
    //         // this.data = res
    //         // if
    //     });
    // }

    validatePwd() { }
    // isLoggedIn() {
    //     if(localStorage.getItem('__TKNI')) {
    //         this.router.navigate(['/'])
    //     }
    //     return
    // }
}
