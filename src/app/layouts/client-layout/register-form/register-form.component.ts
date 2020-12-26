import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../share/service/api.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  userForm: FormGroup;
  isNotMatch = false;
  constructor(
    private title: Title,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Đăng ký');
    this.userForm = this.fb.group({
      diachi: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      ngaysinh: new FormControl('', [Validators.required]),
      nghenghiep: new FormControl('', [Validators.required]),
      tenkhachhang: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    if (this.userForm.valid && this.isNotMatch === false) {
      const userAdd = {
        email: this.userForm.get('email').value,
        diachi: this.userForm.get('diachi').value,
        username: this.userForm.get('username').value,
        pass: this.userForm.get('password').value,
        ngaysinh: this.userForm.get('ngaysinh').value,
        tenkhachhang: this.userForm.get('tenkhachhang').value,
        nghenghiep: this.userForm.get('nghenghiep').value,
      };
      this.apiService.post('/user/register', userAdd).subscribe(() => {
        this.toastr.success('Đăng ký thành công!');
        this.router.navigate(['/login']);
        this.userForm.reset();
      });
    }
  }

}
