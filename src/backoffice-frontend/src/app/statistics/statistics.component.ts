import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { Statistics } from '../statistics.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private statistics: Statistics;

  constructor(private statisticsService: StatisticsService) {
    this.statisticsService.getStatistics().subscribe(s => {
        this.statistics = s;
    });
  }

  ngOnInit() {
  }

}
