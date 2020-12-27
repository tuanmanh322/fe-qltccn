import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserProfileModel} from "../../../../share/model/user-profile.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {ThuNhap} from "../../../../share/model/thu-nhap";

@Component({
  selector: 'app-thu-nhap-edit',
  templateUrl: './thu-nhap-edit.component.html',
  styleUrls: ['./thu-nhap-edit.component.scss']
})
export class ThuNhapEditComponent implements OnInit {

  @Input()
  tn: ThuNhap;

  thuNhapE: FormGroup;
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
    this.thuNhapE = this.fb.group({
      kihan: new FormControl(this.tn.kihan,[Validators.required]),
      loaitien: new FormControl(this.tn.loaitien,[Validators.required]),
      mota: new FormControl(this.tn.mota,[Validators.required]),
      sotien: new FormControl(this.tn.sotien,[Validators.required]),
      ngaytao: new FormControl(this.tn.ngaytao,[Validators.required])
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.thuNhapE.valid){
      const cp = {
        id: this.tn.id,
        kihan: this.thuNhapE.get('kihan').value,
        loaitien: this.thuNhapE.get('loaitien').value,
        mota: this.thuNhapE.get('mota').value,
        sotien: this.thuNhapE.get('sotien').value,
        ngaytao: this.thuNhapE.get('ngaytao').value
      }
      this.api.put('/thu-nhap/edit', cp).subscribe(() => {
        this.api.onFilter('edit');
        this.toastr.success('Sửa thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Sửa thất bại');
      })
    }
  }

  get f(){
    return this.thuNhapE.controls;
  }
}
