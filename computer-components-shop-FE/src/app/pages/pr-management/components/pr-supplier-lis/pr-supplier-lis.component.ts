import { Component } from '@angular/core';
import { MenuItem, LazyLoadEvent } from 'primeng/api';
import { Supplier } from 'src/app/types/pr';
import { PrManagementService } from '../../services/pr-management.service';
import { ToastService } from '@shared/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { IContract, IVendor } from '../../models/pr-management.model';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-pr-supplier-lis',
    templateUrl: './pr-supplier-lis.component.html',
    styleUrls: ['./pr-supplier-lis.component.scss'],
})
export class PrSupplierLisComponent {
    constructor(
        // private fb: FormBuilder,
        private prManagementService: PrManagementService,
        private toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private dialogRef: DynamicDialogRef,

    ) {
        this.activatedRoute.paramMap.subscribe((params: any) => {
            console.log(params, 'params');
            this.matnr = params.params?.matnr;
            this.banfn = params.params?.banfn;
            this.bnfpo = params.params.bnfpo;
        });
    }

    steps: MenuItem[] = [];
    event?: LazyLoadEvent;
    first = 1;
    supliers: Supplier[] = [];
    checked: {
        [key: string]: boolean;
    } = {};
    selectedItems: any[] = [];
    tabs: MenuItem[] = [];
    activeTab: MenuItem = this.tabs[0];
    supplierDetails: any;
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
    ContractTemplate: any[] = [];
    contract?: Supplier;
    visible: boolean = false;
    matnr: string = '';
    banfn: string = '';
    bnfpo: string = '';
    formDialog!: FormGroup;

    ngOnInit() {
        this.getListVendor();
        this._formContract();
        this._getAndLoadContract();

        this.steps = [
            { label: 'In Progress', routerLink: '' },
            { label: 'Send PR', routerLink: '' },
            { label: 'Send Addendum', routerLink: '' },
            { label: 'Addenum confirmed', routerLink: '' },
            { label: 'Creat PO', routerLink: '' },
        ];

        this.tabs = [
            { label: 'Chat' },
            { label: 'Files' },
            { label: 'Báo giá' },
            { label: 'Contracts' },
        ];
        this.activeTab = this.tabs[0];
    }
    lazyLoad(event?: LazyLoadEvent) {
        if (event) {
            this.event = event;
        } else {
            this.first = 1;
        }
    }

    public get f1(): { [key: string]: AbstractControl } {
        return this.formDialog!.controls;
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

    onClose() {
        this.visible = false;
    }

    showDialog(name: number) {
        this.visible = true;
        this.contract = this.supliers[name];
    }

    sendMailVendorPR(banfn: string, bnfpo: string, lifnrList: any) {
        console.log(
            this.formDialog.controls['contractsTemplateId'].value,
            'aa'
        );
        this.prManagementService
            .sendMailVendorContract({
                ...this.formDialog.value,
                banfn,
                bnfpo,
                lifnrList: [lifnrList],
            })
            .subscribe((res) => {
                if (res) {
                    console.log(res);
                }
            });
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

    private getListVendor() {
        const vendor: IVendor = {
            matnr: this.matnr || '',
            banfn: this.banfn || '',
            bnfpo: this.bnfpo || '',
            pageNumber: 1,
            pageSize: 10,
        };
        console.log(vendor, "vendor");

        this.prManagementService
            .prEanDetail(this.banfn, this.bnfpo)
            .subscribe((detail) => {
                if (detail.responseData) {
                    this.supplierDetails = detail.responseData;
                }
            });
        this.prManagementService
            .getListVendor({
                ...vendor,
            })
            .subscribe((res) => {
                if (res) {
                    console.log(res, 'res');
                    // this.selectItem = res?.responseData[0]
                    this.supliers = res?.responseData?.content;
                }
            });
    }
}
