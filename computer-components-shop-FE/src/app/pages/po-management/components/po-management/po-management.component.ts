import { Component } from '@angular/core';
import { EToolBarAction } from '@shared/components/p-toolbar/models/toolbar.model';
import { EFormAction } from '@shared/models/form.model';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PoManagementDetailComponent } from '../po-management-detail/po-management-detail.component';

@Component({
    selector: 'app-po-management',
    templateUrl: './po-management.component.html',
    styleUrls: ['./po-management.component.scss'],
})
export class PoManagementComponent {
    event?: LazyLoadEvent;
    first = 1;
    keyword?: string = '';

    constructor(private dialogService: DialogService) {}

    private _setFormTitle(t: EFormAction) {
        switch (t) {
            case EFormAction.INSERT:
            case EFormAction.CLONE:
                return 'Thêm mới sản phẩm';
            case EFormAction.EDIT:
                return 'Cập nhật sản phẩm';
            case EFormAction.VIEW:
                return 'Chi tiết sản phẩm';
        }
    }

    click() {}

    private _loadDialog(data: any, e: EFormAction) {
        const _title = this._setFormTitle(e);
        const ref = this.dialogService.open(PoManagementDetailComponent, {
            header: _title,
            footer: ' ',
            width: '50%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            data: data,
        });
        ref.onClose.subscribe((res) => {
            this.lazyLoad();
        });
    }

    lazyLoad(event?: LazyLoadEvent) {
        if (event) {
            this.event = event;
        } else {
            this.first = 1;
        }
    }
}
