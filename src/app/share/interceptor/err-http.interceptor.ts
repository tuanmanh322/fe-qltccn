import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";


@Injectable()
export class ErrHttpInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 0) {
        this.toastr.error('Lỗi server!');
      }
      return throwError(err);
    }))

  }
}
