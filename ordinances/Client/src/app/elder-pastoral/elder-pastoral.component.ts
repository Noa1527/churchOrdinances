// import { Component, OnInit } from '@angular/core';
// import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
// import { TeamsService } from './services/elder-pastoral.service';
// import { Teams } from './services/team.type';
// import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';
// import { Elders } from './services/elder.type';

// @Component({
//   selector: 'app-elder-pastoral',
//   templateUrl: './elder-pastoral.component.html',
//   styleUrls: ['./elder-pastoral.component.css']
// })
// export class ElderPastoralComponent implements OnInit {
//   pretriseMembers: any[] = [];
//   teams: any[][] = Array(12).fill(null).map(() => []);
//   public teams$!: Observable<Teams | null>;
//   public elders$!: Observable<Elders | null>;
//   public team!: Teams | null;
//   private _unsubscribeAll: Subject<any> = new Subject<any>();

//   constructor(private _teamsService: TeamsService) {}

//   ngOnInit() {
//     this.teams$ = this._teamsService.teams$;
//     this.elders$ = this._teamsService.elders$;

//     this._teamsService.getLeaders().pipe(
//       switchMap((leaders: any) => {
//         this.pretriseMembers = leaders;
//         return this._teamsService.getTeams();
//       }),
//       map((teams: any) => {
//         if (teams !== undefined) {
//           return teams.map((team: any) => {
//             return team.members.map((member: any) => {
//               let memberDetail = this.pretriseMembers.find((m: any) => m._id === member);
//               return memberDetail ? memberDetail : member;
//             });
//           });
//         }
//       }),
//       takeUntil(this._unsubscribeAll)
//     ).subscribe((teams) => {
//       this.teams = teams;
//       console.log('this.team', this.team);
//     });
//   }

//   drop(event: CdkDragDrop<any[]>) {
//     if (event.previousContainer === event.container) {
//       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//       // console.log('event', event);
      
//     } else {
//       transferArrayItem(
//         event.previousContainer.data,
//         event.container.data,
//         event.previousIndex,
//         event.currentIndex,
//       );
//         // console.log(event.previousContainer.data,
//         //   event.container.data,
//         //   event.previousIndex,
//         //   event.currentIndex,); 
        
//       if (event.previousContainer.id === 'pretriseMembers') {
//         this._teamsService.updateTeam(event.container.id, { members: event.container.data.map(m => m._id) }).subscribe();
//       } else if (event.container.id === 'pretriseMembers') {
//         this._teamsService.updateTeam(event.previousContainer.id, { members: event.previousContainer.data.map(m => m._id) }).subscribe();
//       } else {
//         this._teamsService.updateTeam(event.previousContainer.id, { members: event.previousContainer.data.map(m => m._id) }).subscribe();
//         this._teamsService.updateTeam(event.container.id, { members: event.container.data.map(m => m._id) }).subscribe();
//       }
//     }
//   }

//   teamLimit(drag: CdkDrag, drop: CdkDropList): boolean {
//     return drop.data.length < 3;
//   }
  
//   getMemberName(id: string): string {
//     // console.log('id', id);
//     // let momo = this.pretriseMembers.find(m => console.log('m', m));
    
    
//     let member = this.pretriseMembers.find(m => m._id === id);
//     // console.log('member', member);
    
//     if (!member) {
//       this.teams.forEach(team => {
//         const teamMember = team.find(m => m._id === id);
//         if (teamMember) {
//           member = teamMember;
//         }
//       });
//     }
//     return member ? member.firstName + ' ' + member.lastName : '';
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TeamsService } from './services/elder-pastoral.service';
import { Team, Teams } from './services/team.type';
import { Observable, Subject, combineLatest, map, switchMap, takeUntil } from 'rxjs';
import { Elder, Elders } from './services/elder.type';
import { FamilyService } from '../services/familes/family.service';
import { Families, Family } from '../services/familes/family.type';
import { Members } from '../services/member.type';

@Component({
  selector: 'app-elder-pastoral',
  templateUrl: './elder-pastoral.component.html',
  styleUrls: ['./elder-pastoral.component.css']
})
export class ElderPastoralComponent implements OnInit {
  pretriseMembers: any[] = [];
  familyMembers: any[] = [];
  teamAndFamilies: any[] = [];
  public teams: { members: Elder[], families: Family[] }[] = Array(12).fill(null).map(() => ({ members: [], families: [] }));

  public teams$!: Observable<Teams | null>;
  public elders$!: Observable<Elders | null>;
  public families$!: Observable<Families | null>;
  public team!: Teams | null;
  public teamate: Team[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor(
    private _teamsService: TeamsService,
    private _findAllFamily: FamilyService,
    ) {}
    
    ngOnInit() {
      this.teams$ = this._teamsService.teams$;
      this.elders$ = this._teamsService.elders$;
      this.families$ = this._findAllFamily.families$; 

      console.log('this.families$', this.families$);
      console.log('this.elders$', this.elders$);
      console.log('this.teams$', this.teams$);
      // Initialisation
      this._teamsService.teams$
      .pipe(map(teams => teams || []))
      .subscribe(teams => {
        this.team = teams;
        this.team.forEach((team: Team) => {

          if (this.teamate) {
            this.teamate.push(team);
          }
        });
      });

      combineLatest([
        this._teamsService.elders$.pipe(map(elders => elders || [])),
        this._findAllFamily.families$.pipe(map(families => families || []))
      ]).subscribe(([members, families]) => {
        // Cloner this.teamate dans this.teams
        this.teams = JSON.parse(JSON.stringify(this.teamate));
      
        // Parcourir chaque équipe et remplacer les _id des membres par les objets membres
        this.teams.forEach((team: Team) => {
          team.members = team.members?.map(memberId => {
            const member = members.find(m => m._id === memberId);
            return member ? member : memberId;
          }) || [];
      
          team.families = team.families?.map((family: any) => {
            
            const famille = families.find(f => f._id === family );
            
            return famille ? famille : family;
          }) || [];
        });
      
        this.pretriseMembers = members;
        this.familyMembers = families;
      });

      this._findAllFamily.findAllFamily().subscribe();
      this._teamsService.getLeaders().subscribe();
      this._teamsService.getTeams().subscribe();
      
    }
    
  drop(event: CdkDragDrop<any[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
      
      console.log('event.container', event.container);
      
    const isMember = event.container.data[0].firstName !== undefined;

    if (event.previousContainer.id === 'pretriseMembers' || event.previousContainer.id === 'familyMembers') {
      if (isMember) {
        console.log('isMember');
        this._teamsService.updateTeam(event.container.id, { members: event.container.data.map(m => m._id) }).subscribe();
      } else {
        console.log('isFamily');

        this._teamsService.updateTeam(event.container.id, { families: event.container.data.map(f => f._id) }).subscribe();
      }
    } else if (event.container.id === 'pretriseMembers' || event.container.id === 'familyMembers') {
      if (isMember) {
        console.log('isMember');

        this._teamsService.updateTeam(event.previousContainer.id, { members: event.previousContainer.data.map(m => m._id) }).subscribe();
      } else {
        console.log('isFamily');

        this._teamsService.updateTeam(event.previousContainer.id, { families: event.previousContainer.data.map(f => f._id) }).subscribe();
      }
    } else {
      if (isMember) {
        console.log('isMember');
        
        this._teamsService.updateTeam(event.previousContainer.id, { members: event.previousContainer.data.map(m => m._id) }).subscribe();
        this._teamsService.updateTeam(event.container.id, { members: event.container.data.map(m => m._id) }).subscribe();
      } else {
        console.log('isFamily');

        this._teamsService.updateTeam(event.previousContainer.id, { families: event.previousContainer.data.map(f => f._id) }).subscribe();
        this._teamsService.updateTeam(event.container.id, { families: event.container.data.map(f => f._id) }).subscribe();
      }
    }
  }
}

  // teamLimit(drag: CdkDrag, drop: CdkDropList): boolean {
  //   return drop.data.length < 3;
  // }
  
  getMemberName(id: string): string {

    let member = this.pretriseMembers.find(m => m._id === id);

    this.teams.forEach(team => {
      const teamMember = team.members.find(m => m._id === id);
      if (teamMember) {
        member = teamMember;
      }
    });
    
    return member ? member.firstName + ' ' + member.lastName : '';
  }

  getFamilyName(id: string): string {

    let family = this.familyMembers.find(m => m._id === id);

    this.teams.forEach(team => {
      const teamFamily = team.families.find(m => m._id === id);
      if (teamFamily) {
        family = teamFamily;
      }
    });

    return family ? family.name : '';
  }

 
}
