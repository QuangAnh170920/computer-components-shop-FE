import { Component } from '@angular/core';
import { getFileSubmitteds } from './utils/mock';
import { FileSubmitted } from './utils/types';

@Component({
    selector: 'pr-file-submitted',
    templateUrl: './file-submitted.component.html',
    styleUrls: ['./file-submitted.component.scss'],
})
export class FileSubmittedComponent {
    files: FileSubmitted[] = [];

    ngOnInit() {
        this.files = getFileSubmitteds(10);
    }
}
