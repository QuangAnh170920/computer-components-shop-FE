import { Injectable } from '@angular/core';
import { PagingData } from '@shared/models/paging.model';
import { ApiService } from '@shared/services/api.service';
import { Observable } from 'rxjs';
import { IContractAddendumTemplates, IPayload, ISearch } from '../models/contract-addendum-templates.model';
import { API_ROUTER } from '@shared/constants/api.constant';
import { ISearchPayLoad } from '../../pr-management/models/pr-management.model';

@Injectable({
    providedIn: 'root',
})
export class ContractTemplatesService {
    constructor(private apiService: ApiService) {}

    // list(
    //     filter: any,
    //     pageIndex: number,
    //     pageSize: number
    // ): Observable<PagingData<IContractAddendumTemplates>> {
    //     return this.apiService.post(API_ROUTER.CONTRACT_ADDENDUM_TEMPLATE.FIND_ALL_AND_SEARCH, {
    //         ...filter,
    //         pageNumber: pageIndex + 1,
    //         pageSize: pageSize,
    //     });
    // }

    search(payload: ISearch) {
        return this.apiService.post(`${API_ROUTER.CONTRACT_ADDENDUM_TEMPLATE.FIND_ALL_AND_SEARCH}`, payload)
    }

    add(payload: IPayload) {
        return this.apiService.post(`${API_ROUTER.CONTRACT_ADDENDUM_TEMPLATE.CREATE}`, payload)
    }
}
