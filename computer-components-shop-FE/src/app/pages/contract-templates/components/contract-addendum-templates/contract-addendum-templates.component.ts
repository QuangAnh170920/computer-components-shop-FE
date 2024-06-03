import { Component, Input } from '@angular/core';
import { EToolBarAction } from '@shared/components/p-toolbar/models/toolbar.model';
import { EFormAction } from '@shared/models/form.model';
import {
    ConfirmationService,
    LazyLoadEvent,
    MessageService,
} from 'primeng/api';
import { ContractAddendumTemplatesDetailComponent } from '../contract-addendum-templates-detail/contract-addendum-templates-detail.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContractAddendumTemplatesFacade } from '../../facades/contract-addendum-templates.facade';
import { PagingData } from '@shared/models/paging.model';
import { IContractAddendumTemplates } from '../../models/contract-addendum-templates.model';
import { ContractTemplatesService } from '../../services/contract-addendum-templates.service';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { UploadEvent } from '@shared/models/upload.model';
import { environment } from '@env';
import { EActionBar } from '@shared/components/p-actionbar/models/p-actionbar.model';
import { CustomVaidators } from '@shared/validators/custom.validator';

@Component({
    selector: 'app-contract-templates',
    templateUrl: './contract-addendum-templates.component.html',
    styleUrls: ['./contract-addendum-templates.component.scss'],
})
export class ContractAddendumTemplatesComponent {
    @Input() add: boolean = true;
    ref?: DynamicDialogRef;
    event?: LazyLoadEvent;
    first = 1;
    rows = 10;
    keyword?: string = '';
    searchTitle: string = 'Nhập từ khóa';
    data: IContractAddendumTemplates[] = [];
    form!: FormGroup;
    totalRecords: number = 0;
    selectItem: any = {
        contractTemplateCode: null,
        contractTemplateName: null,
        describe: null,
        url: null,
    };
    url: string = '';
    fileName: string = '';
    placeHolder?: string = 'Nhập tên phụ lục hợp đồng để tìm kiếm';
    visible: boolean = false;
    UPLOAD_URL = `http://210.245.85.229:8004/ariba-cdn/api/upload-file?folderName=ContractFile`;
    loading: boolean = false;
    loadingPage: boolean = false;

    constructor(
        private dialogService: DialogService,
        private contractAddendumFacade: ContractAddendumTemplatesFacade,
        private contractAddendumService: ContractTemplatesService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this._loadContractAddendumList();
        this._loadChangeId();
        this._formInit();
        this.contractAddendumFacade.loading.subscribe((loading) => {
            this.loadingPage = loading;
        });
    }

    showDialog() {
        // this.loading;
        this.visible = true;
        // this.loading = false;
    }

    public get f(): { [key: string]: AbstractControl } {
        return this.form!.controls;
    }

    // actionClick(e: any, item: IContractAddendumTemplates) {
    //     switch (e as EActionBar) {
    //         case EActionBar.EDIT:
    //             // this.newsFacade.detail(item.id);
    //             this._loadDialog(
    //                 { action: EFormAction.EDIT, item: item.id },
    //                 e as unknown as EFormAction
    //             );
    //             break;
    //         case EActionBar.DEL:
    //             this.confirmationService.confirm({
    //                 message: 'Bạn muốn xóa bỏ tin tức này?',
    //                 header: 'Xác nhận',
    //                 icon: 'pi pi-exclamation-triangle',
    //                 accept: () => {
    //                     // this.newsFacade.delete(item.id);
    //                 },
    //                 reject: () => {
    //                     this.lazyLoad();
    //                 },
    //             });

    //             break;

    //         default:
    //     }
    // }

    private _formInit() {
        this.form = this.fb.group({
            name: [''],
            contractTemplateCode: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(250),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            contractTemplateName: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(255),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            describe: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(255),
                    CustomVaidators.NoWhiteSpaceValidator(),
                ]),
            ],
            url: [''],
        });
        this.form?.reset();
    }

    lazyLoad(event?: LazyLoadEvent) {
        if (event) {
            this.event = event;
        } else {
            this.first = 1;
        }
        // this._loadContractAddendumList();
    }

    // private _setFormTitle(t: EFormAction) {
    //     switch (t) {
    //         case EFormAction.INSERT:
    //         case EFormAction.CLONE:
    //             return 'Thêm mới mẫu hợp đồng phụ lục';

    //         case EFormAction.EDIT:
    //             return 'Cập nhật mẫu hợp đồng phụ lục';
    //         case EFormAction.VIEW:
    //             return 'Chi tiết mẫu hợp đồng phụ lục';
    //     }
    // }

    // private _loadDialog(data: any, e: EFormAction) {
    //     const _title = this._setFormTitle(e);
    //     this.ref = this.dialogService.open(ContractAddendumTemplatesDetailComponent, {
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
        this.contractAddendumService
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

    private _loadContractAddendumList() {
        this.contractAddendumService
            .search(this.form?.value)
            .subscribe((res) => {
                if (res) {
                    this.data = res?.responseData.data;
                    this.totalRecords = res?.responseData.totalElement;
                }
            });
    }

    private _loadChangeId() {
        this.contractAddendumFacade.id$.subscribe((res) => {
            if (res) {
                this.lazyLoad();
            }
        });
      }

    onUpload(event: any) {
        this.url = event?.originalEvent?.body.responseData?.dataUrl;
        this.fileName = event?.originalEvent?.body.responseData?.fileName;
        if (event?.originalEvent?.body.responseData) {
            this.messageService.add({
                severity: 'info',
                summary: 'Thành công',
                detail: 'File Uploaded thành công',
            });
        }
    }

    save() {
        this.contractAddendumFacade.add({
            ...this.form?.value,
            url: this.url,
        });
        this.close();
    }

    close() {
        this.visible = false;
        this.form?.reset();
    }
}
