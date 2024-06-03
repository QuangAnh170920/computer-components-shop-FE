import { Injectable } from '@angular/core';
import { ContractTemplatesService } from '../services/contract-addendum-templates.service';
import { ToastService } from '@shared/services/toast.service';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { convertFilter } from '@shared/utils/filter-params.util';
import { IContractAddendumTemplates, IFilterContractAddendumTemplates, IPayload, IResponse } from '../models/contract-addendum-templates.model';
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, filter } from 'rxjs';
import { PagingData } from '@shared/models/paging.model';

@Injectable({
    providedIn: 'root',
})
export class ContractAddendumTemplatesFacade {
    private _id = new BehaviorSubject<any| null> (null)
    private loadingSubject = new Subject<boolean>();
    loading = this.loadingSubject.asObservable();
    private _contractAddendums = new BehaviorSubject<PagingData<IContractAddendumTemplates> | null>(null);
    constructor(
        private contractAddendumService: ContractTemplatesService,
        private toastService: ToastService, 
        private router:Router
    ) {}

    get id$():Observable<any> {
        return this._id.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    }

    get contractAddendumPaging$(): Observable<IResponse> {
        return this._contractAddendums.asObservable().pipe(
            filter((res: any) => res),
            distinctUntilChanged()
        );
    }

    // Method
    // filter(filterEvent?: LazyLoadEvent, keyword?: string) {
    //     const filter = convertFilter(filterEvent?.filters) as IFilterContractAddendumTemplates;
    //     if (keyword) {
    //         filter['keyword'] = keyword;
    //     }
    //     return this.contractAddendumService
    //         .list(
    //             filter,
    //             filterEvent?.first ?? 0,
    //             filterEvent?.rows ?? 10
    //         )
    //         .subscribe({
    //             next:(res)=>{
    //                 this._contractAddendums.next(res);
    //             },
    //             error: (err)=>{
    //                 if (err?.status === 401) {
    //                      this.toastService.goto?.navigate(['/auth/login'])
    //                 } else {
    //                     this.toastService.showError(err?.statusText)
    //                 }
    //             }
    //         })
    // }

    add(payload: IPayload) {
        return this.contractAddendumService.add({...payload}).subscribe((res) => {
            if(res) {
                this._id.next(res);
                return this.toastService.showSuccess(
                    'Thêm mới thành công!'
                );
            }
        })
    }
}
