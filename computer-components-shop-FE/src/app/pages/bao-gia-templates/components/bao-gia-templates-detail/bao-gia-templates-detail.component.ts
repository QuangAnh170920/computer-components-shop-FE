import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { EFormAction } from '@shared/models/form.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-bao-gia-templates-detail',
    templateUrl: './bao-gia-templates-detail.component.html',
    styleUrls: ['./bao-gia-templates-detail.component.scss'],
})
export class BaoGiaTemplatesDetailComponent {
    form?: FormGroup;
    action: EFormAction = EFormAction.VIEW;
    subscribe?: Subscription;

    constructor(
        private dialogConfig: DynamicDialogConfig,
        private fb: FormBuilder,
        private dialogRef: DynamicDialogRef
    ) {
        this.action = dialogConfig.data?.action;
    }

    ngOnInit() {
        this._formInit();
        if (this.action === EFormAction.INSERT) {
            this.form?.reset();
        }
    }

    ngOnDestroy() {
        this.subscribe?.unsubscribe();
        this.form?.reset();
    }

    private _formInit() {
        this.form = this.fb.group({});
        this.form?.reset();
    }

    public get f(): { [key: string]: AbstractControl } {
        return this.form!.controls;
    }

    close() {
        this.dialogRef.close(true);
    }

    save(e: boolean = false) {
        if (this.form?.valid) {
            if (this.form?.value.id) {
            } else {
            }
        }
        if (!e) {
            this.dialogRef.close();
        }
    }
}
