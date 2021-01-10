import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserProfileModel} from "../../../share/model/user-profile.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../share/service/api.service";
import {StorageService} from "../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {LoaiVi} from "../../../share/model/loai-vi";
import {ViModel} from "../../../share/model/vi.model";

@Component({
  selector: 'app-vi-user',
  templateUrl: './vi-user.component.html',
  styleUrls: ['./vi-user.component.scss']
})
export class ViUserComponent implements OnInit {
  @Input()
  tab: number;


  @Input()
  viModel: ViModel;
  vuF: FormGroup;
  userPro: UserProfileModel;
  listLV: LoaiVi;
  tenVi = '';
  money = '';
  constructor(
    private activeModal: NgbActiveModal,
    private title: Title,
    private api: ApiService,
    private fb: FormBuilder,
    private store: StorageService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    if (this.tab === 1) {
      this.tenVi = 'Ví thông dụng';
    } else {
      this.tenVi = 'Ví tiết kiệm';
    }
    this.vuF = this.fb.group({
      money: new FormControl(this.viModel.money, [Validators.required]),
      description: new FormControl(this.viModel.description, [Validators.required]),
    })
    this.userPro = this.store.getProfileJson();
  }

  close(): void {
    this.activeModal.dismiss();
  }

  onCreate() {
    if (this.vuF.valid) {
      const cp = {
        id: this.viModel.id,
        idLoaiVi: this.viModel.idLoaiVi,
        money: this.vuF.get('money').value,
        description: this.vuF.get('description').value
      }
      this.api.put('/vi/edit', cp).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Cập nhật thành công');
        this.activeModal.dismiss();
      }, error => {
        this.toastr.error('Cập nhật thất bại');
      })
    }
  }

  get f() {
    return this.vuF.controls;
  }
  getMoney(event){
   this.money = this.api.DocTienBangChu(event.target.value);
  }

}
