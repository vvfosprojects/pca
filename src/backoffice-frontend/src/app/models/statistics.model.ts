export class Statistics {
    constructor(
        public totalActiveDistinctFiscalCodes: number,
        public totalActiveApplicationsEver: number,
        public totalSubmissionsEver: number,
        public duplicateFiscalCodeErrors: number,
        public otherErrors: number,
        public submittedToday: number,
        public submittedInTheLastFiveDays: number
    ) {
        
    }
}
