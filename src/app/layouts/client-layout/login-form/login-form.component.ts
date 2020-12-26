import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../share/service/api.service";
import {AuthService} from "../../../share/service/auth.service";
import {Title} from "@angular/platform-browser";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {EventManagement} from "../../../share/service/event.management";
import {StorageService} from "../../../share/service/storage.service";
import {UserProfileModel} from "../../../share/model/user-profile.model";
import {LOGIN_SUCCESS} from "../../../share/model/qlttcn.constant";
import {LoginModel} from "../../../share/model/login.model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  userProfile: UserProfileModel;
  constructor(
    private authService: AuthService,
    private title: Title,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private eventmanager: EventManagement,
    private storageSerivce: StorageService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()){
      this.toastr.error('Bạn đã đăng nhập vào hệ thống rồi');
      this.router.navigate(['qltccn']);
      return;
    }
    this.title.setTitle('Đăng nhập');
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  onLogin(): void {

    const login: LoginModel = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
      rememberMe: false
    };
    this.authService.login(login).subscribe(res => {
        const token = res.headers.get('Authorization');
        // this.tokenM = res.body;
        this.storageSerivce.saveToken(token);
        this.storageSerivce.saveUser(login.username);
        this.toastr.success('Đăng nhập thành công!');
        this.apiService.onFilter('Login');
        this.router.navigate(['qltccn']);
        setTimeout(() => {
          this.authService.identity(true).then(() => {
            this.eventmanager.broadcast(LOGIN_SUCCESS);
            this.authService.entranceUrl();

          });
        }, 1500)
      }, error => {
        this.loginForm.get('password').reset();
        if (error.status === 401) {
          if (error.error) {
            this.toastr.error(`Lỗi ${error.error.message}`);
          } else {
            this.toastr.error('Bạn không có quyền truy cập');
          }
        }
      }
    );
  }
  get f(){
    return this.loginForm.controls;
  }
}
