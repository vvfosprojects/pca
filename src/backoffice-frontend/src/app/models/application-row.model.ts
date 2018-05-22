export class ApplicationRow {
    constructor(
        public id: string,
        public fullName: string,
        public fiscalCode: string,
        public submittedAt: Date,
        public hasAnomalies: boolean) {}
}