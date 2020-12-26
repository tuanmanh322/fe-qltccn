import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../share/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {UserProfileModel} from "../../../../share/model/user-profile.model";

@Component({
  selector: 'app-chi-phi-edit',
  templateUrl: './chi-phi-edit.component.html',
  styleUrls: ['./chi-phi-edit.component.scss']
})
export class ChiPhiEditComponent implements OnInit {
  @Input()
  cp: any;

  chiPhiE: FormGroup;
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
    this.chiPhiE = this.fb.group({
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
    if (this.chiPhiE.valid){
      const cp = {
        idUser: this.userPro.id,
        loaingansach: this.chiPhiE.get('loaingansach').value,
        loaitien: this.chiPhiE.get('loaitien').value,
        mota: this.chiPhiE.get('mota').value,
        sotien: this.chiPhiE.get('sotien').value,
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
    return this.chiPhiE.controls;
  }
}
