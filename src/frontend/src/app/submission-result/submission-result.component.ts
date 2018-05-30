import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomandaResult } from '../model/domanda-result.model';

@Component({
  selector: 'app-submission-result',
  templateUrl: './submission-result.component.html',
  styleUrls: ['./submission-result.component.css']
})
export class SubmissionResultComponent implements OnInit {
 
  pin: any;
  messagesToTheUser: any;
  emailAddress: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.pin = this.route.snapshot.paramMap.get('pin');
    this.emailAddress = this.route.snapshot.paramMap.get('email');

    //non legge array
    this.messagesToTheUser = this.route.snapshot.paramMap.getAll('messages');
    console.log("messages:", this.messagesToTheUser);

    this.route.paramMap.subscribe(params => {
      this.messagesToTheUser=params.getAll('messages');
    });
    console.log("messages 2:", this.messagesToTheUser);
    
   }

  goHome(): void {
    this.router.navigate(['/application-form']);
  }
}
