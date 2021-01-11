import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {UserProfileModel} from "../../share/model/user-profile.model";
import {StorageService} from "../../share/service/storage.service";

@Component({
  selector: 'app-notification-always',
  templateUrl: './notification-always.component.html',
  styleUrls: ['./notification-always.component.scss']
})
export class NotificationAlwaysComponent implements OnInit {
  title = '';
  userModel: UserProfileModel;
  constructor(
    public  activeModal: NgbActiveModal,
    private router: Router,
    private storage: StorageService
  ) {
  }

  ngOnInit(): void {
    this.userModel = this.storage.getProfileJson();
    let a = Math.floor(Math.random() * 8);
    switch (a) {
      case 0:
      case 1:
        this.title = 'Ngày hôm nay bạn chưa cho chúng tôi biết bạn đang tiêu tiền =))';
        break;
      case 2:
      case 3:
        this.title = 'Bạn thật là tiết kiệm khi không tiêu gì trong ngày hôm nay!';
        break;
      case 4:
      case 5:
        this.title = 'Năm nay covid vì vậy chúng ta nên chi tiêu tiết kiệm, nhưng bạn phải cho tôi biết bạn đã tiêu gì trong ngày hôm nay !';
        break;
      case 6:
      case 7:
        this.title = 'Bạn đã mua gì trong ngày hôm nay , hãy cho tôi biết!';
        break;
    }
  }

  close(): void {
    this.activeModal.dismiss();
  }

  moveCP(): void {
    this.router.navigate(['qltccn/chi-phi']);
    this.activeModal.dismiss();
  }
}
