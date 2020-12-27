import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserProfileModel} from "../../../../share/model/user-profile.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {LoaiNganSach} from "../../../../share/model/loai-ngan-sach";
import {NganSach} from "../../../../share/model/ngan-sach";

@Component({
  selector: 'app-ngan-sach-edit',
  templateUrl: './ngan-sach-edit.component.html',
  styleUrls: ['./ngan-sach-edit.component.scss']
})
export class NganSachEditComponent implements OnInit {

  @Input()
  ns: NganSach;
  listLNS: LoaiNganSach[];
  nganSachE: FormGroup;
  userPro: UserProfileModel;
  constructor(
    private activeModal: NgbActiveModal,
    private title: Title,
    private api: ApiService,
    private fb: FormBuilder,
    private store: StorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.api.get('/loai-ngan-sach/all').subscribe(res=> {
      this.listLNS = res;
    })
    this.userPro = this.store.getProfileJson();
    this.nganSachE = this.fb.group({
      idLoaiNganSach: new FormControl(this.ns.idLoaiNganSach,[Validators.required]),
      loaitien: new FormControl(this.ns.loaitien,[Validators.required]),
      ngaytao: new FormControl(this.ns.ngaytao,[Validators.required]),
      vonglap: new FormControl(this.ns.vonglap,[Validators.required]),
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.nganSachE.valid){
      const cp = {
        id: this.ns.id,
        idLoaiNganSach: this.nganSachE.get('idLoaiNganSach').value,
        loaitien: this.nganSachE.get('loaitien').value,
        ngaytao: this.nganSachE.get('ngaytao').value,
        vonglap: this.nganSachE.get('vonglap').value,
      }
      this.api.put('/ngan-sach/edit', cp).subscribe(() => {
        this.api.onFilter('edit');
        this.toastr.success('Sửa thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Thêm thất bại');
      })
    }
  }

  get f(){
    return this.nganSachE.controls;
  }

}
