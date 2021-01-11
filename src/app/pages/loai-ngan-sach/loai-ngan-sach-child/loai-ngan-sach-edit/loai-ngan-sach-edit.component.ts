import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {LoaiNganSach} from "../../../../share/model/loai-ngan-sach";

@Component({
  selector: 'app-loai-ngan-sach-edit',
  templateUrl: './loai-ngan-sach-edit.component.html',
  styleUrls: ['./loai-ngan-sach-edit.component.scss']
})
export class LoaiNganSachEditComponent implements OnInit {
  @Input()
  lns: LoaiNganSach;
  isMaxHm = false;
  lnsFEE: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private title: Title,
    private api: ApiService,
    private fb: FormBuilder,
    private store: StorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.lnsFEE = this.fb.group({
      tenloaingansach: new FormControl(this.lns.tenloaingansach,[Validators.required]),
      hanmuc: new FormControl(this.lns.hanMuc,[Validators.required,Validators.pattern('[0-9]*')])
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.lnsFEE.valid && this.isMaxHm === false){
      const lns = {
        id: this.lns.id,
        tenloaingansach: this.lnsFEE.get('tenloaingansach').value,
        hanMuc: this.lnsFEE.get('hanmuc').value
      }
      this.api.put('/loai-ngan-sach/edit', lns).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Sửa thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Sửa thất bại');
      })
    }
  }
  checkHM(event){
    let hm = parseInt(event.target.value);
    if (hm > 100 || hm <= 0){
      this.toastr.warning('Hạn mức không hợp lệ!');
      this.isMaxHm =true;
    }
  }
  get f(){
    return this.lnsFEE.controls;
  }
}
