export class Statistics {
    constructor(
        private totalActiveApplicationsEver: number,
        private totalSubmissionsEver: number,
        private duplicateFiscalCodeErrors: number,
        private otherErrors: number,
        private submittedToday: number,
        private submittedInTheLastFiveDays: number
    ) {
        
    }
}
