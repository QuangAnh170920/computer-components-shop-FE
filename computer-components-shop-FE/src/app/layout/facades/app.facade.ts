import { Injectable } from "@angular/core";
import { PagingData, ResponseData } from "@shared/models/paging.model";
import { BehaviorSubject, Observable, distinctUntilChanged, filter } from "rxjs";
import { ToastService } from "@shared/services/toast.service";
import { LazyLoadEvent } from "primeng/api";
import { convertFilter } from "@shared/utils/filter-params.util";
import { LayoutService } from "../service/app.layout.service";

@Injectable({
    providedIn: 'root',
})
export class AppFacade {
    private _appMenu = new BehaviorSubject<any | null> (null) 
    constructor(private layoutService: LayoutService, private toastService: ToastService){}
 
    // get appMenu$(): Observable<any> {
    //     return this._appMenu.asObservable().pipe(
    //         filter((res: any) => res),
    //         distinctUntilChanged()
    //     );
    // }

    // filter () { 
    //     return this.layoutService.list().subscribe(res=>{
    //         this._appMenu.next(res)
    //     })
    // }

}