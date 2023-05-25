import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
        private http: HttpClient, 
        public jwtHelper: JwtHelperService,
        private userService: UserService,
    ) { }

    // forgotPassword(email: string): Observable<any> {
    //     return this.http.post<any>('/api/auth/forgot-password', { email });
    // }

    // resetPassword(token: string, newPassword: string): Observable<any> {
    //     return this.http.post<any>(`/api/users/reset-password/${token}`, {
    //         newPassword,
    //     });
    // }

    getAuthorizationToken(): string | null {
        console.log('getAuthorizationToken2');
        return localStorage.getItem('access_token');
    }

    login(email: string, password: string): Observable<any> {
        console.log('login1');
        
        return this.http
            .post<any>('/api/auth/login', { email, password })
            .pipe(tap(this.setSession));
    }
    
    // TO LINK
    // updatePassword(email: string, password: string): Observable<any> {
    //     return this.http
    //         .put<any>('/api/auth/login', { email, password })
    //         .pipe(tap(this.setSession));
    // }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    setSession(authResult: { access_token: string }): void {
        console.log('setSession3');
        localStorage.setItem('access_token', authResult.access_token);
    }

    magicSignIn(input: { email: string }): Observable<any>
    {
        console.log('magicSignIn Front');
        
        console.log(input);

        console.log('throwError1', this.isLoggedIn());
        // Throw error, if the user is already logged in
        if ( this.isLoggedIn() === true)
        {
            console.log('throwError2', this.isLoggedIn());
          
                throw throwError('User is already logged in.');
        }
        console.log('je lance le post');
        return this.http.post<any>('/api/auth/magic-sign-in', input).pipe(
            switchMap((response: any) => of(response))
        );
    }

    verifyMagicSignIn(token: string): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this.isLoggedIn() )
        {
            return throwError('User is already logged in.');
        }

        return this.http.post('/api/auth/verify-magic-sign-in', { token }).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.setSession(response.accessToken);

                // Store the user on the user service
                this.userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    public signOut(): void {
        localStorage.removeItem('access_token');
    }

    public isLoggedIn(): boolean {
        console.log('isLoggedIn4');
        
        const token = this.getAuthorizationToken();
        console.log('token', token);
        
        if (!token) {
            console.log('false sad');
            return false;
        }
        try {
            const isExpired = this.jwtHelper.isTokenExpired(token);
            console.log('isExpired', isExpired);
            return !isExpired;
        } catch (e) {
            return false;
        }
    }

    public isAdmin(): boolean {
        const token = this.getAuthorizationToken();
        console.log('isAdmin5', token);
        
        if (!token || this.jwtHelper.isTokenExpired(token)) {
            return false;
        }
        const decoded = this.jwtHelper.decodeToken(token);
        console.log('decoded', decoded);
        return decoded.isAdmin;
    }

    logout(): void {
        localStorage.removeItem('access_token');
    }

}
