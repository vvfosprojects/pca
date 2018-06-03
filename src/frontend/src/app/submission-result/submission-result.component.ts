import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { DomandaResult } from '../model/domanda-result.model';
import { DomandaOutcome } from '../model/domanda-outcome.model';
import { ApplicationService } from '../../service/application.service';

@Component({
  selector: 'app-submission-result',
  templateUrl: './submission-result.component.html',
  styleUrls: ['./submission-result.component.css']
})
export class SubmissionResultComponent implements OnInit {
  private result: DomandaOutcome;

  constructor(
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.result = this.applicationService.getLastResponse();
  }
}
