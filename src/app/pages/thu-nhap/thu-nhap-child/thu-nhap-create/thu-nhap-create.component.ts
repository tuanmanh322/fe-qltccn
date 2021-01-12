import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserProfileModel} from "../../../../share/model/user-profile.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-thu-nhap-create',
  templateUrl: './thu-nhap-create.component.html',
  styleUrls: ['./thu-nhap-create.component.scss']
})
export class ThuNhapCreateComponent implements OnInit {

  thuNHap: FormGroup;
  userPro: UserProfileModel;
  money = '';
  isNavigate = false;
  constructor(
    private activeModal: NgbActiveModal,
    private title: Title,
    private api: ApiService,
    private fb: FormBuilder,
    private store: StorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userPro = this.store.getProfileJson();
    this.thuNHap = this.fb.group({
      kihan: new FormControl('',[Validators.required]),
      loaitien: new FormControl('',[Validators.required]),
      mota: new FormControl('',[Validators.required]),
      sotien: new FormControl('',[Validators.required]),
      ngaytao: new FormControl('',[Validators.required])
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.thuNHap.valid && this.isNavigate === false){
      const cp = {
        idUser: this.userPro.id,
        kihan: this.thuNHap.get('kihan').value,
        loaitien: this.thuNHap.get('loaitien').value,
        mota: this.thuNHap.get('mota').value,
        sotien: this.thuNHap.get('sotien').value,
        ngaytao: this.thuNHap.get('ngaytao').value
      }
      this.api.post('/thu-nhap/add', cp).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Thêm thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Thêm thất bại');
      })
    }
  }

  get f(){
    return this.thuNHap.controls;
  }

  getMoney(event){
    let mo = parseInt(event.target.value);
    this.money = this.api.DocTienBangChu(mo);
    if (mo<0){
      this.isNavigate = true;
    }else {
      this.isNavigate = false;
    }
  }
}
