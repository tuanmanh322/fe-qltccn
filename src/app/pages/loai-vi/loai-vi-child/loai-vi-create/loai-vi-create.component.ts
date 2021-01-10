import { Component, OnInit } from '@angular/core';
import {UserProfileModel} from "../../../../share/model/user-profile.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-loai-vi-create',
  templateUrl: './loai-vi-create.component.html',
  styleUrls: ['./loai-vi-create.component.scss']
})
export class LoaiViCreateComponent implements OnInit {
  userPRO: UserProfileModel;
  lvF: FormGroup;
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
    this.lvF = this.fb.group({
      tenVi: new FormControl('',[Validators.required])
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.lvF.valid){
      const lns = {
        tenVi: this.lvF.get('tenVi').value,
        idUser: this.userPRO.id
      }
      this.api.post('/loai-vi/add', lns).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Thêm thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Thêm thất bại');
      })
    }
  }

  get f(){
    return this.lvF.controls;
  }

}
