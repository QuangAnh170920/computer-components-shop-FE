// import { Injectable } from "@angular/core";
// import { AngularFireMessaging } from "@angular/fire/compat/messaging";
// import { BehaviorSubject } from "rxjs";

// @Injectable({
//     providedIn: 'root',
//   })
// export class MessageService {
//     currentMessage = new BehaviorSubject<any>(null);
//     constructor(private angularFireMessage:AngularFireMessaging){

//     }

//     requestPermission(){
//         console.log("123123123123123123123123")
//         this.angularFireMessage.getToken.subscribe((token)=>{
            
//             console.log(token,"Token");
//         })
//     }
//     receiveMessage(){
//         this.angularFireMessage.messages.subscribe((payload)=>{
//             console.log("new mess: ", payload);
//             this.currentMessage.next(payload)
//         })
//     }
// }
