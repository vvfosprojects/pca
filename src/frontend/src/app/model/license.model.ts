export class License {
    constructor(
        public readonly type: string, 
        public readonly category: string,
        public readonly number: string,
        public readonly releasedBy: string, 
        public readonly releaseDate: string,
        public readonly validUntil: string,
    ) {}
    
}