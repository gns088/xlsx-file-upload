import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {XlsxFileUploadService} from '../service/xlsx-file-upload.service';

@Directive({
    selector: '[ngXlsxFileDrop]'
})
export class NgFileDropDirective implements OnInit {

    private el: HTMLInputElement;
    @Output('onError') onError = new EventEmitter();
    @Output('onSuccess') onSuccess = new EventEmitter();
    @Input('valueKeyObject') valueKeyObject: Object = {};

    constructor(public elementRef: ElementRef, private xlsxFileUploadService: XlsxFileUploadService) {
    }

    ngOnInit(): void {
        this.el = this.elementRef.nativeElement;
        this.el.addEventListener('drop', this.stopEvent, false);
        this.el.addEventListener('dragenter', this.stopEvent, false);
        this.el.addEventListener('dragover', this.stopEvent, false);
    }

    stopEvent = (e: Event) => {
        e.stopPropagation();
        e.preventDefault();
    };

    @HostListener('drop', ['$event'])
    public onDrop(event: any) {
        event.stopPropagation();
        event.preventDefault();
        if (event.dataTransfer.files) {
            this.xlsxFileUploadService.traverseFile(event.dataTransfer.files, this.valueKeyObject).subscribe((result) => {
                this.onSuccess.next(result);
            }, (error) => {
                this.onSuccess.next(error);
            });
        }
    }
}
