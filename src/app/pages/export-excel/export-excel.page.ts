import { Component, OnInit } from '@angular/core';
import { ExportExcelService } from '../../services/export-excel.service';
import * as _ from 'underscore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.page.html',
  styleUrls: ['./export-excel.page.scss'],
})
export class ExportExcelPage implements OnInit {

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
      { REPORT: "Weekly",  YEAR: 2020, LY_SALES: 456, TY_SALES: 985 },
      { REPORT: "Weekly",  YEAR: 2020, LY_SALES: 152, TY_SALES: 120 },
      { REPORT: "Weekly",  YEAR: 2020, LY_SALES: 548, TY_SALES: 355 },
      { REPORT: "Weekly",  YEAR: 2020, LY_SALES: 532, TY_SALES: 650 },
      { REPORT: "Weekly",  YEAR: 2020, LY_SALES: 437, TY_SALES: 465 }
    ];
    reports:any;
    constructor(public ete: ExportExcelService) {
      this.reports = "Monthly";
     }
    ngOnInit()
    {
      var whereArray = _.where(this.empPerformance, {REPORT: this.reports});
      var lyValue = whereArray.map(p=>p.LY_SALES);
      var tyValue = whereArray.map(p=>p.TY_SALES);
      console.log(lyValue)
      console.log(tyValue)
    }
    exportToExcel() 
    {
      this.empPerformance.forEach((row: any) => {
        this.dataForExcel.push(Object.values(row))
      })
      let reportData = {
        title: 'Sales Report-'+this.empPerformance[0].YEAR,
        data: this.dataForExcel,
        headers: Object.keys(this.empPerformance[0])
      }
  
      this.ete.exportExcel(reportData);
    }
  }
