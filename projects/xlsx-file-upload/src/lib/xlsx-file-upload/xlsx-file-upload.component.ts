import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'ngx-xlsx-file-upload',
    templateUrl: './xlsx-file-upload.component.html',
    styleUrls: ['./xlsx-file-upload.component.scss']
})
export class XlsxFileUploadComponent implements OnInit {

    @Input()
    placeholder: string = 'Drop File Here';

    @Output('onError') onError = new EventEmitter();
    @Output('onSuccess') onSuccess = new EventEmitter();
    @Input('valueKeyObject') valueKeyObject: Object = {};


    private selectFileElement: HTMLElement;

    @ViewChild('fileSelectInput') fileSelectInput: ElementRef;

    constructor(@Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {
        this.selectFileElement = this.document.getElementById('file-input');
    }

    selectFile = () => {
        if (this.fileSelectInput.nativeElement.value) {
            this.fileSelectInput.nativeElement.value = null;
        }
        this.selectFileElement.click();
    };

    onResultError = (event) => {
        this.onError.next(event);
    };
    onResultSuccess = (event) => {
        this.onSuccess.next(event);
    };
}
