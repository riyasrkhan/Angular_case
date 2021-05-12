import { Component, OnInit } from '@angular/core';
import { ExportExcelService } from '../../services/export-excel.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as _ from 'underscore';
import { DatePipe } from '@angular/common';
import * as Excel from 'exceljs/dist/exceljs.min.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  title = 'Sales report';
  
    dataForExcel = [];
  
    empPerformance = [
      { REPORT: "Monthly", YEAR: 2019, LY_SALES: 150, TY_SALES: 170 },
      { REPORT: "Monthly", YEAR: 2019, LY_SALES: 217, TY_SALES: 280 },
      { REPORT: "Monthly", YEAR: 2019, LY_SALES: 130, TY_SALES: 340 },
      { REPORT: "Monthly", YEAR: 2019, LY_SALES: 503, TY_SALES: 654 },
      { REPORT: "Monthly", YEAR: 2019, LY_SALES: 600, TY_SALES: 330 },
      { REPORT: "Monthly", YEAR: 2019, LY_SALES: 350, TY_SALES: 415 },
      { REPORT: "Weekly",  YEAR: 2020, LY_SALES: 235, TY_SALES: 324 },
      { REPORT: "Weekly",  YEAR: 2020, LY_SALES: 456, TY_SALES: 685 },
      { REPORT: "Weekly",  YEAR: 2020, LY_SALES: 152, TY_SALES: 120 },
      { REPORT: "Weekly",  YEAR: 2020, LY_SALES: 548, TY_SALES: 355 },
      { REPORT: "Weekly",  YEAR: 2020, LY_SALES: 532, TY_SALES: 650 },
      { REPORT: "Weekly",  YEAR: 2020, LY_SALES: 437, TY_SALES: 465 }
    ];
    reports:any;

    lineChartData:any;

//Labels shown on the x-axis
lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

// Define chart options
lineChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

// Define colors of chart segments
lineChartColors: Color[] = [

  { // dark grey
    backgroundColor: '#3699FF',
    borderColor: 'rgba(77,83,96,1)',
  },
  { // red
    backgroundColor: '#1BC5BD',
    borderColor: 'red',
  }
];

// Set true to show legends
lineChartLegend = true;

// Define type of chart
lineChartType = 'bar';

lineChartPlugins = [];
salesReporvalue:any;
jsonValues:any;
finalValue:any;
    constructor(public ete: ExportExcelService) {
      this.reports = "Monthly";
     }

  ngOnInit(){
    this.salesReporvalue = _.where(this.empPerformance, {REPORT: this.reports});
    var lyValue = this.salesReporvalue.map(p=>p.LY_SALES);
    var tyValue = this.salesReporvalue.map(p=>p.TY_SALES);
    this.lineChartData = [
      { data: lyValue, label: 'Last year' },
      { data: tyValue, label: 'This year' }
    ];
  }
  exportToExcel() {

    this.salesReporvalue.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row))
    })

    let reportData = {
      title: 'Sales Report-'+this.salesReporvalue[0].YEAR,
      data: this.dataForExcel,
      headers: Object.keys(this.salesReporvalue[0])
    }

    this.ete.exportExcel(reportData);
  }
  clickRepot(event){
    console.log(event.detail.value)
    this.reports = event.detail.value;
    this.salesReporvalue = _.where(this.empPerformance, {REPORT: this.reports});
    var lyValue = this.salesReporvalue.map(p=>p.LY_SALES);
    var tyValue = this.salesReporvalue.map(p=>p.TY_SALES);
    console.log(lyValue)
    console.log(tyValue)
    this.lineChartData = [
      { data: lyValue, label: 'Last year' },
      { data: tyValue, label: 'This year' }
    ];
  }
  readExcel(e){
    const wb = new Excel.Workbook();
    const reader = new FileReader()
    this.jsonValues=[];
    this.finalValue=[];
    reader.readAsArrayBuffer(e.target.files[0])
    reader.onload = () => {
      const buffer = reader.result;
      wb.xlsx.load(buffer).then(workbook => {
        workbook.eachSheet((sheet, id) => {
          sheet.eachRow((row, rowIndex) => {
              if(row.values[1] == "Weekly" || row.values[1] == "Monthly"){
                this.finalValue.push({"Report":row.values[1],"Year":row.values[2],"Ly_Sales":row.values[3],"Ty_Sales":row.values[4]});
              }
          })
          this.createExcelToJson(this.finalValue);
        })        
      })
    }
  }
  createExcelToJson(rowValues){
    console.log(rowValues);
  }
}
