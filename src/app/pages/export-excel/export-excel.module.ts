import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExportExcelPageRoutingModule } from './export-excel-routing.module';

import { ExportExcelPage } from './export-excel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExportExcelPageRoutingModule
  ],
  declarations: [ExportExcelPage]
})
export class ExportExcelPageModule {}
