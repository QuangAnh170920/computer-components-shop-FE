import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private messageService: MessageService, private router:Router) { this.goto = this.router }


  goto?:Router

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: message,
    });
  }

  showWarning(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Cảnh báo',
      detail: message,
    });
  }

  showInfo(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Thông tin',
      detail: message,
    });
  }

   
}
