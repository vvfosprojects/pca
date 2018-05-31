import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomandaResult } from '../model/domanda-result.model';
import { DomandaOutcome } from '../model/domanda-outcome.model';

@Component({
  selector: 'app-submission-result',
  templateUrl: './submission-result.component.html',
  styleUrls: ['./submission-result.component.css']
})
export class SubmissionResultComponent implements OnInit {
 
  pin: any;
  messagesToTheUser: any;
  
  @Input() submissionResult: DomandaOutcome;
  
  //constructor(private route: ActivatedRoute, private router: Router) { }
  constructor(private router: Router) { }
  
  ngOnInit() {
    this.pin = this.submissionResult.pin;
    this.messagesToTheUser = this.submissionResult.messagesToTheUser
    .map(r => {
      return {
        type: r.type,
        msg: r.message
      }
    });
    
    // this.pin = this.route.snapshot.paramMap.get('pin');
    // this.emailAddress = this.route.snapshot.paramMap.get('email');

    // //non legge array
    // this.messagesToTheUser = this.route.snapshot.paramMap.getAll('messages');
    // console.log("messages:", this.messagesToTheUser);

    // this.route.paramMap.subscribe(params => {
    //   this.messagesToTheUser=params.getAll('messages');
    // });
    // console.log("messages 2:", this.messagesToTheUser);
    
   }

  goHome(): void {
    this.router.navigate(['/application-form']);
  }
}
