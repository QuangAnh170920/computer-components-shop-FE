import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { EFormAction } from '@shared/models/form.model';

import { MenuItem } from 'primeng/api';
import { IStatusBar } from '@shared/components/p-statusbar/models/statusbar.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
    IGrouppermissions,
    STATUS,
} from '../../../models/group-permissions.model';
import { PagingData } from '@shared/models/paging.model';
import { LazyLoadEvent } from 'primeng/api';
import { GroupPerFacade } from '../../../facades/group-permissons.facade';
import { PermissionFacade } from '../../../facades/permissons.facade';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CustomVaidators } from '@shared/validators/custom.validator';

@Component({
    selector: 'app-group-permissions-detail',
    templateUrl: './group-permissions-detail.component.html',
    styleUrls: ['./group-permissions-detail.component.scss'],
})
export class GroupPermissionsDetailComponent {
  subscribe?: Subscription
    constructor(
        private dialogConfig: DynamicDialogConfig,
        private fb: FormBuilder,
        private dialogRef: DynamicDialogRef,
        private _groupPerFacade: GroupPerFacade,
        private _permissonFacade: PermissionFacade
    ) {
        this.action = dialogConfig.data?.action;
    }

    dataPermissions: any[] = [];
    groupPermissions: any[] = [];

    ngOnInit() {
        this._formInit();
        this._getPermissions();
        // this.form?.reset()
        this._formTitle(this.action);
        if (this.action !== EFormAction.INSERT) {
            this._loadContractDetail();
        }
        if (this.action === EFormAction.VIEW) {
            this.form?.disable();
        } //else this._loadContractDetail();
    }

    FORM_TITLE = 'Nhóm quyền người dùng';

    // #region Properties
    title?: string = 'Chi tiết nhóm quyền người dùng';
    data?: IGrouppermissions;
    form?: FormGroup;
    action: EFormAction = EFormAction.VIEW;
    items: MenuItem[] = [];
    home?: MenuItem;
    status: IStatusBar[] = STATUS;
    params = {};
    totalRecords: number = 0;
    event?: LazyLoadEvent;

    // #endregion
    //#region Form Init & Validator
    private _formInit() {
        this.form = this.fb.group({
            id: [],
            name: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(150),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            note: ['', Validators.compose([Validators.maxLength(250)])],
            //  permission:[1,1,0,1],
            status: [true],
        });
        this.form?.reset();
        this.status[1].selected = true;
    }
    public get f(): { [key: string]: AbstractControl } {
        return this.form!.controls;
    }

    // #endregion
    // #region Private Methods
    private _loadContractDetail() {
        this._permissonFacade.grouppermissions$.subscribe((res: any) => {
            this.dataPermissions = res;
            //this.totalRecords = res.total_records
        });
        this._groupPerFacade.groupDetail$.subscribe(
            (res: IGrouppermissions) => {
                this.data = res;
                this.form?.patchValue(this.data);
                if (res.permissions.length > 0)
                    res.permissions.forEach((item) => {
                        this.groupPermissions.push(parseInt(item.id));
                    });
            }
        );
    }

    private _getPermissions() {
        this._permissonFacade.groupPermissionFilter(this.event);
    }

    private _formTitle(title?: string) {
        switch (title) {
            case EFormAction.VIEW:
                this.title = `Chi tiết ${this.FORM_TITLE}`;
                break;
            case EFormAction.EDIT:
                this.title = `Cập nhật ${this.FORM_TITLE}`;
                break;
            case EFormAction.INSERT:
                this.title = `Thêm mới ${this.FORM_TITLE}`;
                break;
            default:
        }
    }

    // #endregion

    // #region Public Methods
    save(e: boolean = false) {
        if (this.form?.valid) {
            let _group: any;
            if (this.form?.value.id != null && this.form?.value.id != undefined)
                _group = {
                    id: this.form?.value?.id,
                    name: this.form.value.name,
                    note: this.form?.value?.note,
                    status: true,
                };
            else
                _group = {
                    name: this.form.value.name,
                    note: this.form?.value?.note,
                    status: true,
                };

            let re_data: IGrouppermissions = {
                group: _group,
                permissions: this.groupPermissions,
            };

            if (this.form?.value.id) {
                this._groupPerFacade.update(this.f['id'].value, re_data);
            } else {
                this._groupPerFacade.add(re_data);
            }
            this.form.reset();
            this.groupPermissions = [];
            if (!e) {
                this.close();
            }
        }
    }

    close() {
        this.dialogRef.close(true);
        this.form?.reset();
    }

    permissionCheck(perId: number) {
        return this.groupPermissions.findIndex(
            (item) => parseInt(item) === perId
        ) !== -1
            ? true
            : false;
    }
    statusChange(e: any) {
        this.status.forEach((item, index) => {
            if (item.index === e?.index) {
                this.status[index].selected = true;
                this.f['status'].setValue(true);
            } else {
                this.status[index].selected = false;
                this.f['status'].setValue(false);
            }
        });
    }

    public perMissionChecked(id: number, event: any) {
        if (id != null) {
            if (event.target.checked) {
                this.groupPermissions.push(id);
            } else {
                this.groupPermissions = this.groupPermissions.filter(
                    (item) => item != id
                );
            }
        }
    }

    ngOnDestroy() {
      this.subscribe?.unsubscribe()
      this.form?.reset()
  }
}
