import { Component } from '@angular/core';
import { UserFacade } from '../../facades/user.facade';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
    constructor(
        private userFacade: UserFacade,
        private router: Router,
        private fb: FormBuilder
    ) {}

    data?: any;
    loading: boolean = false;
    genderUser = [
        { label: 'Nam', value: 1 },
        { label: 'Nữ', value: 2 },
        { label: 'Khác', value: 3 },
    ];
    gender: any;
    form?: FormGroup;
    visible: boolean = false;
    position: string = 'center';
    dateOfBirth: any;

    ngOnInit() {
        this._getUserInfo();
        this._loadUserInfo();
        this._formInit();
   
    }

    public get f(): { [key: string]: AbstractControl } {
        return this.form!.controls;
    }

    private _formInit() {
        this.form = this.fb.group({
            id: [''],
            fullName: [''],
            dateOfBirth: [''],
            gender: [''],
        });
        this.form?.reset();
    }

    private _getUserInfo() {
        this.userFacade.userInfo();
    }

    private _loadUserInfo() {
        this.userFacade.userInfo$.subscribe((res) => {
            if (res?.responseData) {
                this.data = res?.responseData;
                this.form?.patchValue({
                    ...this.data,
                });
            }
        });
    }

    editUserProfile() {
        if (this.form?.value.id) {
            this.userFacade.editUserProfile({
                ...this.form?.value,
                dateOfBirth: (formatDate(this.form?.value.dateOfBirth,'dd-MM-yyyy','en'))
            });
            this.form?.reset();
            this.close();
        }
    }

    dialogEditUserInfo(position: string) {
        this.position = position;
        this.visible = true;
    }

    close() {
        this.visible = false;
        this.form?.reset();
    }

    getGenderText(gender: number): string {
        switch (gender) {
            case 1:
                return 'Nam';
            case 2:
                return 'Nữ';
            case 3:
                return 'Khác';
            default:
                return 'Không xác định';
        }
    }
}
