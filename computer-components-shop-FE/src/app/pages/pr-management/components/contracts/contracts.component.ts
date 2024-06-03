import { Component } from '@angular/core';
import { getContracts } from './utils/mock';
import { Contract } from './utils/types';

@Component({
    selector: 'pr-contracts',
    templateUrl: './contracts.component.html',
    styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent {
    contracts: Contract[] = [];

    ngOnInit() {
        this.contracts = getContracts(10);
    }
}
