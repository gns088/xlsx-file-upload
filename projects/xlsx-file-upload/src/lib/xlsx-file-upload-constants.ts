export interface FileResultResponse {
    type: ResponseTypes;
    file: File;
    message?: ResponseMessages;
    result?: any;
}

export enum ResponseTypes {
    ERROR = 'error',
    SUCCESS = 'success',
}

export enum ResponseMessages {
    EXTENSION = 'File extension is not xlsx.',
    FILE_READ = 'Parser is not able to parse file.',
    SUCCESS = 'File Read successfully',
}
