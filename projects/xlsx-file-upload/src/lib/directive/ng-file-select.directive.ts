import {Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {XlsxFileUploadService} from '../service/xlsx-file-upload.service';

@Directive({
    selector: '[ngXlsxFileSelect]'
})
export class NgFileSelectDirective implements OnInit, OnDestroy {

    private el: HTMLInputElement;
    @Output('onError') onError = new EventEmitter();
    @Output('onSuccess') onSuccess = new EventEmitter();
    @Input('valueKeyObject') valueKeyObject: Object = {};

    constructor(private elementRef: ElementRef, private xlsxFileUploadService: XlsxFileUploadService) {
    }

    ngOnInit(): void {
        this.el = this.elementRef.nativeElement;
        this.el.addEventListener('change', this.fileListener, false);
    }

    ngOnDestroy(): void {
        if (this.el) {
            this.el.removeEventListener('change', this.fileListener, false);
        }
    }

    fileListener = () => {
        if (this.el.files) {
            if (this.el.files) {
                this.xlsxFileUploadService.traverseFile(this.el.files, this.valueKeyObject).subscribe((result) => {
                    this.onSuccess.next(result);
                }, (error) => {
                    this.onSuccess.next(error);
                });
            }
        }
    };
}
