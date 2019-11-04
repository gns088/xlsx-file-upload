import {inject, TestBed} from '@angular/core/testing';

import {XlsxFileUploadService} from './xlsx-file-upload.service';

describe('XlsxFileUploadService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [XlsxFileUploadService]
        });
    });

    it('should be created', inject([XlsxFileUploadService], (service: XlsxFileUploadService) => {
        expect(service).toBeTruthy();
    }));
});
