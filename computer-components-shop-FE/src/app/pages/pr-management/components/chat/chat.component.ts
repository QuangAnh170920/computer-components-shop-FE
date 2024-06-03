import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';
import { MenuItem } from 'primeng/api';
import { PrManagementService } from '../../services/pr-management.service';
import { ToastService } from '@shared/services/toast.service';
import { UserService } from 'src/app/pages/user/services/services';
import { IUser } from 'src/app/pages/user/models/user.model';

@Component({
    selector: 'pr-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
    tabs: MenuItem[] = [];
    adminId:  number = 0;
    activeTab: MenuItem = this.tabs[0];
    constructor(
        private prManagementService: PrManagementService, private toastService: ToastService,private userService: UserService,
    ) {

    }
    ngOnInit() {
        this.tabs = [
            { label: 'NCC 01 (15)', id: faker.string.uuid() },
        ];
        this.activeTab = this.tabs[0];
        this._loadMenuChat();
    }

    private _loadMenuChat(){
        this.userService.userInfo().subscribe((res) => {
            // this.prManagementService.getListChat(res.responseData.id).subscribe((res)=>{
            //     if((res)){
            //        this.tabs = res.responseData.map((item:any)=>({
            //           label:item.titleName,
            //           id: item.userId
            //        }));

            //     }
            // })
         });

    }

}
