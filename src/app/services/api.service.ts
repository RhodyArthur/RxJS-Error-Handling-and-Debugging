import { Injectable } from '@angular/core';
import { catchError, delay, map, of, retry, tap, throwError, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }


  // simulation function
  simulateHttpRequest() {
    const isSuccess = Math.random() > 0.5;
    return timer(1000)
          .pipe(
            // delay to simulate network
            delay(300),
            tap(() => console.log('Fetching data...')),
            map(() => {
              tap(() => console.log('Determining success criteria'))
              if(isSuccess) {
                return {data: 'Data fetched successfully'}
              }
              else {
                throw new Error('Unable to fetch data')
              }
            }),
            retry(5),
            tap({
              error: err =>  console.error('Retrying failed attempt', err),
              complete: () => console.log('Request completed')

            }),
            catchError(err => {
              console.error('Request failed after retries', err)
              return of({data: 'Fall back response'})
            }),
            tap({
              next: data => console.log('Data fetched', data),
              error: (err) => console.error('Failed to receive data')
            })
        )
  
  }
}
