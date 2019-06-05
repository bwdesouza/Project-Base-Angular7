import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
import {
    map, mergeMap, tap
} from "rxjs/operators";

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Credencial } from '../models/Credencial';
import { Usuario } from '../models/Usuario';
import { TokenStorage } from './token-storage.service';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private apiUrl = environment.apiUrl + '/usuario';
    constructor(private http: HttpClient,
        private tokenStorage: TokenStorage) { }

    cadastrarUsuario(usuario: Usuario): any {
        const url = `${this.apiUrl + "/registrarUsuario"}`;
        return this.http.post(url, usuario);
    }

    login(credencial: Credencial): any {
        const url = `${this.apiUrl + "/login"}`;
        return this.http.post(url, credencial).pipe(
			map((result: any) => {
                debugger				
				result = result.data;
				return result;
			}),
			tap(this.salvarToken.bind(this)));
    }

    private salvarToken(data: any) {
        if (typeof data !== 'undefined') {
            this.tokenStorage
                .setToken(data.token);

            this.tokenStorage.setUsuario(data);
        }
    }
}
