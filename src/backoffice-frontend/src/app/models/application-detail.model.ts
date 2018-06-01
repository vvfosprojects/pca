import { AnomaliesRow } from "./anomalies-row.model";

export class ApplicationDetail {
    constructor(
        public id :string,
        public fiscalCode : string,
        public fullName: string,
        public birthDate : Date,
        public eMail: string,
        public phoneNumber: string,
        public workingDays : number,
        public drivingLicense: string,
        public businessUnits: string[],
        public submissionTime: Date,
        public anomaly: AnomaliesRow[],
        public sourceIp: string) {}
}



