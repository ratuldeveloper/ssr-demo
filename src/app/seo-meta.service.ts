import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable, throwError, of, pipe } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { tap, first, catchError } from 'rxjs/operators';

import { isPlatformServer } from '@angular/common';
import {
  makeStateKey,
  TransferState,
  Title,
  Meta,
} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoMetaService implements Resolve<any> {
  constructor(
    private http: HttpClient,
    private transferstate: TransferState,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const META_DATA_KEY = makeStateKey<any>('USER_DATA_key');
    console.log('*************** Meta data key ************', META_DATA_KEY);
    console.log(this.transferstate.hasKey(META_DATA_KEY));
    if (this.transferstate.hasKey(META_DATA_KEY)) {
      const userData = this.transferstate.get<any>(META_DATA_KEY, null);
      console.log('**********user details *****************', userData);
      this.transferstate.remove(META_DATA_KEY);
      return of(userData);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
      return this.http
        .get('https://jsonplaceholder.typicode.com/todos/1', httpOptions)
        .pipe(
          first(),
          tap((userData) => {
            if (isPlatformServer(this.platformId)) {
              this.transferstate.set(META_DATA_KEY, userData);
            }
            //return userData;
          }),
          catchError(this.handleError)
        );
    }
  }
}
