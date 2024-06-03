import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private toastService:ToastService, private spinnerService: SpinnerService,private router: Router, private sessionService:SessionService) { }

  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  private formatErrors(error: any) {
    return throwError(() => error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    console.log(params, "123131");

    const _url = path.includes('http')?path:environment.apiBaseUrl+path
    return this.http
      .get(`${_url}`, {params})
      .pipe(
        map((rs: any) => {
          if (rs.error !== undefined && rs.error !== null) {
            throw new Error(rs.error.cause);
          }
          this.spinnerService.hiden()
          // if(!rs.data) {
          //     this.toastService.showError('Lỗi dữ liệu đầu vào!')
          // }
          return rs;
        }),
        catchError((error: any) => {

          this.toastService.showError(error.responseMessage)
          return throwError(error);
        })
        );

  }

  post(path: string, body: Object = {}): Observable<any> {

    return this.http
      .post(`${environment.apiBaseUrl}${path}`, JSON.stringify(body), {
        headers: this.defaultHeaders,
      })
      .pipe(
        map((rs: any) => {
          if (rs.error !== undefined && rs.error !== null) {
            throw new Error(rs.error.cause);
          }
          this.spinnerService.hiden()
          return rs;
        }),
        catchError((error: any) => {
          this.toastService.showError(error.responseMessage)
          return throwError(error);
        })
      );
  }
  postFormData(path: string, body: FormData): Observable<any> {
    return this.http
      .post(`${environment.apiBaseUrl}${path}`, body, {
        headers: {
          Accept: 'application/json',
          enctype: 'multipart/form-data',
        },
      }).pipe(
        map((res)=>{
          this.spinnerService.hidenAll()
          return res
        }),
        catchError((error: any) => {
          console.log(error, "123");
          this.sessionService.logout();
          this.router.navigate(['/auth/login']);
          this.toastService.showError(error.responseMessage)
          return throwError(error);
        })
      );
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.apiBaseUrl}${path}`, JSON.stringify(body), {
        headers: this.defaultHeaders,
      })
      .pipe(
        map((rs: any) => {
          if (rs.error !== undefined && rs.error !== null) {
            throw new Error(rs.error.cause);
          }
          return rs;
        }),
        catchError(this.formatErrors)
      );
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http
      .patch(`${environment.apiBaseUrl}${path}`, JSON.stringify(body), {
        headers: this.defaultHeaders,
      })
      .pipe(
        map((rs: any) => {
          if (rs.error !== undefined && rs.error !== null) {
            throw new Error(rs.error.cause);
          }
          return rs.data;
        }),
        catchError(this.formatErrors)
      );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}${path}`).pipe(
      map((rs: any) => {
        if (rs.error !== undefined && rs.error !== null) {
          throw new Error(rs.error.cause);
        }
        return rs.data;
      }),
      catchError(this.formatErrors)
    );
  }

  postUploadFile(path: string, body: FormData): Observable<any> {
    return this.http
      .post(`${environment.apiBaseUrl}${path}`, body, {
        headers: {
          Accept: 'application/json',
          enctype: 'multipart/form-data',
        },
      }).pipe(
        map((res)=>{
          this.spinnerService.hidenAll()
          return res
        }),
        catchError(this.formatErrors)
      );
  }


  getJSON(path: string): Observable<any> {
    return this.http.get(path);
  }

  export(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}${path}`, {
      params,
      observe: 'response',
      responseType: 'blob',
    });
  }


}
