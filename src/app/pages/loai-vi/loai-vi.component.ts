import {Component, OnInit} from '@angular/core';
import {Order} from "../../share/model/order";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../share/service/api.service";
import {ToastrService} from "ngx-toastr";
import {LoaiViSearch} from "../../share/model/loai-vi-search";
import {LoaiVi} from "../../share/model/loai-vi";
import {LoaiViEditComponent} from "./loai-vi-child/loai-vi-edit/loai-vi-edit.component";
import {LoaiViCreateComponent} from "./loai-vi-child/loai-vi-create/loai-vi-create.component";

@Component({
  selector: 'app-loai-vi',
  templateUrl: './loai-vi.component.html',
  styleUrls: ['./loai-vi.component.scss']
})
export class LoaiViComponent implements OnInit {

  order: Order = {
    ascending: true,
    property: ''
  };
  lvs: LoaiViSearch = {
    page: 0,
    pageSize: 10,
    tenVi: '',
    orders: []
  };
  listLV: LoaiVi[];

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
    this.title.setTitle('Loại ví');
    this.fetch();

  }

  openCreate(): void {
    this.ngbModal.open(LoaiViCreateComponent);
  }

  fetch() {
    this.apiService.post('/loai-vi/search', this.lvs).subscribe(res => {
      this.lvs = res;
      this.listLV = this.lvs.data;
    })
  }

  openEdit(lv) {
    const modelRef = this.ngbModal.open(LoaiViEditComponent);
    modelRef.componentInstance.lv = lv;
  }

  onSearch() {
    this.lvs.page = 0;
    this.fetch();
  }

  delete(id: number) {
    this.apiService.delete('/loai-vi/delete/' + id).subscribe(() => {
      this.toastr.success('Xóa thành công!');
      this.fetch();
    }, error => {
      this.toastr.error('Xóa thất bại');
    })

  }


}
