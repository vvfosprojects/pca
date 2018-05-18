export class ApplicationRow {
    constructor(
        private id: string,
        private fullName: string,
        private fiscalCode: string,
        private submittedAt: Date,
        private hasAnomalies: boolean) {}
}