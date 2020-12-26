import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public $filter: Subject<any> = new Subject<any>();

  public sendParams: Subject<any> = new Subject<any>();
  constructor(
    private http: HttpClient
  ) {
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api}${path}`, {params});
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api}${path}`, body);
  }

  put(path: string, body: Object = {}): Observable<any>{
    return  this.http.put(`${environment.api}${path}`, body);
  }

  delete(path: string): Observable<any>{
    return  this.http.delete(`${environment.api}${path}`);
  }

  onFilter(title: string){
    this.$filter.next(title);
  }

  onLoad():Observable<any>{
    return  this.$filter.asObservable();
  }

  sendPara(para: string){
    this.sendParams.next(para);
  }

  getParams():Observable<any>{
    return  this.sendParams.asObservable();
  }
}
