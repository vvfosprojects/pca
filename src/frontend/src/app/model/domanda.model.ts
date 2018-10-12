import { License } from "./license.model";

export class Domanda {
    constructor(
        public readonly fiscalCode: string, 
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly birthDate: string, 
        public readonly email: string,
        public readonly businessUnits: string[],
        public readonly workingDays: number,
        public readonly license: License,

        public readonly pin: string
    ) {}
    
}


