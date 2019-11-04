import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FileResultResponse, ResponseMessages, ResponseTypes} from '../xlsx-file-upload-constants';
import * as XLSX from 'xlsx';

@Injectable()
export class XlsxFileUploadService {

    traverseFile(file: FileList, valueKeyObject: Object): Observable<any> {
        return new Observable((observer) => {
            const selectedFile = file.item(0);
            const extension = this.getFileExtension(selectedFile.name);
            if (extension && extension === 'xlsx') {
                try {
                    let arrayBuffer;
                    const fileReader = new FileReader();
                    fileReader.onload = (e) => {
                        arrayBuffer = fileReader.result;
                        const data = new Uint8Array(arrayBuffer);
                        const arr = new Array();
                        for (let i = 0; i !== data.length; ++i) {
                            arr[i] = String.fromCharCode(data[i]);
                        }
                        const bstr = arr.join('');
                        const workbook = XLSX.read(bstr, {type: 'binary'});
                        const first_sheet_name = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[first_sheet_name];
                        const output = XLSX.utils.sheet_to_json(worksheet, {raw: true});
                        const list = [];
                        if (output) {
                            output.forEach((obj: any) => {
                                const item = obj;
                                const keys = Object.keys(item);
                                for (let j = 0; j < keys.length; j++) {
                                    const key = keys[j]; // key
                                    if (valueKeyObject.hasOwnProperty(key)) {
                                        item[valueKeyObject[key]] = item[key];
                                        delete item[key];
                                    }
                                }
                                list.push(item);
                            });
                        }
                        observer.next(this.generateResponse(ResponseTypes.SUCCESS, selectedFile, ResponseMessages.SUCCESS, list));
                        observer.complete();
                    };
                    fileReader.readAsArrayBuffer(selectedFile);
                } catch (e) {
                    observer.error(this.generateResponse(ResponseTypes.ERROR, selectedFile, ResponseMessages.FILE_READ, null));
                }
            } else {
                observer.error(this.generateResponse(ResponseTypes.ERROR, selectedFile, ResponseMessages.EXTENSION, null));
            }
        });
    }

    getFileExtension(filePath: string): string {
        try {
            return filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[1];
        } catch (e) {
            console.error(e);
        }
        return null;
    }

    generateResponse(type: ResponseTypes, file: File, errorMessage: ResponseMessages, result: any) {
        const response: FileResultResponse = {
            type: type,
            file: file,
            message: errorMessage,
            result: result
        };

        return response;
    }
}
