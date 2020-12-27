import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginFormComponent} from './layouts/client-layout/login-form/login-form.component';
import {RegisterFormComponent} from './layouts/client-layout/register-form/register-form.component';
import {CustomeGuard} from './share/guard/custome.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
    canActivate: [CustomeGuard]
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    canActivate: [CustomeGuard]
  },
  {
    path: 'qltccn',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },
  // {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   // canActivate: [CustomeGuard],
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
  //     }
  //   ]
  // },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
