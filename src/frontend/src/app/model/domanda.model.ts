export class Domanda {
    constructor(
        public fiscalCode: string, 
        public firstName: string,
        public lastName: string,
        public birthDate: string, 
        public email: string, 
        public phoneNumber: string,
        public sedi: string[],
        public workingDays: number,
        public drivingLicense: string,
        public pin: string
    ) {}
    
}


