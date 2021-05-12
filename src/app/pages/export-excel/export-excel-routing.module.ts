import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportExcelPage } from './export-excel.page';

const routes: Routes = [
  {
    path: '',
    component: ExportExcelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExportExcelPageRoutingModule {}
