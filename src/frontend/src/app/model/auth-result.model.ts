export class AuthResult {
    constructor(
        public success: boolean,
        public jwtToken: string,
        public expirationDate: Date
    ) {}
}