import { Injectable } from "@angular/core"
import { API_ROUTER } from "@shared/constants/api.constant"
import { ApiService } from "@shared/services/api.service"
import { IPayload, ISearch } from "../models/bao-gia-templates.model"

@Injectable({
    providedIn: 'root',
})
export class BaoGiaTemplatesService {
    constructor(private apiService: ApiService) {}

    search(payload: ISearch) {
        return this.apiService.post(`${API_ROUTER.QUOTE_TEMPLATE.FIND_ALL_AND_SEARCH}`, payload)
    }

    add(payload: IPayload) {
        return this.apiService.post(`${API_ROUTER.QUOTE_TEMPLATE.CREATE}`, payload)
    }
}