import { DatePipe } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
// import { StatisticsService } from 'src/app/pages/statistics/services/statistics.service';
import { LazyLoadEvent } from 'primeng/api';
// import { StatisticsFacade } from 'src/app/pages/statistics/facades/statistics.facade';

interface optionTypes {
    type: string;
    code: string;
}
@Component({
    selector: 'app-p-calendar',
    templateUrl: './p-calendar.component.html',
    styleUrls: ['./p-calendar.component.scss'],
})
export class PCalendarComponent {
    event?: LazyLoadEvent;
    @Input() searchApi?: Function = () => {};
    @Input() first?: number = 1;
    @Input() batch?: boolean = false;
    @Input() show?: boolean = false;
    @Input() hideFunction?: Function = () => {};
    fromDate: Date | undefined;
    toDate: Date | undefined;
    typeFilter: optionTypes[] | any;
    selectedType: optionTypes | any;
    minDate: Date;
    maxDate: Date;
    maxToDate: Date | undefined;
    maxFromDate: Date | undefined;
    datePipe = new DatePipe('en-US');
    typeSearch = 1;
    constructor(
        // private statisticsService: StatisticsService,
        // private statisticsFacade: StatisticsFacade
    ) {
        this.minDate = new Date();
        this.maxDate = new Date(this.minDate);
        this.maxDate.setDate(this.minDate.getDate());
    }
    // lazyLoad(event?: LazyLoadEvent, payload?:any) {
    //     if (event) {
    //         this.event = event;
    //     } else {
    //         this.first = 1;
    //     }
    //     // console.log(1)
    //     this.statisticsFacade.filter(payload);
    // }
    test() {
        if (this.toDate) {
            this.maxFromDate = new Date(this.minDate);
            this.maxFromDate.setDate(this.toDate.getDate() - 1);
        }
        if (this.fromDate && this.toDate) {
            let i: number = Math.floor(
                (Date.UTC(
                    this.toDate.getFullYear(),
                    this.toDate.getMonth(),
                    this.toDate.getDate()
                ) -
                    Date.UTC(
                        this.fromDate.getFullYear(),
                        this.fromDate.getMonth(),
                        this.fromDate.getDate()
                    )) /
                    (1000 * 60 * 60 * 24)
            );
        }
    }
    ngOnInit() {
        this.typeFilter = [
            { type: 'Ngày', code: 'date' },
            { type: 'Tháng', code: 'month' },
        ];
    }
    submit() {
        if (this.fromDate && this.toDate) {
            let i: number = Math.floor(
                (Date.UTC(
                    this.toDate.getFullYear(),
                    this.toDate.getMonth(),
                    this.toDate.getDate()
                ) -
                    Date.UTC(
                        this.fromDate.getFullYear(),
                        this.fromDate.getMonth(),
                        this.fromDate.getDate()
                    )) /
                    (1000 * 60 * 60 * 24)
            );
            if (i < 30) this.selectedType = { type: 'Ngày', code: 'date' };
            var test;
            test = {
                fromdate: this.datePipe.transform(this.fromDate, 'yyyy-MM-dd'),
                todate: this.datePipe.transform(this.toDate, 'yyyy-MM-dd'),
                type: this.selectedType.code,
            };
            if (this.batch === true) {
                test = {
                    fromdate: new Date(this.fromDate).toISOString(),
                    todate: new Date(this.toDate).toISOString(),
                    type: this.selectedType.code,
                };
            }

            if (this.searchApi) {
                this.searchApi(this.event, test);
            }
        }
    }
    test1() {
        if (this.hideFunction) {
            this.hideFunction();
        }
    }
    finalHide() {
        if (this.hideFunction) {
            this.hideFunction();
        } 
    }
}
