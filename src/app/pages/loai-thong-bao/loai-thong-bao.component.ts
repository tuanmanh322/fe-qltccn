import {Component, OnInit} from '@angular/core';
import {Order} from "../../share/model/order";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../share/service/api.service";
import {ToastrService} from "ngx-toastr";
import {LoaiThongBaoSearch} from "../../share/model/loai-thong-bao-search";
import {LoaiThongBao} from "../../share/model/loai-thong-bao";
import {LoaiThongBaoEditComponent} from "./loai-thong-bao-child/loai-thong-bao-edit/loai-thong-bao-edit.component";
import {LoaiThongBaoCreateComponent} from "./loai-thong-bao-child/loai-thong-bao-create/loai-thong-bao-create.component";

@Component({
  selector: 'app-loai-thong-bao',
  templateUrl: './loai-thong-bao.component.html',
  styleUrls: ['./loai-thong-bao.component.scss']
})
export class LoaiThongBaoComponent implements OnInit {

  order: Order = {
    ascending: true,
    property: ''
  };
  ltbS: LoaiThongBaoSearch = {
    page: 0,
    pageSize: 10,
    tenloai: '',
    orders: []
  };
  listLTB: LoaiThongBao[];

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
    this.ngbModal.open(LoaiThongBaoCreateComponent);
  }

  fetch() {
    this.apiService.post('/loai-thong-bao/search', this.ltbS).subscribe(res => {
      this.ltbS = res;
      this.listLTB = this.ltbS.data;
    })
  }

  openEdit(ltb) {
    const modelRef = this.ngbModal.open(LoaiThongBaoEditComponent);
    modelRef.componentInstance.ltb = ltb;
  }

  onSearch() {
    this.ltbS.page = 0;
    this.fetch();
  }

  delete(id: number) {
    this.apiService.delete('/loai-thong-bao/delete/' + id).subscribe(() => {
      this.toastr.success('Xóa thành công!');
      this.fetch();
    }, error => {
      this.toastr.error('Xóa thất bại');
    })

  }

}
