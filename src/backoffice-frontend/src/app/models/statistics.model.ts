export class Statistics {
    constructor(
        public totalActiveApplicationsEver: number,
        public totalSubmissionsEver: number,
        public duplicateFiscalCodeErrors: number,
        public otherErrors: number,
        public submittedToday: number,
        public submittedInTheLastFiveDays: number
    ) {
        
    }
}
