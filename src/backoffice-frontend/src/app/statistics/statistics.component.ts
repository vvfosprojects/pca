import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';
import { Statistics } from '../models/statistics.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private statistics: Statistics = null;

  constructor(private statisticsService: StatisticsService) {
    this.statisticsService.getStatistics().subscribe(s => this.statistics = s);
  }

  ngOnInit() {
  }

  private noDuplicateFiscalCodeErrors(): boolean {
    return this.statistics.duplicateFiscalCodeErrors == 0;
  }

  private noOtherErrors(): boolean {
    return this.statistics.otherErrors == 0;
  }

}
