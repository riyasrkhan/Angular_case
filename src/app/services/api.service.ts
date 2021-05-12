import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  baseUrl = "http://ideefinder.in/PHP/Tracking/";
  constructor(public http : HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  allEmpDetails(params:any) {
    return this.http.get(this.baseUrl+'api/insert.php?'+params);
  }
}
