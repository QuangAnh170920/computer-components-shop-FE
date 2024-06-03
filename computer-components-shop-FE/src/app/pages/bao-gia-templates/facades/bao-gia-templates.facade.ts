import { Injectable } from "@angular/core";
import { BaoGiaTemplatesService } from "../services/bao-gia-templates.service";
import { ToastService } from "@shared/services/toast.service";
import { Router } from "@angular/router";
import { IPayload } from "../models/bao-gia-templates.model";

@Injectable({
    providedIn: 'root',
})
export class QuoteTemplatesFacade {
    constructor(
        private baoGiaService: BaoGiaTemplatesService,
        private toastService: ToastService, 
        private router:Router
    ) {}

    add(payload: IPayload) {
        return this.baoGiaService.add({...payload}).subscribe((res) => {
            if(res) {
                return this.toastService.showSuccess(
                    'Thêm mới thành công!'
                );
            }
        })
    }
}