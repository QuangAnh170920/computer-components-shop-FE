import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, distinctUntilChanged, filter } from "rxjs";
import { LazyLoadEvent } from "primeng/api";
import { LayoutService } from "../service/app.layout.service";
import { ToastService } from "../../shared/services/toast.service";

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