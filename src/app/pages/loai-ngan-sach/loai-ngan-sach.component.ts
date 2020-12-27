import {Component, OnInit} from '@angular/core';
import {Order} from "../../share/model/order";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../share/service/api.service";
import {ToastrService} from "ngx-toastr";
import {LoaiNganSachSearch} from "../../share/model/loai-ngan-sach-search";
import {LoaiNganSach} from "../../share/model/loai-ngan-sach";
import {LoaiNganSachCreateComponent} from "./loai-ngan-sach-child/loai-ngan-sach-create/loai-ngan-sach-create.component";
import {LoaiNganSachEditComponent} from "./loai-ngan-sach-child/loai-ngan-sach-edit/loai-ngan-sach-edit.component";

@Component({
  selector: 'app-loai-ngan-sach',
  templateUrl: './loai-ngan-sach.component.html',
  styleUrls: ['./loai-ngan-sach.component.scss']
})
export class LoaiNganSachComponent implements OnInit {

  order: Order = {
    ascending: true,
    property: ''
  };
  lnsSeacrh: LoaiNganSachSearch = {
    page: 0,
    pageSize: 10,
    tenloai: '',
    orders: []
  };
  totalMoney = 0;
  lnsList: LoaiNganSach[];

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
    this.title.setTitle('Chi phí');
    this.fetch();

  }

  openCreate(): void {
    this.ngbModal.open(LoaiNganSachCreateComponent);
  }

  fetch() {
    this.apiService.post('/loai-ngan-sach/search', this.lnsSeacrh).subscribe(res => {
      this.lnsSeacrh = res;
      this.lnsList = this.lnsSeacrh.data;
    })
  }

  openEdit(lns) {
    const modelRef = this.ngbModal.open(LoaiNganSachEditComponent);
    modelRef.componentInstance.lns = lns;
  }

  onSearch() {
    this.lnsSeacrh.page = 0;
    this.fetch();
  }

  delete(id: number) {
    this.apiService.delete('/loai-ngan-sach/delete/' + id).subscribe(() => {
      this.toastr.success('Xóa thành công!');
      this.fetch();
    }, error => {
      this.toastr.error('Xóa thất bại');
    })

  }
}
