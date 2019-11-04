import {NgModule} from '@angular/core';
import {XlsxFileUploadComponent} from './xlsx-file-upload/xlsx-file-upload.component';
import {NgFileSelectDirective} from './directive/ng-file-select.directive';
import {NgFileDropDirective} from './directive/ng-file-drop.directive';
import {XlsxFileUploadService} from './service/xlsx-file-upload.service';

@NgModule({
    declarations: [XlsxFileUploadComponent, NgFileSelectDirective, NgFileDropDirective],
    exports: [XlsxFileUploadComponent, NgFileSelectDirective, NgFileDropDirective],
    providers: [XlsxFileUploadService]
})
export class XlsxFileUploadModule {
}
