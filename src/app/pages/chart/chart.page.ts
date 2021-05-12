import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {

// Array of different segments in chart
lineChartData = [
  { data: [65, 59, 80, 81, 56, 55], label: 'Last year' },
  { data: [28, 48, 40, 19, 86, 27], label: 'This year' }
];

//Labels shown on the x-axis
lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

// Define chart options
lineChartOptions: ChartOptions = {
  responsive: true
};

// Define colors of chart segments
lineChartColors: Color[] = [

  { // dark grey
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: 'rgba(77,83,96,1)',
  },
  { // red
    backgroundColor: 'rgba(255,0,0,0.3)',
    borderColor: 'red',
  }
];

lineChartLegend = true;

lineChartType = 'bar';

lineChartPlugins = [];

constructor() { }

ngOnInit() {
  console.log(this.lineChartData)
}
// events
chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

}
