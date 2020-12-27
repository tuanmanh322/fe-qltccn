import {Component, OnInit} from '@angular/core';
import {ChiPhiCreateComponent} from '../chi-phi/chi-phi-child/chi-phi-create/chi-phi-create.component';
import {ChiPhiEditComponent} from '../chi-phi/chi-phi-child/chi-phi-edit/chi-phi-edit.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../share/service/api.service';
import {NganSachEditComponent} from './ngan-sach-child/ngan-sach-edit/ngan-sach-edit.component';
import {NganSachCreateComponent} from './ngan-sach-child/ngan-sach-create/ngan-sach-create.component';
import {NganSachSearch} from '../../share/model/ngan-sach-search';
import {Order} from '../../share/model/order';
import {NganSach} from '../../share/model/ngan-sach';
import {ToastrService} from 'ngx-toastr';
import {LoaiNganSach} from "../../share/model/loai-ngan-sach";

@Component({
  selector: 'app-ngan-sach',
  templateUrl: './ngan-sach.component.html',
  styleUrls: ['./ngan-sach.component.scss']
})
export class NganSachComponent implements OnInit {
  nsSearch: NganSachSearch = {
    page: 0,
    pageSize: 10,
    tenloaingansach: '',
    orders: []
  };
  order: Order = {
    property: '',
    ascending: true
  };
  listLNS: LoaiNganSach[];

  listNS: NganSach[];
  listYear = [];
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
    const now = new Date().getUTCFullYear();
    this.listYear = Array(now - (now - 20)).fill('').map((v, idx) => now - idx) as Array<number>;

    this.title.setTitle('Ngân sách');

    this.fetch();
  }

  openCreate(): void {
    this.ngbModal.open(NganSachCreateComponent);
  }

  fetch() {
    this.apiService.post('/ngan-sach/search', this.nsSearch).subscribe(res => {
      this.nsSearch = res;
      this.listNS = this.nsSearch.data;
    })
  }

  openEdit(ns) {
    const modelRef = this.ngbModal.open(NganSachEditComponent);
    modelRef.componentInstance.ns = ns;
  }

  onSearch() {
    this.nsSearch.page = 0;
    this.fetch();
  }

  delete(id: number): void {
    this.apiService.delete('/ngan-sach/delete/' + id).subscribe(() => {
      this.toar.success('Xóa thành công');
      this.fetch();
    }, error => {
      this.toar.error('Xóa thất bại');
    })
  }
  checkTime(event){
    this.nsSearch.thang = event.target.value;
    this.fetch();
  }

  checkTimeY(event){
    this.nsSearch.year = event.target.value;
    this.fetch();
  }
}
