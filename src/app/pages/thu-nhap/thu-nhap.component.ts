import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../share/service/api.service';
import {ChiPhiCreateComponent} from '../chi-phi/chi-phi-child/chi-phi-create/chi-phi-create.component';
import {ChiPhiEditComponent} from '../chi-phi/chi-phi-child/chi-phi-edit/chi-phi-edit.component';
import {ThuNhapEditComponent} from './thu-nhap-child/thu-nhap-edit/thu-nhap-edit.component';
import {ThuNhapCreateComponent} from './thu-nhap-child/thu-nhap-create/thu-nhap-create.component';
import {ThuNhapSearch} from '../../share/model/thu-nhap-search';
import {ThuNhap} from '../../share/model/thu-nhap';
import {Order} from '../../share/model/order';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-thu-nhap',
  templateUrl: './thu-nhap.component.html',
  styleUrls: ['./thu-nhap.component.scss']
})
export class ThuNhapComponent implements OnInit {
  tnSearch: ThuNhapSearch = {
    page: 0,
    pageSize: 10,
    orders: [],
    mota: ''
  };

  listTN: ThuNhap[];

  order: Order = {
    ascending: true,
    property: ''
  };
  totalTN = 0 ;
  constructor(private ngbModal: NgbModal,
              private title: Title,
              private apiService: ApiService,
              private toar: ToastrService
  ) {
    this.apiService.onLoad().subscribe(() => {
      this.fetch();
    })
  }

  ngOnInit(): void {
    this.title.setTitle('Thu nhập');

  }

  openCreate(): void {
    this.ngbModal.open(ThuNhapCreateComponent);
  }

  fetch() {
    this.apiService.post('/thu-nhap/search', this.tnSearch).subscribe(res => {
       this.tnSearch = res;
       this.listTN = this.tnSearch.data;
       this.listTN.map(tn => {
         // tslint:disable-next-line:radix
         this.totalTN += parseInt(tn.sotien);
       })
    })
  }

  openEdit(ns) {
    const modelRef = this.ngbModal.open(ThuNhapEditComponent);
    modelRef.componentInstance.ns = ns;
  }
  onSearch() {
     this.tnSearch.page = 0;
     this.fetch();
  }

  delete(id: number):void{
    this.apiService.delete('/thu-nhap/delete/'+ id).subscribe(() => {
      this.toar.success('Xóa thành công');
      this.fetch();
    },error =>  {
      this.toar.error('Xóa thất bại');
    })
  }

}
