import { ApplicationRow } from "./application-row.model";

export class ApplicationRowPage {
    constructor(
        public startIdx: number,
        public howMany: number,
        public totalCount: number,
        public rows: ApplicationRow[]
    ) {}
}