import { DomandaResult } from "./domanda-result.model";

export class DomandaOutcome {
    constructor(
        public fiscalCode: string,
        public pin: string,
        public messagesToTheUser: DomandaResult[],
        public submittedAt: string,
        public submissionOk: boolean
    ) {}
    
}