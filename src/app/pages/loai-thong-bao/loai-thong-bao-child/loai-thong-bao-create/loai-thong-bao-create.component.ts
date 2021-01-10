import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {UserProfileModel} from "../../../../share/model/user-profile.model";

@Component({
  selector: 'app-loai-thong-bao-create',
  templateUrl: './loai-thong-bao-create.component.html',
  styleUrls: ['./loai-thong-bao-create.component.scss']
})
export class LoaiThongBaoCreateComponent implements OnInit {
  userPRO: UserProfileModel;
  lTB: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private title: Title,
    private api: ApiService,
    private fb: FormBuilder,
    private store: StorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userPRO = this.store.getProfileJson();
    this.lTB = this.fb.group({
      tenloaithongbao: new FormControl('',[Validators.required])
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.lTB.valid){
      const lns = {
        tenloaithongbao: this.lTB.get('tenloaithongbao').value,
        idUser: this.userPRO.id
      }
      this.api.post('/loai-thong-bao/add', lns).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Thêm thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Thêm thất bại');
      })
    }
  }

  get f(){
    return this.lTB.controls;
  }


}
