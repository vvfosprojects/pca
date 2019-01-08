import { SpidAttribute } from "./spid-attribute.model";

export class SpidAttributeResult {
    constructor(
		public success: boolean,
		public message: string,
		public spidAttribute: SpidAttribute
    ) {}
}