import { map } from 'rxjs';
import { Component, Pipe } from '@angular/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { PurchaseRequest, SelectOption, Supplier } from 'src/app/types/pr';
import {
    getMaterialGroups,
    getMaterials,
    getPurchaseRequests,
    getStatuses,
    getSupliers,
} from './utils/mock';
import { PrManagementService } from '../../services/pr-management.service';
import {
    IContract,
    IItemSelected,
    IMaterialGroup,
    IPlan,
    IQuote,
    IVendor,
} from '../../models/pr-management.model';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { CustomVaidators } from '@shared/validators/custom.validator';
import { EActionBar } from '@shared/components/p-actionbar/models/p-actionbar.model';
import { DatePipe } from '@angular/common';
import { ToastService } from '@shared/services/toast.service';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
    selector: 'pr-management',
    templateUrl: './pr-management.component.html',
    styleUrls: ['./pr-management.component.scss'],
})
export class PrManagementComponent {
    form!: FormGroup;
    formDialog!: FormGroup;
    formDialogPR!: FormGroup;
    rows = 10;
    totalRecords: number = 0;
    contract?: Supplier;
    event?: LazyLoadEvent;
    first = 1;
    visible: boolean = false;
    visibleResult: boolean = true;
    visiblePR: boolean = false;
    visible1: boolean = false;
    keyword?: string = '';
    placeHolder?: string = 'Từ khóa tìm kiếm';
    steps: MenuItem[] = [];
    purchaseRequests: PurchaseRequest[] = [];
    supliers: Supplier[] = [];
    materials: SelectOption<string>[] = [];
    materialGroups: SelectOption<string>[] = [];
    statuses: SelectOption<string>[] = [];
    tabs: MenuItem[] = [];
    activeTab: MenuItem = this.tabs[0];
    PlanOptions: any[] = [];
    MaterialOptions: { materialName: string }[] = [];

    MaterialGroupOptions: any[] = [];
    ContractTemplate: any[] = [];
    QuoteTemplate: any[] = [];
    checked: {
        [key: string]: boolean;
    } = {};
    selectedItems: any[] = [];
    banfn: string = '';
    bnfpo: string = '';
    lifnr: string = '';
    x: any[] = [];
    pageNumber: number = 0;
    countErbanIn: number = 0;
    countErbanNew: number = 0;
    prDetails: any;
    vendorList: any;
    selectItem: any = {
        banfn: null,
        bsart: null,
        bstyp: null,
        statu: null,
        estkz: null,
        ekgrp: null,
        txz01: null,
        matnr: null,
        name1: null,
        logbe: null,
        wgbez: null,
        menge: null,
        meins: null,
        badat: null,
        preis: null,
        status: 0,
    };

    constructor(
        private fb: FormBuilder,
        private prManagementService: PrManagementService,
        private toastService: ToastService,
        private router: Router
    ) {}
    ngOnInit() {
        this._formInit();
        this._formPR();
        this._getAndLoadOptionsPlan();
        this._getAndLoadOptionsMaterial();
        this._getAndLoadOptionsMaterialGroup();
        this._loadTabelPurchaseRequest();
        this._getAndLoadQuote();
        this.getListPR();
        this.getPrEbanCount();
        this._formContract();
        this._getAndLoadContract();
        // this.supliers = getSupliers(10);
        this.materials = getMaterials();
        this.materialGroups = getMaterialGroups();
        this.statuses = getStatuses();
        this.tabs = [
            { label: 'Chat' },
            { label: 'Files' },
            { label: 'Báo giá' },
            { label: 'Contracts' },
        ];
        this.steps = [
            { label: 'In Progress', routerLink: '' },
            { label: 'Send PR', routerLink: '' },
            { label: 'Send Addendum', routerLink: '' },
            { label: 'Addenum confirmed', routerLink: '' },
            { label: 'Creat PO', routerLink: '' },
        ];
        this.activeTab = this.tabs[0];
    }

    public get f(): { [key: string]: AbstractControl } {
        return this.form!.controls;
    }

    public get f1(): { [key: string]: AbstractControl } {
        return this.formDialog!.controls;
    }

    public get f2(): { [key: string]: AbstractControl } {
        return this.formDialogPR!.controls;
    }
    statusLabel(s: number) {
        switch (s) {
            case 0:
                return 'New';
            case 1:
                return 'In Progress';
            case 2:
                return 'Send PR';
            case 3:
                return 'Send Addendum';
            case 4:
                return 'Addenum confirmed';
            case 5:
                return 'Creat PO';
            default:
                return 'New';
        }
    }

    actionClick(e: any, item: any) {
        switch (e as EActionBar) {
            case EActionBar.VIEW:
                const vendor: IVendor = {
                    matnr: item?.matnr,
                    banfn: item?.banfn,
                    bnfpo: item?.bnfpo,
                    pageNumber: 1,
                    pageSize: 10,
                };

                this.prManagementService
                    .prEanDetail(vendor.banfn, vendor.bnfpo)
                    .subscribe((detail) => {
                        if (detail.responseData) {
                            this.prDetails = detail.responseData;
                        }
                    });
                this.prManagementService
                    .getListVendor({
                        ...vendor,
                    })
                    .subscribe((res) => {
                        if (res) {
                            console.log(res, 'list');
                            // this.selectItem = res?.responseData[0]
                            this.vendorList = res?.responseData?.content!;
                        }
                    });

                // this.router.navigate([
                //     `pr-management/vendor/get-list-vendor`,
                //     vendor,
                // ]);

                break;
            default:
        }
    }

    onClose() {
        this.visible = false;
    }

    setActionBar(s: boolean) {
        let _status = ['view', 'put'];
        return _status;
    }

    showDialogPR(name: number) {
        this.visiblePR = true;
        console.log(this.vendorList, 'vendor List');

        this.contract = this.vendorList[name];
    }
    lazyLoad(event?: LazyLoadEvent) {
        if (event) {
            this.event = event;
        } else {
            this.first = 1;
        }
        this.prManagementService
            .searchPrEan({
                pageNumber: (event?.first ?? 0) / (event?.rows ?? 10) + 1,
                pageSize: event?.rows,
            })
            .subscribe((res) => {
                if (res) {
                    this.purchaseRequests = res?.responseData?.content;
                    this.totalRecords = res?.responseData?.totalElements;
                    console.log(res);
                }
            });
    }

    sendMailVendorPR(banfn: string, bnfpo: string, lifnrList: any) {
        console.log(
            this.formDialog.controls['contractsTemplateId'].value,
            'aa'
        );
        bnfpo = '1';
        this.prManagementService
            .sendMailVendorContract({
                ...this.formDialog.value,
                banfn,
                bnfpo,
                lifnrList: [lifnrList],
            })
            .subscribe((res) => {
                if (res?.responseCode === '200') {
                    this.toastService.showSuccess(
                        'Đã gửi thành công!'
                    );
                    this.visible = false;
                } else {
                    this.toastService.showError(
                        'Gửi thất bại vui lòng kiểm tra lại!'
                    );
                    this.visible = true;
                }
            });
    }

    onSearch(e: string) {
        this.keyword = e;
        this.lazyLoad({
            ...this.event,
            filters: {
                title: {
                    value: e,
                },
            },
        });
    }

    clickReset() {
        this.form.reset();
    }

    changeValue(item: any, id: string) {
        this.checked[id] = !this.checked[id];
        if (this.checked[id]) {
            this.selectedItems.push(item);
        } else {
            this.selectedItems = this.selectedItems.filter(
                (selectedItem) => selectedItem !== item
            );
        }
    }
    onTabChange(event: MenuItem) {
        console.log(event, 'onTabChange');

        this.activeTab = event;
    }

    showDialog(name: number) {
        this.visible = true;
        this.contract = this.vendorList[name];
    }

    clickSearch() {
        if (this.form.valid) {
            this.prManagementService
                .searchPrEan({
                    ...this.form.value,
                    fromDate: new DatePipe('en-US').transform(
                        this.form.value.fromDate,
                        'yyyy-MM-dd HH:mm:ss'
                    ),
                    toDate: new DatePipe('en-US').transform(
                        this.form.value.toDate,
                        'yyyy-MM-dd HH:mm:ss'
                    ),
                })
                .subscribe((res) => {
                    if (res) {
                        // this.selectItem = res?.responseData[0];
                        this.purchaseRequests = res?.responseData?.content;
                    }
                });
        }
    }

    private _formContract() {
        this.formDialog = this.fb.group({
            contractsTemplateId: [''],
        });
    }

    private _getAndLoadContract() {
        this.prManagementService
            .getListOptionsDropDownContract()
            .subscribe((res) => {
                console.log(res, 'res');

                if (res) {
                    this.ContractTemplate = res.responseData?.map(
                        (item: IContract) => {
                            return {
                                ...item,
                                label: `${item.contractTemplateName} `,
                            };
                        }
                    );
                }
            });
    }

    private getListPR() {
        this.prManagementService
            .searchPrEan({
                ...this.form.value,
                fromDate: new DatePipe('en-US').transform(
                    this.form.value.fromDate,
                    'yyyy-MM-dd HH:mm:ss'
                ),
                toDate: new DatePipe('en-US').transform(
                    this.form.value.toDate,
                    'yyyy-MM-dd HH:mm:ss'
                ),
            })
            .subscribe((res) => {
                if (res) {
                    this.purchaseRequests = res?.responseData?.content;
                    this.totalRecords = res?.responseData?.totalElements;
                    console.log(res);
                }
            });
    }

    private getPrEbanCount() {
        this.prManagementService.getPrEbanCount().subscribe((res) => {
            this.countErbanIn = res?.responseData?.inprogress;
            this.countErbanNew = res?.responseData?.new;
        });
    }

    private _loadTabelPurchaseRequest() {
        // this.prManagementService
        //     .searchPrEan(this.form.value)
        //     .subscribe((res) => {
        //         if (res) {
        //             console.log("first", res)
        //             this.purchaseRequests = res.responseData?.content;
        //             this.prManagementService
        //                 .prEanDetail(
        //                     res.responseData[0]?.banfn,
        //                     res.responseData[0]?.bnfpo
        //                 )
        //                 .subscribe((detail) => {
        //                     if (detail.responseData) {
        //                         // this.selectItem = detail.responseData;
        //                     }
        //                 });
        //         }
        //     });
    }
    private _formInit() {
        this.form = this.fb.group({
            searchField: [''],
            matnr: [],
            matkl: [],
            werks: [],
            status: null,
            fromDate: [
                '',
                Validators.compose([
                    CustomVaidators.checkFromDate(
                        'fromDate',
                        'fromDate',
                        'toDate'
                    ),
                ]),
            ],
            toDate: [
                '',
                Validators.compose([
                    CustomVaidators.checkFromDate(
                        'toDate',
                        'fromDate',
                        'toDate'
                    ),
                ]),
            ],
        });
        this.form?.reset();
    }
    private _getAndLoadOptionsPlan() {
        this.prManagementService
            .getListOptionsDropDownPlan()
            .subscribe((res) => {
                if (res) {
                    this.PlanOptions = res.responseData?.map((item: IPlan) => {
                        return {
                            ...item,
                            label: `${item.werks} - ${
                                item.name1 ? item.name1 : item.name2
                            }`,
                        };
                    });
                }
            });
    }
    private _getAndLoadOptionsMaterial() {
        this.prManagementService
            .getListOptionsDropDownMaterial()
            .subscribe((res) => {
                if (res) {
                    this.MaterialOptions = res.responseData;
                }
            });
    }
    private _getAndLoadOptionsMaterialGroup() {
        this.prManagementService
            .getListOptionsDropDownMaterialGroup()
            .subscribe((res) => {
                if (res) {
                    this.MaterialGroupOptions = res.responseData?.map(
                        (item: IMaterialGroup) => {
                            return {
                                ...item,
                                label: `${item?.matkl} - ${item?.wgbez}`,
                            };
                        }
                    );
                }
            });
    }

    private _formPR() {
        this.formDialogPR = this.fb.group({
            prTemplateId: [''],
        });
    }

    private _getAndLoadQuote() {
        this.prManagementService
            .getListOptionsDropDownQuote()
            .subscribe((res) => {
                if (res) {
                    this.QuoteTemplate = res.responseData?.map(
                        (item: IQuote) => {
                            return {
                                ...item,
                                label: `${item.quoteTemplateName} `,
                            };
                        }
                    );
                }
            });
    }

    sendMailVendorQuote(banfn: string, bnfpo: string, lifnrList: any) {
        this.prManagementService
            .sendMailVendorPR({
                ...this.formDialogPR.value,
                banfn,
                bnfpo,
                lifnrList: [lifnrList],
            })
            .subscribe((res) => {
                if (res) {
                    if (res?.responseCode === '200') {
                        this.toastService.showSuccess(
                            'Đã gửi thành công!'
                        );
                        this.visiblePR = false;
                    } else {
                        this.toastService.showError(
                            'Gửi thất bại vui lòng kiểm tra lại!'
                        );
                        this.visiblePR = true;
                    }
                }
            });
    }

    handleCheckBox(item: any) {}
    showDialogQuoteList() {
        this.visible1 = true;
        console.log(this.selectedItems);
        this.selectedItems.map((item) => {
            this.banfn = item.banfn;
            this.bnfpo = item.bnfpo;
            this.x.push(item.lifnr);
        });
    }

    sendMailVendorQuoteList() {
        this.prManagementService
            .sendMailVendorPR({
                ...this.formDialogPR.value,
                banfn: this.banfn,
                bnfpo: this.bnfpo,
                lifnrList: this.x,
            })
            .subscribe({
                next: (res) => {
                    if (res?.responseCode === '200') {
                        this.toastService.showSuccess(
                            'Đã gửi thành công!'
                        );
                        this.visible1 = false;
                    } else {
                        this.toastService.showError(
                            'Gửi thất bại vui lòng kiểm tra lại!'
                        );
                        this.visible1 = true;
                    }
                },
                error: (err) => {
                    if (err) {
                    }
                },
            });
    }
}
