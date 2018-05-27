export class DomandaResult {
    constructor(
        public fiscalCode: string,
        public pin: string,
        public messagesToTheUser: string[],
        public submittedAt: Date
    ) {}
    
}


