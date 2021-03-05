import { Injectable, Injector, Input } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

    // intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(httpRequest);
    // }

    constructor(private injector: Injector) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        let userService = this.injector.get(UserService)
        let tokenizedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${userService.getToken()}`
            }
        })
        return next.handle(tokenizedReq)
    }
}