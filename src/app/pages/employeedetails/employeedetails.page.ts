import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClient,HttpParams} from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import *  as global  from '../../global/globalservice.json';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.page.html',
  styleUrls: ['./employeedetails.page.scss'],
})
export class EmployeedetailsPage implements OnInit {
  dtOptions: DataTables.Settings = {};
  allempdetails:any;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(public api:ApiService,public loadingController: LoadingController) { }

  ngOnInit() {
    this.getAllEmpdata();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthChange: false
    };
    // this.allempdetails = global.employeedetails;
    // this.dtTrigger.next();
  }
  getAllEmpdata(){
    // this.showLoader();
      const params = new HttpParams({
			fromObject: {
				action: "displayfeedback",
				User_Type: 'Participate'
			}});
		  this.api.allEmpDetails(params).subscribe((res: any) => {
			console.log(res);
			if(res.status=="success"){
        // this.hideLoader();
        this.allempdetails = global.employeedetails//res.data
        this.dtTrigger.next();
			}else{
        // this.hideLoader();
			}
		  });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  refresh(){
    this.showLoader();
    this.getAllEmpdata();
  }
    // Show the loader for infinite time
    showLoader() {

      this.loadingController.create({
        message: 'Please wait...'
      }).then((res) => {
        res.present();
      });
  
    }
  
    // Hide the loader if already created otherwise return error
    hideLoader() {
  
      this.loadingController.dismiss().then((res) => {
        console.log('Loading dismissed!', res);
      }).catch((error) => {
        console.log('error', error);
      });
  
    }

}
