import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaderResponse,
} from '@angular/common/http';
import { Observable, catchError, filter, map, switchMap, tap, throwError } from 'rxjs';
import { SessionService } from '../services/session.service';
import { SpinnerService } from '@shared/services/spinner.service';
import { Router } from '@angular/router';
import { ToastService } from '@shared/services/toast.service';
import { AuthFacade } from 'src/app/pages/auth/facades/auth.facade';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Injectable()

export class HttpClientInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private sessionService: SessionService,
    private spinnerService: SpinnerService,
    private router: Router,
    private toastService: ToastService,
    private authFacade: AuthFacade) { }
  private isRefreshing = false;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.hiden();
    let headersConfig: { [key: string]: any } = {};

    if (req.headers.keys().length > 0) {
      const headerLength = req.headers.keys().length;
      for (let i = 0; i < headerLength; i++) {
        const name = req.headers.keys()[i];
        headersConfig[name] = req.headers.get(name);
      }
    } else {
      if (req.body instanceof FormData) {
        headersConfig = {
          Accept: 'application/json, text/plain, */*',
        };
      } else {
        headersConfig = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };
      }

    }

    // add RefreshToken
    // const isRefreshToken = this.sessionService.retrieveRefreshToken();
    // if (isRefreshToken) {
    //   headersConfig['isSaveToken'] = `${isRefreshToken}`;
    // }


    // add token
    const token = this.sessionService.retrieveSessionToken();
    if (token) {
      headersConfig['Authorization'] = `${token}`;
      const authReq = req.clone({ setHeaders: headersConfig });
      return next.handle(authReq).pipe(
        tap((res: HttpEvent<any>) => {
          let _res
          if (res instanceof HttpResponse) {
            let _res = { ...res }
            if (res.headers.get('Location')) {
              _res.body = { data: res.headers.get('Location') }
            }
          }
          this.spinnerService.hidenAll()
          return _res ?? res
        }),
        catchError(err => {
          this.spinnerService.hidenAll()
          if (err.status === 401) {
            if (!this.isRefreshing) {
              this.isRefreshing = true;
              const refresh = this.sessionService.getRefreshToken();
              if (refresh) {
                localStorage.removeItem('__TKNI')
                return this.authService.refresh_token(refresh).pipe(
                  switchMap((refreshResponse) => {
                    this.isRefreshing = false;
    
                    this.sessionService.serveSessionToken(
                      refreshResponse.responseData.accessToken
                    );
                    this.toastService.showSuccess('Refresh token successful!');
    
                    const newHeadersConfig: any = {
                      'Content-Type': 'application/json',
                      Authorization: `${refreshResponse.responseData.accessToken}`,
                    };
    
                    const newAuthReq = req.clone({
                      setHeaders: newHeadersConfig,
                    });
    
                    return next.handle(newAuthReq);
                  }),
                 
                );
              } else {
              
                this.sessionService.logout()
                this.router.navigate(['/auth/login'])
              }
            }

          }

          if (err.status === 422) {
            this.toastService.showError('Lỗi dữ liệu đầu vào!')
          }
          return throwError(() => Error(err?.message))
        })
      );
    }

    return next.handle(req)
    .pipe(tap(res=>{this.spinnerService.hidenAll() ; return res}), catchError(err=>{
        if(err?.status === 401) {

              this.sessionService.logout()
              this.router.navigate(['/auth/login'])
               return throwError(()=> err?.error)
        }
        return throwError(()=> err.error)
    }));
  }
  

}
