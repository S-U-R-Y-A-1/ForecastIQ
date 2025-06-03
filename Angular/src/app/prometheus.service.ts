import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PrometheusService {
  constructor(private http: HttpClient) {}

  getCPUUsage() {
    return this.http.get('http://localhost:8000/cpu');
  }
}