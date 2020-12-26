import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserProfileModel} from "../../../../share/model/user-profile.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ngan-sach-edit',
  templateUrl: './ngan-sach-edit.component.html',
  styleUrls: ['./ngan-sach-edit.component.scss']
})
export class NganSachEditComponent implements OnInit {

  @Input()
  ns: any;

  nganSachE: FormGroup;
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
    this.nganSachE = this.fb.group({
      loaingansach: new FormControl('',[Validators.required]),
      loaitien: new FormControl('',[Validators.required]),
      mota: new FormControl('',[Validators.required]),
      sotien: new FormControl('',[Validators.required]),
    })
  }

  close(): void{
    this.activeModal.dismiss();
  }

  onCreate(){
    if (this.nganSachE.valid){
      const cp = {
        idUser: this.userPro.id,
        loaingansach: this.nganSachE.get('loaingansach').value,
        loaitien: this.nganSachE.get('loaitien').value,
        mota: this.nganSachE.get('mota').value,
        sotien: this.nganSachE.get('sotien').value,
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
    return this.nganSachE.controls;
  }

}