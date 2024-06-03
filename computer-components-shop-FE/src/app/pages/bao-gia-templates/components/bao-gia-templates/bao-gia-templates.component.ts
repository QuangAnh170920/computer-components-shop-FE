import { Component } from '@angular/core';
import { EFormAction } from '@shared/models/form.model';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaoGiaTemplatesDetailComponent } from '../bao-gia-templates-detail/bao-gia-templates-detail.component';
import { EToolBarAction } from '@shared/components/p-toolbar/models/toolbar.model';
import { BaoGiaTemplatesService } from '../../services/bao-gia-templates.service';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { IQuoteTemplates } from '../../models/bao-gia-templates.model';
import { QuoteTemplatesFacade } from '../../facades/bao-gia-templates.facade';
import { CustomVaidators } from '@shared/validators/custom.validator';

@Component({
    selector: 'app-bao-gia-templates',
    templateUrl: './bao-gia-templates.component.html',
    styleUrls: ['./bao-gia-templates.component.scss'],
})
export class BaoGiaTemplatesComponent {
    ref?: DynamicDialogRef;
    event?: LazyLoadEvent;
    first = 1;
    rows = 10;
    keyword?: string = '';
    searchTitle: string = 'Nhập từ khóa';
    selectItem: any = {
        quoteTemplateCode: null,
        quoteTemplateName: null,
        describe: null,
        contentEmail: null,
    };
    form!: FormGroup;
    totalRecords: number = 0;
    visible: boolean = false;
    data: IQuoteTemplates[] = [];
    placeHolder?: string = 'Nhập tên mẫu báo giá để tìm kiếm';
    loading: boolean = true;

    constructor(
        private dialogService: DialogService,
        private baoGiaService: BaoGiaTemplatesService,
        private fb: FormBuilder,
        private baoGiaFacade: QuoteTemplatesFacade
    ) {}

    ngOnInit() {
        this._loadQuoteList();
        this._formInit();
    }

    public get f(): { [key: string]: AbstractControl } {
        return this.form!.controls;
    }

    private _formInit() {
        this.form = this.fb.group({
            name: [''],
            quoteTemplateCode: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(250),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            quoteTemplateName: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(250),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            describe: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(250),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            contentEmail: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(250),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
        });
        this.form?.reset();
    }

    lazyLoad(event?: LazyLoadEvent) {
        if (event) {
            this.event = event;
        } else {
            this.first = 1;
        }
    }

    // private _setFormTitle(t: EFormAction) {
    //     switch (t) {
    //         case EFormAction.INSERT:
    //         case EFormAction.CLONE:
    //             return 'Thêm mới mẫu báo giá';

    //         case EFormAction.EDIT:
    //             return 'Cập nhật mẫu báo giá';
    //         case EFormAction.VIEW:
    //             return 'Chi tiết mẫu báo giá';
    //     }
    // }

    // private _loadDialog(data: any, e: EFormAction) {
    //     const _title = this._setFormTitle(e);
    //     this.ref = this.dialogService.open(BaoGiaTemplatesDetailComponent, {
    //         header: _title,
    //         footer: ' ',
    //         width: '50%',
    //         height: '80%',
    //         contentStyle: { overflow: 'auto' },
    //         baseZIndex: 10000,
    //         maximizable: true,
    //         data: data,
    //     });
    //     this.ref.onClose.subscribe((res) => {
    //         this.lazyLoad();
    //     });
    // }

    // toolbarOnClick(e: EToolBarAction) {
    //     switch (e) {
    //         case EToolBarAction.NEW:
    //             this._loadDialog(
    //                 { action: EFormAction.INSERT, item: null },
    //                 e as unknown as EFormAction
    //             );
    //             break;
    //         case EToolBarAction.CLONE:
    //             break;
    //     }
    // }

    onSearch() {
        this.baoGiaService
            .search({
                ...this.form.value,
            })
            .subscribe((res) => {
                if (res) {
                    this.selectItem = res?.responseData.data[0];
                    this.data = res?.responseData.data;
                }
            });
    }

    showDialog() {
        this.visible = true;
    }

    private _loadQuoteList() {
        this.baoGiaService.search(this.form?.value).subscribe((res) => {
            if (res) {
                this.data = res?.responseData.data;
                this.totalRecords = res?.responseData.totalElement;
            }
        });
    }

    save() {
        this.baoGiaFacade.add({
            ...this.form?.value,
        });
        this.visible = false;
    }
}
