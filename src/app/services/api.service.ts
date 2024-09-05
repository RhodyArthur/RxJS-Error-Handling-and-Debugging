import { Injectable } from '@angular/core';
import { catchError, delay, from, map, of, retry, switchMap, tap, throwError, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  // simulation function
  simulateHttpRequest(url:string) {
    const isSuccess = Math.random() > 0.5;
    return timer(1000)

          .pipe(
            // delay to simulate network
            delay(2000),
            tap(() => console.log('Fetching data...')),
            switchMap(() => {
              if(isSuccess) {
                return from(fetch(url)
                .then(response => response.json())
            )}
              else {
                throw new Error('Unable to fetch data')
              }
            }),
            retry(3),
            tap({
              error: err =>  console.error('Retrying failed attempt', err),
              complete: () => console.log('Request completed')

            }),
            catchError(err => {
              console.error('Request failed after retries', err)
              return throwError('Fallback: An eror occured',err)
            }),
            tap({
              next: data => console.log('Data fetched', data),
              error: (err) => console.error('Failed to receive data')
            })
        )
  
  }
}
