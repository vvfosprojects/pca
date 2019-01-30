import {Component, OnInit} from '@angular/core';
import {SpidService} from '../../services/spid.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {SpidResult} from '../../model/spid-result.models';
import {of as observableOf, Observable, timer} from 'rxjs';

@Component({
  selector: 'app-spid',
  templateUrl: './spid.component.html',
  styleUrls: ['./spid.component.css']
})
export class SpidComponent implements OnInit {



  constructor() {
  }

  ngOnInit() {
  }



}
