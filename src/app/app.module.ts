import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import {ApiService} from "./share/service/api.service";
import { LoginFormComponent } from './layouts/client-layout/login-form/login-form.component';
import { RegisterFormComponent } from './layouts/client-layout/register-form/register-form.component';
import {HttpConfigInterceptor} from "./share/interceptor/http-config.interceptor";
import {ErrHttpInterceptor} from "./share/interceptor/err-http.interceptor";
import {ChartsModule} from "ng2-charts";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    ChartsModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, LoginFormComponent, RegisterFormComponent],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrHttpInterceptor, multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
