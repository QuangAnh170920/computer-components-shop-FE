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
                        routerLink: [''],
                    },
                ],
            },
            {
                label: 'Quản lý sản phẩm',
                items: [
                    {
                        label: 'Sản phẩm',
                        routerLink: ['/product-management'],
                        icon: 'pi pi-box',
                    },
                    // {
                    //     label: 'Danh sách thông số sản phẩm',
                    //     routerLink: ['/product-specifications'],
                    //     icon: 'pi pi-book',
                    // },
                ],
            },
            {
                label: 'Quản lý loại sản phẩm',
                items: [
                    {
                        label: 'Loại sản phẩm',
                        routerLink: ['/categories-management'],
                        icon: 'pi pi-database',
                    },
                ],
            },
            // {
            //     label: 'Quản lý thương hiệu',
            //     items: [
            //         {
            //             label: 'Thương hiệu',
            //             routerLink: ['/brand-management'],
            //             icon: 'pi pi-bookmark',
            //         },
            //     ],
            // },
            {
                label: 'Quản lý nhập/xuất kho hàng',
                items: [
                    {
                        label: 'Nhập hàng',
                        routerLink: ['/receiving-inventory'],
                        icon: 'pi pi-plus-circle',
                    },
                    {
                        label: 'Xuất hàng',
                        routerLink: ['/shipping-inventory'],
                        icon: 'pi pi-minus-circle',
                    },
                ],
            },
            {
                label: 'Quản lý kho hàng',
                items: [
                    {
                        label: 'Kho hàng',
                        routerLink: ['/warehouse'],
                        icon: 'pi pi-inbox',
                    },
                ],
            },
            {
                label: 'Quản lý đơn hàng',
                items: [
                    {
                        label: 'Đơn hàng',
                        routerLink: ['/sales-order'],
                        icon: 'pi pi-pen-to-square',
                    },
                ],
            },
            {
                label: 'Quản lý khuyến mãi',
                items: [
                    {
                        label: 'Khuyến mãi',
                        routerLink: ['/promotion'],
                        icon: 'pi pi-file-edit',
                    },
                ],
            },
            {
                label: 'Quản lý đánh giá sản phẩm',
                items: [
                    {
                        label: 'Đánh giá sản phẩm',
                        routerLink: ['/product-review'],
                        icon: 'pi pi-file-edit',
                    },
                ],
            },
            // {
            //     label: 'Quản lý nhân viên',
            //     items: [
            //         {
            //             label: 'Nhân viên',
            //             routerLink: ['/employee'],
            //             icon: 'pi pi-users',
            //         },
            //     ],
            // },
        ];
    }
}
