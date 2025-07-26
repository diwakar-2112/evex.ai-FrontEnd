import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'  // <-- This makes the service available app-wide
})



export class CommonService {
  private _bgColor: any;
  public getbgColor(): any {
    return this._bgColor;
  }
  setbgColor(value: any) {
    this._bgColor = value;
  }


  private _baseUrl = 'https://backend.delhimetrorail.com/api/v2/';
  public get baseUrl() {
    return this._baseUrl;
  }
  public set baseUrl(value) {
    this._baseUrl = value;
  }
  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    return this.http.get(`${this.baseUrl}en/line_list`);
  }
  getLines(value: any): Observable<any> {
    return this.http.get(`${this.baseUrl}en/station_by_line/${value}`)
  }
  getRoute(start:any,end:any):Observable<any> {
    let time = new Date().toISOString().slice(0, -1);
    return this.http.get(`${this.baseUrl}en/station_route/${start}/${end}/least-distance/${time}`)
  }
}
