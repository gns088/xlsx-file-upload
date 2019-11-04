import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {XlsxFileUploadModule} from '../../projects/xlsx-file-upload/src/lib/xlsx-file-upload.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, XlsxFileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
