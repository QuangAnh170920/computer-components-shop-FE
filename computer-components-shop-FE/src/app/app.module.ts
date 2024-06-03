import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ProductService } from './demo/service/product.service';
import { AppLayoutModule } from './layout/app.layout.module';
import { AsyncPipe } from '@angular/common';
import { HttpClientInterceptor } from './shared/interceptors/http.client.interceptor';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ToastModule,
        ConfirmDialogModule,
        CalendarModule,
        MenuModule,
    ],
    providers: [
        MessageService,
        // PDialogService,
        ConfirmationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpClientInterceptor,
            multi: true,
        },
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        AsyncPipe,
        MessageService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
