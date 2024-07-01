import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, distinctUntilChanged, filter } from "rxjs";
import { NewPagingData, NewResponseData } from "../../../shared/models/paging.model";
import { IEmployee, ISearch } from "../models/employee-management.model";
import { EmployeeManagementService } from "../services/employee-management.service";
import { ToastService } from "../../../shared/services/toast.service";

@Injectable({
    providedIn: 'root',
  })
  export class PromotionFacade {
    private _id = new BehaviorSubject<any | null>(null);
    private _employees = new BehaviorSubject<NewPagingData<IEmployee> | null>(
      null
    );
    private _employee = new BehaviorSubject<NewResponseData<IEmployee> | null>(
      null
    );
    constructor(
      private employeeManagementService: EmployeeManagementService,
      private toastService: ToastService
    ) {}
  
    get id$(): Observable<any> {
      return this._id.asObservable().pipe(
        filter((res: any) => res),
        distinctUntilChanged()
      );
    }
  
    get employeesPaging$(): Observable<NewPagingData<IEmployee> | null> {
      return this._employees.asObservable().pipe(
        filter((res) => res !== null),
        distinctUntilChanged()
      );
    }
  
    get employeePaging$(): Observable<NewResponseData<IEmployee> | null> {
      return this._employee.asObservable().pipe(
        filter((res) => res !== null),
        distinctUntilChanged()
      );
    }
  
    search(payload: ISearch) {
      this.employeeManagementService.search(payload).subscribe((res) => {
        if (res && res.responseData) {
          this._employees.next(res.responseData);
        }
      });
    }
  
    create(payload: IEmployee) {
      return this.employeeManagementService.create(payload).subscribe((res) => {
        if (res && res.responseData) {
          this._employee.next(res.responseData);
          this.toastService.showSuccess('Thêm mới nhân viên thành công');
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  
    update(payload: IEmployee) {
      return this.employeeManagementService.update(payload).subscribe((res) => {
        if (res && res.responseData) {
          this._employee.next(res.responseData);
          this.toastService.showSuccess('Cập nhật nhân viên thành công');
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  
    approve(id: any, status: string) {
      return this.employeeManagementService.approve(id, status).subscribe((res) => {
        if (res) {
          this._employee.next(res.responseData);
          this.toastService.showSuccess(
            'Cập nhật trạng thái nhân viên thành công'
          );
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  
    unapprove(id: any, status: string) {
      return this.employeeManagementService.unapprove(id, status).subscribe((res) => {
        if (res) {
          this._employee.next(res.responseData);
          this.toastService.showSuccess(
            'Cập nhật trạng thái nhân viên thành công'
          );
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  
    detail(id: any) {
      return this.employeeManagementService
        .detail(id)
        .subscribe((res: NewResponseData<IEmployee>) => {
          this._employee.next(res);
        });
    }
  
    delete(id: any) {
      return this.employeeManagementService.delete(id).subscribe((res) => {
        if (res) {
          this._employee.next(res);
          this.toastService.showSuccess('Xóa thông tin thành công');
          this.search({ pageNumber: 1, pageSize: 10 });
        }
      });
    }
  }