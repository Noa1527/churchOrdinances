import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/user/service/user.service';

@Injectable({
    providedIn: 'root',
})
export class MemberService {

    constructor(
        private http: HttpClient, 
        public jwtHelper: JwtHelperService,
        private userService: UserService,
    ) { }

    getAllMembers(): Observable<any> {
         return this.http.get<any>('/api/member');
    }

    findLeaders(): Observable<any> {
        return this.http.get<any>('/api/member/leaders');
    }
    findWomenLeaders(): Observable<any> {
        return this.http.get<any>('/api/member/WomenLeaders');
    }

    // getAllMembersByRoleBP(role: string): Observable<any> {
    //     return this.http.get<any>(`/api/member/${role}`);
    // }
    // getAllMembersByRoleElder(role: string): Observable<any> {
    //     return this.http.get<any>(`/api/member/${role}`);
    // }

}
