import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../share/service/api.service';
import {ChiPhiCreateComponent} from './chi-phi-child/chi-phi-create/chi-phi-create.component';
import {ChiPhiEditComponent} from './chi-phi-child/chi-phi-edit/chi-phi-edit.component';
import {ChiPhiSearch} from '../../share/model/chi-phi-search';
import {Order} from '../../share/model/order';
import {ChiPhi} from '../../share/model/chi-phi';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-chi-phi',
  templateUrl: './chi-phi.component.html',
  styleUrls: ['./chi-phi.component.scss']
})
export class ChiPhiComponent implements OnInit {
  order: Order = {
    ascending: true,
    property: ''
  };
  cpSearch: ChiPhiSearch = {
    page: 0,
    pageSize: 10,
    tenloaingansach: '',
    orders: [],
    thang: '',
    year: ''
  };
  totalMoney = 0;
  cpList: ChiPhi[];
  listYear =[];
  constructor(
    private ngbModal: NgbModal,
    private title: Title,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {
    this.apiService.onLoad().subscribe(() => {
      this.fetch();
    })
  }

  ngOnInit(): void {
    const now = new Date().getUTCFullYear();
    this.listYear = Array(now - (now - 20)).fill('').map((v, idx) => now - idx) as Array<number>;

    this.title.setTitle('Chi phí');
    this.fetch();

  }

  openCreate(): void {
    this.ngbModal.open(ChiPhiCreateComponent);
  }

  fetch() {

    this.totalMoney = 0;
    this.apiService.post('/chi-phi/search', this.cpSearch).subscribe(res => {
      this.cpSearch = res;
      this.cpList = this.cpSearch.data;
      this.cpList.map(cp => {
        // tslint:disable-next-line:radix
        this.totalMoney = this.totalMoney + parseInt(cp.sotien);
      })
    })
  }

  openEdit(cp) {
    const modelRef = this.ngbModal.open(ChiPhiEditComponent);
    modelRef.componentInstance.cp = cp;
  }

  onSearch(){
    this.cpSearch.page = 0;
    this.fetch();
  }

  delete(id: number){
    this.apiService.delete('/chi-phi/delete/' + id).subscribe(() => {
      this.toastr.success('Xóa thành công!');
      this.fetch();
    },error =>  {
      this.toastr.error('Xóa thất bại');
    })
  }
  checkTime(event){
    this.cpSearch.thang = event.target.value;
    this.fetch();
  }

  checkTimeY(event){
    this.cpSearch.year = event.target.value;
    this.fetch();
  }
}
