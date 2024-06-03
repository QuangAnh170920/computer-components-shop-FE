import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@env';

export const AUTH_TOKEN = '__TKNI';
export const ACCOUNT_INFO = 'ACCOUNT_INFO';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const MENU = 'MENU';
export const ROLES = 'ROLES';
export const URLS = 'URLS';
import { UserInfo } from '../models/user-info.model';
import { RoleInfo } from '@shared/models/role.model';
import { ILogin } from 'src/app/pages/auth/models/auth.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  domain = environment.domain;
  private KEY_PERMISSION = 'permission';
  helper:any
  constructor(private cookieService: CookieService) { 
    this.helper = new JwtHelperService();

  }

  // manage session token
  serveSessionToken(token: string) {
    localStorage.setItem(AUTH_TOKEN, token);

  }

  
  retrieveSessionToken() {
   
    return localStorage.getItem(AUTH_TOKEN);
    
  }
  

  // account info
  serveAccountInfo(accInfo: UserInfo) {
    localStorage.setItem(ACCOUNT_INFO, JSON.stringify(accInfo));
  }

  retrieveAccountInfo(): UserInfo | undefined {
    const accInfo = localStorage.getItem(ACCOUNT_INFO);
    if (accInfo) {
      return JSON.parse(accInfo);
    }
    return undefined;
  }

  // menu info
  serveMenuInfo(mapMenu: { [key: string]: RoleInfo }) {
    localStorage.setItem(MENU, JSON.stringify(mapMenu));
  }

  retrieveMenuInfo(): { [key: string]: RoleInfo } {
    const menu = localStorage.getItem(MENU);
    if (menu) {
      return JSON.parse(menu);
    }
    return {};
  }

  // role info
  serveRoleInfo(mapRoles:{[key: string]: { [key: string]: boolean }}) {
    localStorage.setItem(ROLES, JSON.stringify(mapRoles));
  }

  retrieveRoleInfo(): {[key: string]: { [key: string]: boolean }} {
    const roles = localStorage.getItem(ROLES);
    if (roles) {
      return JSON.parse(roles);
    }
    return {};
  }

  // url info
  serveUrlInfo(urls: string[]) {
    localStorage.setItem(URLS, JSON.stringify(urls));
  }

  retrieveUrlInfo(): Set<string> {
    const urls = localStorage.getItem(URLS);
    if (urls) {
      return new Set(JSON.parse(urls));
    }
    return new Set();
  }

  // delete all
  purgeSessionInfo() {
    localStorage.removeItem(ACCOUNT_INFO);
    localStorage.removeItem(MENU);
    localStorage.removeItem(ROLES);
  }

  checkToken(): boolean {
    const _tkn = localStorage.getItem(AUTH_TOKEN); 
    const isExpired = this.helper.isTokenExpired(_tkn); 
    if(isExpired) {
      this.logout()
      return false
    }

    return true
  }

  savePermission(permission: any) {
    localStorage.setItem(this.KEY_PERMISSION, JSON.stringify(permission));
  }

  getPermission(): any {
    if (localStorage.getItem(this.KEY_PERMISSION)) {
      return JSON.parse(
        localStorage.getItem(this.KEY_PERMISSION) as string
      ) as any;
    }
    return null;
  }

  destroyPermission() {
    localStorage.removeItem(this.KEY_PERMISSION);
  }

  // saveRefreshToken(isRefreshToken: boolean) {
  //   localStorage.setItem(REFRESH_TOKEN,JSON.stringify(isRefreshToken))
  // }
  saveRefreshToken(refreshToken: string) {
    localStorage.setItem(REFRESH_TOKEN,refreshToken)
  }

  purgeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN)
    
  }
   getRefreshToken(){
    console.log(localStorage.getItem(REFRESH_TOKEN), 'sssss');
    return localStorage.getItem(REFRESH_TOKEN)
  
    
   }

  retrieveRefreshToken(): boolean {
    const isRefreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (isRefreshToken) {
      return JSON.parse(isRefreshToken);
    }
    return false;
  }

  logout() {
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem('__USRP')
    localStorage.removeItem(REFRESH_TOKEN)
    return true
  }
  rememberUser(remember: boolean, login:ILogin ){
    if(remember) {
        localStorage.setItem('username',login.username)
        localStorage.setItem('password',login.password)
        localStorage.setItem('remember', 'true')
    }
    else{
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        localStorage.setItem('remember', 'false')
    }
  }
}
