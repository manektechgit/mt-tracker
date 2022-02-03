import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';
import { MessageService } from 'primeng/api';
import { AppMessages } from '../_app-constants/app-constants.config';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.LogoutUser();
        location.reload(true);
      }
      this.messageService.add({ severity: 'error', summary: 'Error', detail: AppMessages.SOME_THING_WENT_WRONG, life: 3000 });

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
