export enum ResultType { Error, Warning, Success }

export class DomandaResult {
    constructor(
        public code: string,
        public message: string
    ) {}
    
}


