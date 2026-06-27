import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth';

  constructor(private readonly http: HttpClient) {}

  /**
   * Authenticates a user with their email/username and password.
   */
  signIn(data: { identifier: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-in`, data);
  }
}
