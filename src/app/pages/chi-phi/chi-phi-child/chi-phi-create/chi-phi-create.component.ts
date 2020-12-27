import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../share/service/storage.service";
import {UserProfileModel} from "../../../../share/model/user-profile.model";
import {ToastrService} from "ngx-toastr";
import {LoaiNganSach} from "../../../../share/model/loai-ngan-sach";

@Component({
  selector: 'app-chi-phi-create',
  templateUrl: './chi-phi-create.component.html',
  styleUrls: ['./chi-phi-create.component.scss']
})
export class ChiPhiCreateComponent implements OnInit {
  chiPhi: FormGroup;
  userPro: UserProfileModel;
  listLNS: LoaiNganSach[];
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
    this.chiPhi = this.fb.group({
      idLoaiNganSach: new FormControl('',[Validators.required]),
      loaitien: new FormControl('',[Validators.required]),
      mota: new FormControl('',[Validators.required]),
      sotien: new FormControl('',[Validators.required]),
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.chiPhi.valid){
      const cp = {
        idUser: this.userPro.id,
        idLoaiNganSach: this.chiPhi.get('idLoaiNganSach').value,
        loaitien: this.chiPhi.get('loaitien').value,
        mota: this.chiPhi.get('mota').value,
        sotien: this.chiPhi.get('sotien').value,
      }
      this.api.post('/chi-phi/add', cp).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Thêm thành công');
        this.activeModal.dismiss();
      },error =>  {
         this.toastr.error('Thêm thất bại');
      })
    }
  }

  get f(){
    return this.chiPhi.controls;
  }
}
