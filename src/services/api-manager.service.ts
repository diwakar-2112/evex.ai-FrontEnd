import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable()
export class ApiManager extends BaseService {

  public static readonly POST = 1;
  public static readonly GET = 2;
  public static readonly PUT = 3;
  public static readonly JSONFILE = 4;
  public static readonly FILEUPLOAD = 5;
  public static readonly FILEDOWNLOAD = 6;
  public static readonly FILEDELETE = 7;
  public static readonly CUSTOMFILEDOWNLOAD = 8;

  static readonly baseJsonUrlDev: string = '../assets/data/languageBundle.json';
  static readonly dashboard: string = '/hixapi/dashboard';
  static readonly logIn: string = '/AHCT/pingSession';
  static readonly update: string = '/hixapi/update-language-pref';

  public fileUploadProgress$ = new Subject<number>();

  constructor(http: HttpClient) {
    super(http);
  }

  fetchData(
    url: string,
    params: any,
    requestType: number,
    body: any,
    successMethod?: () => void,
    failureMethod?: () => void,
    queryParams?: string[],
    file?: File
  ): Observable<any> {
    let result: Observable<any>;

    if (requestType === ApiManager.GET) {
      result = super.makeGetRequest(url, params);
    } else if (requestType === ApiManager.POST) {
      result = super.makePostRequest(url, body, params);
    } else if (requestType === ApiManager.PUT) {
      result = super.makePutRequest(url, body, params);
    } else if (requestType === ApiManager.FILEUPLOAD) {
      result = this.makeFileRequest(url, params);
    } else if (requestType === ApiManager.FILEDOWNLOAD) {
      result = super.makePostRequest(url, body, params);
    } else if (requestType === ApiManager.CUSTOMFILEDOWNLOAD) {
      result = super.makeGetRequest(url, params);
    } else if (requestType === ApiManager.FILEDELETE) {
      result = super.makePostRequest(url, body, params);
    } else if (requestType === ApiManager.JSONFILE) {
      result = super.http().get(url);
    } else {
      throw new Error(`Unsupported request type: ${requestType}`);
    }

    return result.pipe(
      map((res: any) => {
        if (successMethod) {
          successMethod();
        }
        return res;
      }),
      catchError((error: any) => {
        if (failureMethod) {
          failureMethod();
        }
        return of(error);
      })
    );
  }

  public makeFileRequest(url: string, params: any): Observable<any> {
    return new Observable(observer => {
      const formData: FormData = new FormData();
      const xhr: XMLHttpRequest = new XMLHttpRequest();

      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          formData.append(key, params[key]);
        }
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          this.fileUploadProgress$.next(progress);
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Accept-Language', 'en-US');
      xhr.send(formData);
    });
  }
}
