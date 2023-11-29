import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TeamsService } from './services/elder-pastoral.service';
import { Teams } from './services/team.type';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';
import { Elders } from './services/elder.type';

@Component({
  selector: 'app-elder-pastoral',
  templateUrl: './elder-pastoral.component.html',
  styleUrls: ['./elder-pastoral.component.css']
})
export class ElderPastoralComponent implements OnInit {
  pretriseMembers: any[] = [];
  teams: any[][] = Array(12).fill(null).map(() => []);
  public teams$!: Observable<Teams | null>;
  public elders$!: Observable<Elders | null>;
  public team!: Teams | null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _teamsService: TeamsService) {}

  ngOnInit() {
    this.teams$ = this._teamsService.teams$;
    this.elders$ = this._teamsService.elders$;

    this._teamsService.getLeaders().pipe(
      switchMap((leaders: any) => {
        this.pretriseMembers = leaders;
        return this._teamsService.getTeams();
      }),
      map((teams: any) => {
        if (teams !== undefined) {
          return teams.map((team: any) => {
            return team.members.map((member: any) => {
              let memberDetail = this.pretriseMembers.find((m: any) => m._id === member);
              return memberDetail ? memberDetail : member;
            });
          });
        }
      }),
      takeUntil(this._unsubscribeAll)
    ).subscribe((teams) => {
      this.teams = teams;
      console.log('this.team', this.team);
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // console.log('event', event);
      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
        // console.log(event.previousContainer.data,
        //   event.container.data,
        //   event.previousIndex,
        //   event.currentIndex,); 
        
      if (event.previousContainer.id === 'pretriseMembers') {
        this._teamsService.updateTeam(event.container.id, { members: event.container.data.map(m => m._id) }).subscribe();
      } else if (event.container.id === 'pretriseMembers') {
        this._teamsService.updateTeam(event.previousContainer.id, { members: event.previousContainer.data.map(m => m._id) }).subscribe();
      } else {
        this._teamsService.updateTeam(event.previousContainer.id, { members: event.previousContainer.data.map(m => m._id) }).subscribe();
        this._teamsService.updateTeam(event.container.id, { members: event.container.data.map(m => m._id) }).subscribe();
      }
    }
  }

  teamLimit(drag: CdkDrag, drop: CdkDropList): boolean {
    return drop.data.length < 3;
  }
  
  getMemberName(id: string): string {
    // console.log('id', id);
    // let momo = this.pretriseMembers.find(m => console.log('m', m));
    
    
    let member = this.pretriseMembers.find(m => m._id === id);
    // console.log('member', member);
    
    if (!member) {
      this.teams.forEach(team => {
        const teamMember = team.find(m => m._id === id);
        if (teamMember) {
          member = teamMember;
        }
      });
    }
    return member ? member.firstName + ' ' + member.lastName : '';
  }
}
