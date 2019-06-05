import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorage } from './token-storage.service';

@Injectable()
export class InterceptService implements HttpInterceptor {
	// intercept request and add token
	constructor(public auth: TokenStorage ) { }
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// modify request
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.auth.getToken()}`
			}
        });
        
		return next.handle(request).pipe(
			tap(
				event => {
					if (event instanceof HttpResponse) {
						console.log(event.status);
					}
				},
				error => {
					console.error(error.status);
					console.error(error.message);
				}
			)
		);
	}
}
