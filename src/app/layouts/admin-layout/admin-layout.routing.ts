import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import {ThuNhapComponent} from "../../pages/thu-nhap/thu-nhap.component";
import {ChiPhiComponent} from "../../pages/chi-phi/chi-phi.component";
import {NganSachComponent} from "../../pages/ngan-sach/ngan-sach.component";
import {LoaiNganSachComponent} from "../../pages/loai-ngan-sach/loai-ngan-sach.component";
import {LoaiThongBaoComponent} from "../../pages/loai-thong-bao/loai-thong-bao.component";
import {LoaiViComponent} from "../../pages/loai-vi/loai-vi.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "thu-nhap", component: ThuNhapComponent },
  { path: "chi-phi", component: ChiPhiComponent },
  { path: "ngan-sach", component: NganSachComponent },
  { path: "loai-ngan-sach", component: LoaiNganSachComponent },
  { path: "loai-thong-bao", component: LoaiThongBaoComponent },
  { path: "loai-vi", component: LoaiViComponent }

  // { path: "rtl", component: RtlComponent }
];
