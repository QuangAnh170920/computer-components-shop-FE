import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { SessionService } from '../shared/services/session.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private confirmationService: ConfirmationService,
        private sessionService: SessionService,
        private router: Router

    ) {}
    ngOnInit() {
        this.items = [
            {
                label: 'Thông tin chung',
                icon: 'pi pi-fw pi-info-circle',
                routerLink: '/user/user-info',
            },
            {
                label: 'Thay đổi mật khẩu',
                icon: 'pi pi-fw pi-cog',
                routerLink: '/user/user-change-password',
            },
            {
                label: 'Đăng xuất',
                icon: 'pi pi-fw pi-power-off',
                command: () => {
                    this.logout();
                },
            },
        ];
    }
    logout() {
        this.confirmationService.confirm({
            message: 'Bạn có muốn đăng xuất?',
            header: 'Xác nhận',
                        icon: 'pi pi-exclamation-triangle',
            accept: () => {                
                if (this.sessionService.logout()) {
                    this.router.navigate(['/auth/login'])
                }
            },
            reject: () => {},
        });
    }
}
