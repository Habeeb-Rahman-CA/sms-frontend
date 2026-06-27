import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private readonly apiUrl = 'http://localhost:3000/schools';

  constructor(private readonly http: HttpClient) {}

  /**
   * Registers a new school and primary administrator.
   */
  registerSchool(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
