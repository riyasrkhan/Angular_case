import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeedetailsPageRoutingModule } from './employeedetails-routing.module';

import { EmployeedetailsPage } from './employeedetails.page';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeedetailsPageRoutingModule,
    DataTablesModule
  ],
  declarations: [EmployeedetailsPage]
})
export class EmployeedetailsPageModule {}
