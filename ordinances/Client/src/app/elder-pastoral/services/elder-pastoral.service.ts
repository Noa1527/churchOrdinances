// src/app/teams.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) { }

  getTeams(): Observable<any> {
    return this.http.get('/api/teams');
  }

  updateTeam(seq: string, team: any): Observable<any> {
    return this.http.patch(`/api/teams/${seq}`, team);
  }
}
