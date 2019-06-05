import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { CookieService } from './cookie.service';
import { TokenDecodeModel } from '../models/Token-decode';
import { Usuario } from '../models/Usuario';

export const TOKEN_NAME: string = 'jwt_token';
export const DECODETOKEN_NAME: string = 'decoded_user';
export const USUARIO_NAME: string = 'usuario_app';
export const DOMAIN = environment.domain;

@Injectable()
export class TokenStorage {
	cookieTokenName = 'Token';
	cookieUserName = 'Usuario';

	constructor(private cookieService: CookieService) {}

	//-------------------------------------------------------           INÍCIO       ---------------------------------------------------------------------//

	private getDecodedToken() {
		var token = this.getToken();
		if (token == "null") return null;
		return jwt_decode(token);
	  }
	
	  getToken(): string {
		return localStorage.getItem(TOKEN_NAME);
	  }

	  getUsuario(): Usuario {
		var user = localStorage.getItem(USUARIO_NAME);
		if (user == undefined || user == "undefined")
		  return null;
	
		return JSON.parse(user);
	  }
	
	  getDecodeToken(): TokenDecodeModel {
		var usuario = localStorage.getItem(DECODETOKEN_NAME);
		if (usuario == null || usuario == "null") {
		  return new TokenDecodeModel();
		}
		return JSON.parse(usuario);
	  }
	
	  setToken(token: string): void {
		localStorage.setItem(TOKEN_NAME, token);
	
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		this.cookieService.set(this.cookieTokenName, token, tomorrow, '/', DOMAIN, null);
	
		var usuario = this.getDecodedToken();
		this.setDecodeToken(usuario);
	  }
	
	  clearUsuario()
	  {
		localStorage.setItem(USUARIO_NAME, null);
	  }
	
	  setUsuario(usuario: Usuario) {
		var userApp = this.getUsuario();
		if (userApp == null) {
		  if (usuario != null) {
			//Local Storage
			localStorage.setItem(USUARIO_NAME, JSON.stringify(usuario));
			//Cookie
			var tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			this.cookieService.set(this.cookieUserName, JSON.stringify(usuario), tomorrow, '/', DOMAIN, null);
		  }
		} else {
		  if (usuario != null) {
			var tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			this.cookieService.set(this.cookieUserName, JSON.stringify(usuario), tomorrow, '/', DOMAIN, null);
		  } else {
			var tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			this.cookieService.set(this.cookieUserName, JSON.stringify(userApp), tomorrow, '/', DOMAIN, null);
		  }
		}
	  }
	
	  setDecodeToken(user: string): void {
		localStorage.setItem(DECODETOKEN_NAME, JSON.stringify(user));
	  }
	
	  getTokenExpirationDate(token: string): Date {
		try {
		  const decoded = jwt_decode(token);
	
		  if (decoded.exp === undefined) return null;
	
		  const date = new Date(0);
		  date.setUTCSeconds(decoded.exp);
		  return date;
		}
		catch (error) {
		  return undefined;
		}
	  }
	
	  isTokenValid(): boolean {
		var token = this.getToken();
		if (token == null || token == "null") return false;
	
		const date = this.getTokenExpirationDate(token);
	
		if (date === undefined) return false;
	
		return (date.valueOf() > new Date().valueOf());
	  }

	//-------------------------------------------------------        FIM       ---------------------------------------------------------------------//

	/**
	 * Get access token
	 * @returns {Observable<string>}
	 */
	public getAccessToken(): Observable<string> {
		const token: string = <string>localStorage.getItem('accessToken');
		return of(token);
	}

	/**
	 * Get refresh token
	 * @returns {Observable<string>}
	 */
	public getRefreshToken(): Observable<string> {
		const token: string = <string>localStorage.getItem('refreshToken');
		return of(token);
	}

	/**
	 * Get user roles in JSON string
	 * @returns {Observable<any>}
	 */
	public getUserRoles(): Observable<any> {
		const roles: any = localStorage.getItem('userRoles');
		try {
			return of(JSON.parse(roles));
		} catch (e) {}
	}

	/**
	 * Set access token
	 * @returns {TokenStorage}
	 */
	public setAccessToken(token: string): TokenStorage {
		localStorage.setItem('accessToken', token);

		return this;
	}

	/**
	 * Set refresh token
	 * @returns {TokenStorage}
	 */
	public setRefreshToken(token: string): TokenStorage {
		localStorage.setItem('refreshToken', token);

		return this;
	}

	/**
	 * Set user roles
	 * @param roles
	 * @returns {TokenStorage}
	 */
	public setUserRoles(roles: any): any {
		if (roles != null) {
			localStorage.setItem('userRoles', JSON.stringify(roles));
		}

		return this;
	}

	/**
	 * Remove tokens
	 */
	public clear() {
		this.setToken(null);
		this.clearUsuario();
		this.cookieService.delete(this.cookieTokenName, null, null);
		this.cookieService.delete(this.cookieUserName, null, null);
	}
}
