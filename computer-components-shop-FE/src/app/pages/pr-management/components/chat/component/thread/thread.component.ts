import { Component, Input } from '@angular/core';
import { getThread } from './utils/mock';
import { Message } from './utils/types';
import { MenuItem } from 'primeng/api';
import { PrManagementService } from 'src/app/pages/pr-management/services/pr-management.service';
import { UserService } from 'src/app/pages/user/services/services';
import { ToastService } from '@shared/services/toast.service';

@Component({
    selector: 'chat-thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent {
    thread: Message[] = [];

    @Input() tab!: MenuItem;
    constructor(
        private prManagementService: PrManagementService, private toastService: ToastService,private userService: UserService,
    ) {}


    ngOnInit() {
        this.thread = getThread(15);
        // this._loadDetailChat();
    }
    // private _loadDetailChat(){
    //     this.userService.userInfo().subscribe((res) => {
    //         const userId = res.responseData.id;
    //         this.prManagementService.getDetailChat(res.responseData.id, this.tab.id as any).subscribe((res)=>{
    //             if (res) {
    //                 this.thread = res.responseData.map((item: any) => ({
    //                   id: userId,
    //                   text: item.messageContent,
    //                   participantId: (this.extractNumberFromString(item.senderId) === userId) ? 'Me' : 'Supplier'
    //                 }));
    //               }
    //         })
    //      });
    // }
    private extractNumberFromString(str: string): number {
        return parseInt(str.replace(/\D/g, ''), 10);
    }

}
