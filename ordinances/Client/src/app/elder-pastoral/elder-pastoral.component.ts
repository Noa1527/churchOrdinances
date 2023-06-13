import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TeamsService } from './services/elder-pastoral.service';

@Component({
  selector: 'app-elder-pastoral',
  templateUrl: './elder-pastoral.component.html',
  styleUrls: ['./elder-pastoral.component.css']
})
export class ElderPastoralComponent implements OnInit {
  pretriseMembers: any[] = [];
  teams: any[][] = Array(12).fill(null).map(() => []);

  constructor(private teamsService: TeamsService) {}

  ngOnInit() {
    this.teamsService.getLeaders().subscribe((leaders: any) => {
      this.pretriseMembers = leaders;
    });
  
    this.teamsService.getTeams().subscribe((teams: any) => {
      if (teams !== undefined) {
        this.teams = teams;
      }
      
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('event', event);
      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
        console.log(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,); 
        
      if (event.previousContainer.id === 'pretriseMembers') {
        this.teamsService.updateTeam(event.container.id, { members: event.container.data.map(m => m._id) }).subscribe();
      } else if (event.container.id === 'pretriseMembers') {
        this.teamsService.updateTeam(event.previousContainer.id, { members: event.previousContainer.data.map(m => m._id) }).subscribe();
      } else {
        this.teamsService.updateTeam(event.previousContainer.id, { members: event.previousContainer.data.map(m => m._id) }).subscribe();
        this.teamsService.updateTeam(event.container.id, { members: event.container.data.map(m => m._id) }).subscribe();
      }
    }
  }

  teamLimit(drag: CdkDrag, drop: CdkDropList): boolean {
    return drop.data.length < 3;
  }
  
  getMemberName(id: string): string {
    let member = this.pretriseMembers.find(m => m._id === id);
    console.log('member', member);
    
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
