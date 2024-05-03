import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  baseUrl: String = "http://express:3000/apiauth/"

  connexion(userCredentials: any): Observable<any> {
    let url = this.baseUrl + "connexion"
    return this.http.post(url, userCredentials)
  }

  inscription(userInfo: any): Observable<any> {
    let url = this.baseUrl + "inscription"
    return this.http.post(url, userInfo)
  }

  resetPassword(userReset: any): Observable<any> {
    let url = this.baseUrl + "connexion"
    return this.http.post(url, userReset)
  }
}
