import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/user/service/user.service';
import { Member, Members } from './member.type';

@Injectable({
    providedIn: 'root',
})
export class MemberService {

    constructor(
        private http: HttpClient, 
        public jwtHelper: JwtHelperService,
        private userService: UserService,
    ) { }

    private _members: BehaviorSubject<Members | null> = new BehaviorSubject<Members | null>(null);
    private _member: BehaviorSubject<Member | null> = new BehaviorSubject<Member | null>(null);
    private _leaders: BehaviorSubject<Members | null> = new BehaviorSubject<Members | null>(null);
    private _allMembers: BehaviorSubject<Members | null> = new BehaviorSubject<Members | null>(null);



    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Setter & getter for client
     *
     * @param value
     */
    set member(value: Member) {
        // Store the value
        this._member.next(value);
    }
    set members(value: Members) {
        // Store the value
        this._members.next(value);
    }
    get members$(): Observable<Members | null> {
        console.log('_members', this._members);
        return this._members.asObservable();
    }

    get member$(): Observable<Member | null> {
        return this._member.asObservable();
    }

    get leaders$(): Observable<Members | null> {
        return this._leaders.asObservable();
      }
      
      get allMembers$(): Observable<Members | null> {
        return this._allMembers.asObservable();
      }

    findLeaders(): Observable<Members> {
        return this.http.get<Members>('/api/member/leaders').pipe(
          tap((leaders: any) => {
            this._leaders.next(leaders);
          })
        );
    }
      
    getAllMembers(): Observable<Members> {
        return this.http.get<Members>('/api/member').pipe(
          tap((members: any) => {
            this._allMembers.next(members);
          })
        );
    }
    findWomenLeaders(): Observable<Members> {
        return this.http.get<Members>('/api/member/WomenLeaders').pipe(
            tap((leaders: any) => {
                this.members = leaders;
            })
        );
    }

    // getAllMembersByRoleBP(role: string): Observable<any> {
    //     return this.http.get<any>(`/api/member/${role}`);
    // }
    // getAllMembersByRolemember(role: string): Observable<any> {
    //     return this.http.get<any>(`/api/member/${role}`);
    // }

}
