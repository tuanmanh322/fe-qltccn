import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {UserProfileModel} from "../../../../share/model/user-profile.model";

@Component({
  selector: 'app-loai-ngan-sach-create',
  templateUrl: './loai-ngan-sach-create.component.html',
  styleUrls: ['./loai-ngan-sach-create.component.scss']
})
export class LoaiNganSachCreateComponent implements OnInit {
  userPro: UserProfileModel;
  lnsF: FormGroup;
  isMaxHm = false;
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
    this.lnsF = this.fb.group({
      tenloaingansach: new FormControl('',[Validators.required]),
      hanmuc: new FormControl('',[Validators.required]),
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.lnsF.valid && !this.isMaxHm){
      const lns = {
        tenloaingansach: this.lnsF.get('tenloaingansach').value,
        idUser: this.userPro.id,
        hanMuc: this.lnsF.get('hanmuc').value
      }
      this.api.post('/loai-ngan-sach/add', lns).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Thêm thành công');
        this.activeModal.dismiss();
      },error =>  {
        this.toastr.error('Thêm thất bại');
      })
    }
  }

  get f(){
    return this.lnsF.controls;
  }

  checkHMC(event){
    let hm = parseInt(event.target.value);
    if (hm > 100 || hm <= 0){
      this.toastr.warning('Hạn mức không hợp lệ!');
      this.isMaxHm = true;
    }
  }
}
