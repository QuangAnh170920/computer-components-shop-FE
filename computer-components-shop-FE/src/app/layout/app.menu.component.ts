import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AppFacade } from './facades/app.facade';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    keyword?: string;
    event?: LazyLoadEvent;
    ref?: DynamicDialogRef;
    first = 1;
    menu: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private appFacade: AppFacade,
    ) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'PR Management',
                items: [
                    {
                        label: 'New PR',
                        routerLink: ['/pr-management'],
                    },
                    {
                        label: 'PR In-progress',
                        routerLink: ['/pr-management'],
                    },
                ],
            },
            {
                label: 'PO Management',
                items: [
                    {
                        label: 'New PO',
                        routerLink: ['/po-management'],
                    },
                    {
                        label: 'Released PO',
                        routerLink: [''],
                    },
                ],
            },
            {
                label: 'Vendor',
            },
            {
                label: 'Template Management',
                items: [
                    {
                        label: 'Mẫu Phụ lục hợp đồng',
                        routerLink: ['/contract-addendum-templates'],
                    },
                    {
                        label: 'Mẫu Báo giá',
                        routerLink: ['/bao-gia-templates'],
                    },
                ],
            },
        ];
    }
}
