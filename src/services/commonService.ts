import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
// import { ServiceReqResModel } from "../assets/model/serviceReqRes.model";
// import { CustomerSearchReqResModel } from "../assets/model/customerSearchReqResmodel.model";

@Injectable()
export class CommonService extends BaseService {
//   private serviceModel: ServiceReqResModel = new ServiceReqResModel();
//   private orderId: number;
  public batch: any;
  public fundsBatch: any;
  public greenfieldBatchId: any;
  private gameIdsArray: any = [];
  private accessToken: any;
  public parish: any;
  public clientIp: any = "";
  public static fintechScreenName: string = "";
  public static scrollPageX: number = 0;
  public static scrollPageY: number = 0;
  public static scrollPageXAnalytics: number = 0;
  public static scrollPageYAnalytics: number = 0;
  private clientType = "WEB";
  private deviceId: any = "";
  private accessRoleData: any;
  public static apiErrorStatus: boolean = false;
  public static latitude: any = "";
  public static longitude: any = "";
  private accessMedium: any = "";
  public retailerData: any;
  public consumerData: Map<String, any> = new Map<String, any>();
  private customerSearchReqResModel: any;
  public getConsumerData(key: String) {
    return this.consumerData.get(key);
  }

  public constructor(_http: HttpClient) {
    super(_http);
  }

  public setConsumerData(key: String, value: any) {
    this.consumerData.set(key, value);
  }

  public setAccessMedium(code: any) {
    this.accessMedium = code;
    localStorage.setItem("ACCESSMEDIUM", JSON.stringify(code));
  }

  setClientIP(ipAddress: any) {
    this.clientIp = ipAddress;
  }

  getClientIP() {
    return this.clientIp;
  }


  getGameIdsArray() {
    return this.gameIdsArray;
  }

  getCustomerSearchReqResModel() {
    return this.customerSearchReqResModel;
  }
  setCustomerSearchReqResModel(model: any) {
    this.customerSearchReqResModel = model;
  }
  setAccessToken(token: any) {
    this.accessToken = token;
  }
  setClientType(clientType: string) {
    this.clientType = clientType;
  }
  getClientType() {
    return this.clientType;
  }
  setDeviceId(deviceId: any) {
    this.deviceId = deviceId;
  }
  getDeviceId() {
    return this.deviceId;
  }
  getAccessToken() {
    return this.accessToken;
  }
 


  public confirmTopDrawBetDetails(body: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
      ClientType: this.clientType,
      deviceId: this.deviceId,
    });
    const url = `api/confirm-topdraw-jm`;
    return this.regularPostRequest(url, body, headers);
  }


  // END
  regularPostRequest(url: string, formData: any, headers: HttpHeaders) {
    return super.makePostRequest(url, formData, headers).pipe(
    //   map(super.extractData),
    //   catchError((e) => {
    //     if (document.getElementById("loader")) {
    //     }
    //     if (e.status == 401 || e.status == 403) {
    //       CommonService.apiErrorStatus = true;
    //     }
    //     if (e instanceof Response && window.location.hostname !== "localhost") {
    //       window.location.reload();
    //     } else {
    //       return throwError(new Error(`${e.status} ${e.statusText}`));
    //     }
    //   })
    );
  }


  
  
}
