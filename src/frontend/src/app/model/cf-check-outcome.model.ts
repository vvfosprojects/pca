import { CfCheckResult } from "./cf-check-result.model";

export class CfCheckOutcome {
    constructor(
        public results: CfCheckResult[],
        public canSubmit: boolean,
        public shouldTypePin: boolean
    ) {}

}