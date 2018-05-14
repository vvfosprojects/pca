export enum ResultType { Error, Warning, Success }

export class CfCheckResult {
    constructor(
        public code: string,
        public message: string,
        public type: ResultType,
    ) {}
    
}


