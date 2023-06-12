import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TeamsService } from './services/elder-pastoral.service';


@Component({
  selector: 'app-elder-pastoral',
  templateUrl: './elder-pastoral.component.html',
  styleUrls: ['./elder-pastoral.component.css']
})
export class ElderPastoralComponent implements OnInit {
  pretriseMembers = ['Member 1', 'Member 2', 'Member 3', 'Member 4', 'Member 5'];
  teams: string[][] = Array(12).fill(null).map(() => []);

  constructor(private teamsService: TeamsService) {}

  ngOnInit() {
    this.teamsService.getTeams().subscribe((teams: any) => {
      this.teams = teams.map((team: { members: any; }) => team.members);
    });
  }
 
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (event.previousContainer.id === 'pretriseMembers') {
        // A member was moved from pretriseMembers to a team
        this.teamsService.updateTeam(event.container.id, { members: event.container.data }).subscribe();
      } else if (event.container.id === 'pretriseMembers') {
          // A member was moved from a team to pretriseMembers
          this.teamsService.updateTeam(event.previousContainer.id, { members: event.previousContainer.data }).subscribe();
      } else {
          // A member was moved between teams
          this.teamsService.updateTeam(event.previousContainer.id, { members: event.previousContainer.data }).subscribe();
          this.teamsService.updateTeam(event.container.id, { members: event.container.data }).subscribe();
      }
    }
  }
  teamLimit(drag: CdkDrag, drop: CdkDropList): boolean {
    return drop.data.length < 3;
  }
}