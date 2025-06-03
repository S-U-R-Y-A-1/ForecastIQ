import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  // For Prometheus metrics endpoint (returns text)
  getCpuMetrics(): Observable<string> {
    return this.http.get(`${this.apiUrl}/metrics`, { 
      responseType: 'text'  // Crucial for non-JSON responses
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(
      error.message || 'Server error'
    ));
  }
}