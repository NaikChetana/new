import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _injector: Injector) { }

  intercept(req, next) {
    let authSerice = this._injector.get(AuthService)
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authSerice.getToken()}`
      }
    })

    return next.handle(tokenizedRequest)
  }

}
