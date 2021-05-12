import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import *  as global  from '../global/globalservice.json';
import { DatePipe } from '@angular/common'
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  isLoading = false;
  loaderCtrl: any;
  constructor(public loadingController: LoadingController,public dp: DatePipe) { }
  logging(pagetype:any,msg:any,logtype:any){
    let myDate = new Date()
    let timeset = this.dp.transform(myDate, 'MMMM-dd-yyyy HH:mm', 'es-ES');

    console.log(timeset)
    var user = window.localStorage.getItem("username")
    global.logInfo.push({"logType":logtype,"user": user, "pageType": pagetype, "time": timeset, "message":msg});
    console.log(global.logInfo);
    // window.localStorage.setItem("","");
  }
  async loadingPresent() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  async loadingDismiss() {
    this.isLoading = false;
    this.loadingController.dismiss();
  }
}
