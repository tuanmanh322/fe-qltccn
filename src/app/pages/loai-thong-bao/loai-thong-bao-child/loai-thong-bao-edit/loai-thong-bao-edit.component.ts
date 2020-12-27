import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {LoaiThongBao} from "../../../../share/model/loai-thong-bao";

@Component({
  selector: 'app-loai-thong-bao-edit',
  templateUrl: './loai-thong-bao-edit.component.html',
  styleUrls: ['./loai-thong-bao-edit.component.scss']
})
export class LoaiThongBaoEditComponent implements OnInit {
  @Input()
  ltb: LoaiThongBao;

  lTBE: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private title: Title,
    private api: ApiService,
    private fb: FormBuilder,
    private store: StorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.lTBE = this.fb.group({
      tenloaithongbao: new FormControl(this.ltb.tenloaithongbao,[Validators.required])
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.lTBE.valid){
      const lns = {
        id: this.ltb.id,
        tenloaithongbao: this.lTBE.get('tenloaithongbao').value,
      }
      this.api.put('/loai-thong-bao/edit', lns).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Sửa thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Sửa thất bại');
      })
    }
  }

  get f(){
    return this.lTBE.controls;
  }

}
