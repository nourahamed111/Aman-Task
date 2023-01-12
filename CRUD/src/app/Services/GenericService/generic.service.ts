import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(private Client: HttpClient) {}

  //http options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // set Header
  private setHeader(Key: string, value: string) {
    this.httpOptions.headers.set(Key, value);
  }
  // Handle Error Function
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  //Get All Function
  GetAll(RouteUrl: string): Observable<any> {
    return this.Client.get<any>(
      `${environment.APIUrl}/${RouteUrl}`,
      this.httpOptions
    ).pipe(retry(3), catchError(this.handleError));
  }

  //Get One Function
  GetOne(RouteUrl: string, id: number): Observable<any> {
    return this.Client.get<any>(
      `${environment.APIUrl}/${RouteUrl}/${id}`,
      this.httpOptions
    ).pipe(retry(3), catchError(this.handleError));
  }

  // Add Function
  Add(RouteUrl: string, item: any): Observable<any> {
    return this.Client.post<any>(
      `${environment.APIUrl}/${RouteUrl}`,
      JSON.stringify(item),
      this.httpOptions
    ).pipe(retry(3), catchError(this.handleError));
  }

  // Update Function
  Update(RouteUrl: string, id: number, item: any): Observable<any> {
    return this.Client.put<any>(
      `${environment.APIUrl}/${RouteUrl}/${id}`,
      JSON.stringify(item),
      this.httpOptions
    ).pipe(retry(3), catchError(this.handleError));
  }

  // delete Function
  Delete(RouteUrl: string, id: number): Observable<any> {
    return this.Client.delete<any>(
      `${environment.APIUrl}/${RouteUrl}/${id}`,
      this.httpOptions
    ).pipe(retry(3), catchError(this.handleError));
  }
}
