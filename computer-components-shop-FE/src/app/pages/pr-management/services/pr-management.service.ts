// import { SocialSourceInfo, SocialSourceInput, UpdateSocialSourceInput, FilterSocialSourceInput } from '../models/page-facebook.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '@shared/services/api.service';
import { HttpParams } from '@angular/common/http';
import { PagingData, ResponseData } from '@shared/models/paging.model';
import { API_ROUTER } from '@shared/constants/api.constant';
import {
    ISearchPayLoad,
    ISendMailContract,
    ISendMailPR,
    IVendor,
} from '../models/pr-management.model';
import { URLSearchParams } from 'url';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class PrManagementService {
    constructor(private apiService: ApiService) {}
    getListOptionsDropDownPlan(searchField?: string) {
        return this.apiService.get(`${API_ROUTER.DROP_DOWN_OPTION.PLAN}`);
    }
    getListOptionsDropDownContract() {
        return this.apiService.get(`${API_ROUTER.DROP_DOWN_OPTION.CONTRACT}`);
    }
    getListOptionsDropDownQuote() {
        return this.apiService.get(`${API_ROUTER.DROP_DOWN_OPTION.QUOTE}`);
    }
    getListOptionsDropDownMaterial(searchField?: string) {
        return this.apiService.get(`${API_ROUTER.DROP_DOWN_OPTION.MATERIAL}`);
    }
    getListOptionsDropDownMaterialGroup(searchField?: string) {
        return this.apiService.get(
            `${API_ROUTER.DROP_DOWN_OPTION.MATERIAL_GROUP}`
        );
    }
    getPrEbanCount() {
        return this.apiService.get(
            `${API_ROUTER.PR_EBAN_CONTROLLER.COUNT}`
        );
    }
    searchPrEan(payload: ISearchPayLoad) {
        return this.apiService.post(`${API_ROUTER.PR_EBAN_CONTROLLER.SEARCH}`, {
            ...payload,
        });
    }
    prEanDetail(banfn?: string, bnfpo?: string) {
        return this.apiService.post(`${API_ROUTER.PR_EBAN_CONTROLLER.DETAIL}`, {
            banfn,
            bnfpo,
        });
    }
    getListVendor(payload: IVendor) {
        return this.apiService.post(
            `${API_ROUTER.PR_EBAN_CONTROLLER.LIST_VENDOR}`,
            payload
        );
    }
    sendMailVendorContract(payload: ISendMailContract) {
        console.log(payload);
        return this.apiService.post(
            `${API_ROUTER.PR_EBAN_CONTROLLER.SEND_MAIL_VENDOR_CONTRACT}`,
            payload
        );
    }
    sendMailVendorPR(payload: ISendMailPR) {
        console.log(payload);
        return this.apiService.post(
            `${API_ROUTER.PR_EBAN_CONTROLLER.SEND_MAIL_VENDOR_PR}`,
            payload
        );
    }
    getQuotes(banfn?: string, bnfpo?: string, searchField?: string) {

        return this.apiService.post(
            `${API_ROUTER.PR_EBAN_CONTROLLER.GET_QUOTES}`,
            { banfn, bnfpo, searchField }
        );
    }
}
