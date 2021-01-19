import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";
import {ApiService} from "../../../../share/service/api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../../share/service/storage.service";
import {UserProfileModel} from "../../../../share/model/user-profile.model";
import {ToastrService} from "ngx-toastr";
import {LoaiNganSach} from "../../../../share/model/loai-ngan-sach";
import {NganSach} from "../../../../share/model/ngan-sach";
import {ViModel} from "../../../../share/model/vi.model";

@Component({
  selector: 'app-chi-phi-create',
  templateUrl: './chi-phi-create.component.html',
  styleUrls: ['./chi-phi-create.component.scss']
})
export class ChiPhiCreateComponent implements OnInit {
  @Input()
  money: any;

  chiPhi: FormGroup;
  userPro: UserProfileModel;
  listLNS: LoaiNganSach[];

  nsList: NganSach[];
  viModel: ViModel;

  isMax: boolean = false;

  ChuSo = [" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín "];
  Tien = ["", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ"];
  soTien = '';

  moneyNS = 0;

  lnsM: LoaiNganSach;
  isGo = false;
  isNavigate = false;
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
    this.api.get('/vi/detail/1').subscribe(res => {
      this.viModel = res;
    })
    this.api.get('/loai-ngan-sach/all').subscribe(res => {
      this.listLNS = res;
    })
    this.userPro = this.store.getProfileJson();
    this.chiPhi = this.fb.group({
      idLoaiNganSach: new FormControl('', [Validators.required]),
      loaitien: new FormControl('', [Validators.required]),
      mota: new FormControl('', [Validators.required]),
      sotien: new FormControl('', [Validators.required]),
      ngaytao: new FormControl('', [Validators.required]),
    })
  }

  close(): void {
    this.activeModal.dismiss();
  }

  onCreate() {
    if (this.chiPhi.valid && this.isMax === false && this.isNavigate ===  false) {
      const cp = {
        idUser: this.userPro.id,
        idLoaiNganSach: this.chiPhi.get('idLoaiNganSach').value,
        loaitien: this.chiPhi.get('loaitien').value,
        mota: this.chiPhi.get('mota').value,
        sotien: this.chiPhi.get('sotien').value,
        ngaytao: this.chiPhi.get('ngaytao').value
      }
      var monhCreate = cp.ngaytao.split('-');
      this.api.get('/ngan-sach/check-full/' + parseInt(monhCreate[1]) + '/' + parseInt(monhCreate[0])).subscribe(res => {
        this.nsList = res;
      });
      this.api.post('/chi-phi/add', cp).subscribe(() => {
        this.api.onFilter('create');
        this.toastr.success('Thêm thành công');
        this.api.sendNoti('watch');
        this.activeModal.dismiss();
      }, error => {
        this.toastr.error('Thêm thất bại');
      })

      let money = parseInt(this.viModel.money) - this.chiPhi.get('sotien').value;
      const vp = {
        id: this.viModel.id,
        idLoaiVi: this.viModel.idLoaiVi,
        money: money,
        description: this.viModel.description
      }
      this.api.put('/vi/edit', vp).subscribe(() => {

      });
    }
  }

  get f() {
    return this.chiPhi.controls;
  }

  getMoney(event) {
    if (parseInt(event.target.value) < 0){
      this.isNavigate= true;
    }
    let moneyAdd = parseInt(event.target.value) + this.money;
    let moneyInWallet = parseInt(this.viModel.money);
    this.soTien = this.api.DocTienBangChu(event.target.value);
    if (moneyAdd > moneyInWallet) {
      this.toastr.warning('Số tiền chi tiêu đã vượt quá lượng tiền trong ví');
      this.isMax = true;
    } else {
      this.isMax = false;
    }
    if (this.chiPhi.get('idLoaiNganSach').value !== null && this.chiPhi.get('idLoaiNganSach').value !== undefined && this.chiPhi.get('idLoaiNganSach').value !== ""){
      this.api.get('/ngan-sach/lns/' + this.chiPhi.get('idLoaiNganSach').value).subscribe(res=>{
        this.moneyNS = res;
        var loaiNganSachA = this.listLNS.filter(lns => lns.id === parseInt(this.chiPhi.get('idLoaiNganSach').value))[0];
        let percent =  (moneyAdd / this.moneyNS) * 100;
        if (percent > loaiNganSachA.hanMuc){
          this.toastr.warning('Bạn đã vượt quá hạn mức cho phép!');
        }
      })
    }

  }
}
