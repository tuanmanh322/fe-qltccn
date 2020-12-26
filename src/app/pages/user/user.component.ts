import {Component, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../share/service/auth.service";
import {ApiService} from "../../share/service/api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UserProfileModel} from "../../share/model/user-profile.model";
import {StorageService} from "../../share/service/storage.service";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  userPro: UserProfileModel;
  formUser: FormGroup;

  constructor(
    private title: Title,
    private apiService: ApiService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private storage: StorageService
  ) {
  }

  ngOnInit() {
    this.title.setTitle('Trang cá nhân');
    this.userPro = this.storage.getProfileJson();
    this.formUser = this.fb.group({
      diachi: new FormControl(this.userPro.diachi, [Validators.required]),
      email: new FormControl(this.userPro.email, [Validators.required]),
      ngaysinh: new FormControl(this.userPro.ngaysinh, [Validators.required]),
      nghenghiep: new FormControl(this.userPro.nghenghiep, [Validators.required]),
      tenkhachhang: new FormControl(this.userPro.tenkhachhang, [Validators.required]),
    })
  }

  edit(): void {
    if (this.formUser.valid) {
      this.apiService.put('/user/edit-profile', this.formUser.value).subscribe(res => {
        this.userPro = res;
        this.storage.editProfileJson(this.userPro);
        this.toastr.success('Cập nhật thành công');
      });
    }
  }

  get f() {
    return this.formUser.controls;
  }
}
