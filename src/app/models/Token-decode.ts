export class TokenDecodeModel {
    EMAIL:string;
    NOME: string;
    aud: string;
    email: string;
    exp: number = 0;
    iat: number = 0.
    iss: string;
    jti: string;
    nbf: number = 0;
    unique_name: string = "";
    sid: string;
  
    constructor (values: Object = {}){
        Object.assign(this, values);
    }
  }
  