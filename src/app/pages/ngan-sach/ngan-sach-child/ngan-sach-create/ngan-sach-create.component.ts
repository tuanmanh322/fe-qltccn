import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserProfileModel} from "../../../../share/model/user-profile.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {LoaiNganSach} from "../../../../share/model/loai-ngan-sach";

@Component({
  selector: 'app-ngan-sach-create',
  templateUrl: './ngan-sach-create.component.html',
  styleUrls: ['./ngan-sach-create.component.scss']
})
export class NganSachCreateComponent implements OnInit {
  listLNS: LoaiNganSach[];
  nganSach: FormGroup;
  userPro: UserProfileModel;

  isNavigate= false;
  money = '';
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
    this.nganSach = this.fb.group({
      idLoaiNganSach: new FormControl('',[Validators.required]),
      loaitien: new FormControl('',[Validators.required]),
      ngaytao: new FormControl('',[Validators.required]),
      vonglap: new FormControl('',[Validators.required]),
      sotien: new FormControl('',[Validators.required]),

    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.nganSach.valid && this.isNavigate === false){
      const cp = {
        idUser: this.userPro.id,
        idLoaiNganSach: this.nganSach.get('idLoaiNganSach').value,
        loaitien: this.nganSach.get('loaitien').value,
        ngaytao: this.nganSach.get('ngaytao').value,
        vonglap: this.nganSach.get('vonglap').value,
        sotien: this.nganSach.get('sotien').value,

      }
      this.api.post('/ngan-sach/add', cp).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Thêm thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Thêm thất bại');
      })
    }
  }

  get f(){
    return this.nganSach.controls;
  }

  getMoney(event){
    let mo = parseInt(event.target.value);
    if (mo < 0){
      this.isNavigate = true;
    }else {
      this.isNavigate = false;
    }
    this.money = this.api.DocTienBangChu(mo);
  }
}
