import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AdminLayoutRoutes} from "./admin-layout.routing";
import {DashboardComponent} from "../../pages/dashboard/dashboard.component";
import {IconsComponent} from "../../pages/icons/icons.component";
import {MapComponent} from "../../pages/map/map.component";
import {NotificationsComponent} from "../../pages/notifications/notifications.component";
import {UserComponent} from "../../pages/user/user.component";
import {TablesComponent} from "../../pages/tables/tables.component";
import {TypographyComponent} from "../../pages/typography/typography.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ThuNhapComponent} from "../../pages/thu-nhap/thu-nhap.component";
import {ChiPhiComponent} from "../../pages/chi-phi/chi-phi.component";
import {NganSachComponent} from "../../pages/ngan-sach/ngan-sach.component";
import {PaginatorModule} from "../../share/paginator/paginator.module";
import {ChiPhiCreateComponent} from "../../pages/chi-phi/chi-phi-child/chi-phi-create/chi-phi-create.component";
import {ChiPhiEditComponent} from "../../pages/chi-phi/chi-phi-child/chi-phi-edit/chi-phi-edit.component";
import {NganSachCreateComponent} from "../../pages/ngan-sach/ngan-sach-child/ngan-sach-create/ngan-sach-create.component";
import {NganSachEditComponent} from "../../pages/ngan-sach/ngan-sach-child/ngan-sach-edit/ngan-sach-edit.component";
import {ThuNhapCreateComponent} from "../../pages/thu-nhap/thu-nhap-child/thu-nhap-create/thu-nhap-create.component";
import {LoaiNganSachCreateComponent} from "../../pages/loai-ngan-sach/loai-ngan-sach-child/loai-ngan-sach-create/loai-ngan-sach-create.component";
import {LoaiThongBaoComponent} from "../../pages/loai-thong-bao/loai-thong-bao.component";
import {LoaiThongBaoEditComponent} from "../../pages/loai-thong-bao/loai-thong-bao-child/loai-thong-bao-edit/loai-thong-bao-edit.component";
import {LoaiNganSachComponent} from "../../pages/loai-ngan-sach/loai-ngan-sach.component";
import {ThuNhapEditComponent} from "../../pages/thu-nhap/thu-nhap-child/thu-nhap-edit/thu-nhap-edit.component";
import {LoaiThongBaoCreateComponent} from "../../pages/loai-thong-bao/loai-thong-bao-child/loai-thong-bao-create/loai-thong-bao-create.component";
import {LoaiNganSachEditComponent} from "../../pages/loai-ngan-sach/loai-ngan-sach-child/loai-ngan-sach-edit/loai-ngan-sach-edit.component";
import {PipeModule} from "../../share/pipe/pipe.module";
import {ChartsModule} from "ng2-charts";
import {ViUserComponent} from "../../pages/vi/vi-user/vi-user.component";
import {LoaiViComponent} from "../../pages/loai-vi/loai-vi.component";
import {LoaiViCreateComponent} from "../../pages/loai-vi/loai-vi-child/loai-vi-create/loai-vi-create.component";
import {LoaiViEditComponent} from "../../pages/loai-vi/loai-vi-child/loai-vi-edit/loai-vi-edit.component";
import {MoneyReadDirective} from "../../share/directive/money-read.directive";
import {NotificationAlwaysComponent} from "../../pages/notification-always/notification-always.component";

// import { RtlComponent } from "../../pages/rtl/rtl.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        PaginatorModule,
        PipeModule,
        ChartsModule,
    ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    ThuNhapComponent,
    ChiPhiComponent,
    NganSachComponent,
    ChiPhiCreateComponent,
    ChiPhiEditComponent,
    NganSachCreateComponent,
    NganSachEditComponent,
     ThuNhapCreateComponent,
    ThuNhapEditComponent,
    LoaiNganSachComponent,
    LoaiNganSachCreateComponent,
    LoaiNganSachEditComponent,
    LoaiThongBaoComponent,
    LoaiThongBaoCreateComponent,
    LoaiThongBaoEditComponent,
    ViUserComponent, LoaiViComponent, LoaiViCreateComponent, LoaiViEditComponent,MoneyReadDirective,
    NotificationAlwaysComponent
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
