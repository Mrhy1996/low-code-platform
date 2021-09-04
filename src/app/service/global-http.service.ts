import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalHttpService {
  private noInterHttp: HttpClient;

  constructor(private httpclient: HttpClient, private handler: HttpBackend) {
    this.noInterHttp = new HttpClient(handler);
  }

  //  读取本地json
  getLocalJson(path: any): Observable<any> {
    return this.noInterHttp.get(path);
  }

  //  服务器的get方法没有拦截器，登录使用；


  //  没有拦截器的服务器post调用
  // postDataNoInterceptor(url: string, body?: any, param?: any): Promise<any> {
  //   const header = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return new Promise<any>((resolve, reject) => {
  //     this.noInterHttp
  //       .post(this.apiBase + url, body, {
  //         headers: header,
  //         withCredentials: true,
  //         params: param,
  //       })
  //       .subscribe(
  //         (data) => {
  //           resolve(data);
  //         },
  //         (error) => {
  //           console.log(error);
  //           reject(error);
  //         }
  //       );
  //   });
  // }

  //  服务器的post调用
  postData(url: string, body?: any, params?: any): Promise<any> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return new Promise<any>((resolve, reject) => {
      this.httpclient
        .post( url, body, {
          headers: header,
          withCredentials: true,
          params
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
    });
  }

  getData(url:any): Promise<any> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return new Promise<any>((resolve, reject) => {
      this.httpclient
        .get( url, {headers: header, withCredentials: true})
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
    });
  }

  // download 下载文件
  downloadFile(downloadurl:any, param:any): Promise<any> {
    const requesturl =downloadurl;
    const body = param;
    // console.log(JSON.parse(tempParam));
    const uA = window.navigator.userAgent;
    // tslint:disable-next-line:max-line-length
    const isIE =
      /msie\s|trident\/|edge\//i.test(uA) &&
      (
        'uniqueID' in document ||
        'documentMode' in document ||
        'ActiveXObject' in window ||
        'MSInputMethodContext' in window
      );

    return new Promise<any>((resolve, reject) => {
      this.httpclient
        .post(requesturl, body, {
          // headers: headers,
          withCredentials: true,
          observe: 'response',
          responseType: 'blob',
        })
        .subscribe(
          (res:any) => {
            const filenamecontent = res.headers.get('Content-disposition');
            if (
              filenamecontent === '' ||
              filenamecontent === null ||
              filenamecontent.indexOf(';') === -1
            ) {
              alert('导出失败');
              return res;
            }
            let fileName = filenamecontent.split(';')[1].split('filename=')[1];
            fileName = decodeURIComponent(fileName);
            // const blob = new Blob([res.body], {type: 'application/vnd.ms-excel'});
            const blob1 = new Blob([res.body], {
              type: 'application/vnd.ms-exce',
            });
            // const blob = res.blob();
            const objectUrl = URL.createObjectURL(blob1);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display:none');
            a.setAttribute('href', objectUrl);
            a.setAttribute('download', fileName);
            a.setAttribute('id', 'download');
            a.setAttribute('target', '_blank');
            if (isIE) {
              // 兼容IE11无法触发下载的问题
              navigator.msSaveBlob(blob1, fileName);
            } else {
              a.click();
            }
            // tslint:disable-next-line:only-arrow-functions
            a.addEventListener('click', function () {
              URL.revokeObjectURL(objectUrl);
              document.getElementById('download')?.remove();
            });
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
