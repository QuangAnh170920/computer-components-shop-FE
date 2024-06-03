import { Component, Input } from '@angular/core';

import { Quotation } from './utils/types';
import { LazyLoadEvent } from 'primeng/api';
import { PrManagementService } from '../../services/pr-management.service';
import { ToastService } from '@shared/services/toast.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'pr-quotation',
    templateUrl: './quotation.component.html',
    styleUrls: ['./quotation.component.scss'],
})
export class QuotationComponent {
    banfn:string= '';
    form!: FormGroup;
    bnfpo:string= '';
    keyword?: string = '';
    event?: LazyLoadEvent;
    first = 1;
    quotations: Quotation[] = [];
    @Input() test?: any
    constructor(
        // private fb: FormBuilder,
        private prManagementService: PrManagementService, private toastService: ToastService,
    ) {
    }
    ngOnInit() {
        this._loadTabelPurchaseRequest(this.test)
        // this.quotations = getQuotations(10);
    }
    lazyLoad(event?: LazyLoadEvent) {
        if (event) {
            this.event = event;
        } else {
            this.first = 1;
        }
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
    private _loadTabelPurchaseRequest(test:any){

        
        this.prManagementService.getQuotes( test.banfn, test.bnfpo,"").subscribe((res) => {
            if (res) {
                this.quotations = res.responseData
                // this.prManagementService.prEanDetail(res.responseData[0]?.banfn, res.responseData[0]?.bnfpo).subscribe((detail) => {
                //     if (detail.responseData) {
                //         this.selectItem = detail.responseData
                //     }
                // })
            }

        })
        console.log("ssss");
    }
}
