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
      loaithuNHap: new FormControl('',[Validators.required]),
      loaitien: new FormControl('',[Validators.required]),
      mota: new FormControl('',[Validators.required]),
      sotien: new FormControl('',[Validators.required]),
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.thuNHap.valid){
      const cp = {
        idUser: this.userPro.id,
        loaithuNHap: this.thuNHap.get('loaithuNHap').value,
        loaitien: this.thuNHap.get('loaitien').value,
        mota: this.thuNHap.get('mota').value,
        sotien: this.thuNHap.get('sotien').value,
      }
      this.api.post('/chi-phi/add', cp).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Thêm thành công');
      },error =>  {
        this.toastr.error('Thêm thất bại');
      })
    }
  }

  get f(){
    return this.thuNHap.controls;
  }

}
