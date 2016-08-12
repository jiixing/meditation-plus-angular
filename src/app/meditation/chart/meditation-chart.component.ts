import { Component } from '@angular/core';
import { MeditationService } from '../meditation.service';
import { UserService } from '../../user/user.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import * as moment from 'moment';
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';

let chart = require('chart.js');

/**
 * Component for the meditation tab inside home.
 */
@Component({
  selector: 'meditation-chart',
  template: require('./meditation-chart.html'),
  directives: [CHART_DIRECTIVES],
  styles: [
    require('./meditation-chart.css')
  ]
})
export class MeditationChartComponent {

  // chart details
  chartSubscribtion: Subscription;
  chartLastHour: string = '';
  chartData: Array<any> = [];
  chartLabels: String[] = [];
  chartColors: Array<any> = [];
  chartOptions = {
    animations: true,
    maintainAspectRatio: false,
    responsive: true,
    legend: false,
    scales: {
      yAxes: [{
        display: false
      }],
      xAxes: [{
        // needed to have both series (normal and current hour) in one place
        stacked: true
      }]
    }
  };

  constructor(public meditationService: MeditationService) {
    let data = {data: [], label: 'Meditation minutes'};
      let dataCurrentHour = {data: [], label: 'Meditation minutes (current hour)'};

      let colors = [];
      for (let i = 0; i < 24; i++) {
        this.chartLabels.push('' + i);
      }
      this.chartData.push(data);

      // check for hour change every second
      this.chartSubscribtion = Observable.interval(1000)
        .subscribe(() => {
          const currentHour = moment().utc().format('H').toString();

          if (currentHour === this.chartLastHour) {
            return;
          }

          // create chart data on hour change
          meditationService
            .getTimes()
            .map(res => res.json())
            .subscribe(res => {
              this.chartLastHour = currentHour;

              // Two datasets are needed to have different colors for the bars.
              // The current hour should have other color.
              data = {data: [], label: 'Meditation minutes'};
              dataCurrentHour = {data: [], label: 'Meditation minutes (current hour)'};

              // normal color
              colors.push({
                backgroundColor: 'rgba(255, 33, 81, 0.4)'
              });

              // current hour
              colors.push({
                backgroundColor: 'rgba(255, 33, 81, 0.9)'
              });

              for (let entry of Object.keys(res)) {
                // push current hour times only to currentHour chart series
                if (entry === currentHour) {
                  dataCurrentHour.data.push(res[entry]);
                  data.data.push(0);
                  continue;
                }
                data.data.push(res[entry]);
                dataCurrentHour.data.push(0);
              }
              this.chartData = [data, dataCurrentHour];
              this.chartColors = colors;
            });
        });
  }

  ngOnDestroy() {
    this.chartSubscribtion.unsubscribe();
  }
}