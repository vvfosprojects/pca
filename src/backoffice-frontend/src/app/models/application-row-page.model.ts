import { ApplicationRow } from "./application-row.model";
// import { EventEmitter } from "protractor";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetApplicationRowsService } from '../services/get-application-rows.service';

export class ApplicationRowPage {
    constructor(
        public startIdx: number,
        public howMany: number,
        public totalCount: number,
        public totalFiltered: number,
        public rows: ApplicationRow[]
    ) {}
}

