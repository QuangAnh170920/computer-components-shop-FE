import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SpinnerService } from './shared/services/spinner.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    chartJs = Chart;
    chartLabelPlugin = ChartDataLabels;
    title = 'firebase-app'
    message:any

    constructor(private primengConfig: PrimeNGConfig, private spinnerService: SpinnerService) {}

    ngOnInit() {
        // this.messageService.requestPermission();
        // this.messageService.receiveMessage();
        this.primengConfig.ripple = false;
        // this.message = this.messageService.currentMessage;
        Chart.register(ChartDataLabels);
        
    }
    ngOnDestroy() {}
}
