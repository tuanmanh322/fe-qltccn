import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public $filter: Subject<any> = new Subject<any>();

  ChuSo = [" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín "];
  Tien = ["", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ"];

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

  DocTienBangChu(SoTien: number){
    var lan=0;
    var i=0;
    var so=0;
    var KetQua="";
    var tmp="";
    var ViTri = new Array();
    if(SoTien<0) return "Số tiền âm !";
    if(SoTien==0) return "Không đồng !";
    if(SoTien>0)
    {
      so=SoTien;
    }
    else
    {
      so = -SoTien;
    }
    if (SoTien > 8999999999999999)
    {
      //SoTien = 0;
      return "Số quá lớn!";
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if(isNaN(ViTri[5]))
      ViTri[5] = "0";
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    if(isNaN(ViTri[4]))
      ViTri[4] = "0";
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    if(isNaN(ViTri[3]))
      ViTri[3] = "0";
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(String(so / 1000000));
    if(isNaN(ViTri[2]))
      ViTri[2] = "0";
    ViTri[1] = parseInt(String((so % 1000000) / 1000));
    if(isNaN(ViTri[1]))
      ViTri[1] = "0";
    ViTri[0] = parseInt(String(so % 1000));
    if(isNaN(ViTri[0]))
      ViTri[0] = "0";
    if (ViTri[5] > 0)
    {
      lan = 5;
    }
    else if (ViTri[4] > 0)
    {
      lan = 4;
    }
    else if (ViTri[3] > 0)
    {
      lan = 3;
    }
    else if (ViTri[2] > 0)
    {
      lan = 2;
    }
    else if (ViTri[1] > 0)
    {
      lan = 1;
    }
    else
    {
      lan = 0;
    }
    for (i = lan; i >= 0; i--)
    {
      tmp = this.DocSo3ChuSo(ViTri[i]);
      KetQua += tmp;
      if (ViTri[i] > 0) KetQua += this.Tien[i];
      if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
    }
    if (KetQua.substring(KetQua.length - 1) == ',')
    {
      KetQua = KetQua.substring(0, KetQua.length - 1);
    }
    KetQua = KetQua.substring(1,2).toUpperCase()+ KetQua.substring(2);
    return KetQua + ' đồng';//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
  }
  DocSo3ChuSo(soTien: number) {
    var tram;
    var chuc;
    var donvi;
    var KetQua = "";
    tram = parseInt(String(soTien / 100));
    chuc = parseInt(String((soTien % 100) / 10));
    donvi = soTien % 10;
    if (tram == 0 && chuc == 0 && donvi == 0) return "";
    if (tram != 0) {
      KetQua += this.ChuSo[tram] + " trăm ";
      if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
    }
    if ((chuc != 0) && (chuc != 1)) {
      KetQua += this.ChuSo[chuc] + " mươi";
      if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
    }

    if (chuc == 1) KetQua += " mười ";
    switch (donvi) {
      case 1:
        if ((chuc != 0) && (chuc != 1)) {
          KetQua += " mốt ";
        } else {
          KetQua += this.ChuSo[donvi];
        }
        break;
      case 5:
        if (chuc == 0) {
          KetQua += this.ChuSo[donvi];
        } else {
          KetQua += " lăm ";
        }
        break;
      default:
        if (donvi != 0) {
          KetQua += this.ChuSo[donvi];
        }
        break;
    }
    return KetQua;
  }

  totalDayInMonth(year: number, month: number): number{
    return new Date(year, month, 0).getDate();
  }

}
