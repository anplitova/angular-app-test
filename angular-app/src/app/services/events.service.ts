import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/events';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
const options = { headers: headers };

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private http: HttpClient) { }

  add(data: any): Observable<any> {
    return this.http.post(baseUrl, data, options);
  }

  findByTheme(theme: string): Observable<any> {
    return this.http.get(`${baseUrl}?theme=${theme}`);
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
}
