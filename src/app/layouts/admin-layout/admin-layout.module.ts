import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {ThuNhapComponent} from "../../pages/thu-nhap/thu-nhap.component";
import {ChiPhiComponent} from "../../pages/chi-phi/chi-phi.component";
import {NganSachComponent} from "../../pages/ngan-sach/ngan-sach.component";
import {PaginatorModule} from "../../share/paginator/paginator.module";
import {ChiPhiCreateComponent} from "../../pages/chi-phi/chi-phi-child/chi-phi-create/chi-phi-create.component";
import {ChiPhiEditComponent} from "../../pages/chi-phi/chi-phi-child/chi-phi-edit/chi-phi-edit.component";
import {NganSachCreateComponent} from "../../pages/ngan-sach/ngan-sach-child/ngan-sach-create/ngan-sach-create.component";
import {NganSachEditComponent} from "../../pages/ngan-sach/ngan-sach-child/ngan-sach-edit/ngan-sach-edit.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    PaginatorModule,
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
    NganSachEditComponent
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
