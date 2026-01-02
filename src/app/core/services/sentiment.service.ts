import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  SentimentResponse,
  SentimentApiResponse
} from '../models/sentiment-response';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  private readonly API_URL = 'http://localhost:8080/sentiment';

  constructor(private http: HttpClient) {}

  analyze(text: string): Observable<SentimentResponse> {
    return this.http
      .post<SentimentApiResponse>(this.API_URL, { text })
      .pipe(
        map(res => ({
          sentiment: this.mapSentiment(res.prevision),
          probability: res.probabilidad
        })),
        catchError(this.handleError)
      );
  }

  private mapSentiment(value: string): 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' {
    switch (value.toLowerCase()) {
      case 'positivo':
        return 'POSITIVE';
      case 'negativo':
        return 'NEGATIVE';
      default:
        return 'NEUTRAL';
    }
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Error inesperado 😬';

    if (error.status === 0) {
      message = 'No se puede conectar con el servidor';
    } else if (error.status === 400) {
      message = 'Texto inválido o vacío';
    } else if (error.status === 502) {
      message = 'El modelo no respondió (502)';
    } else if (error.status === 503) {
      message = 'Servicio no disponible (503)';
    }

    return throwError(() => new Error(message));
  }
}
