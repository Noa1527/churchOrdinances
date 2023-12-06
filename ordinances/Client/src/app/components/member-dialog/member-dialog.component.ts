import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/services/member.type';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.css']
})
export class MemberDialogComponent implements OnInit{
  @Input()member!: Member;

  constructor() { }
  
  ngOnInit(): void {
    console.log('member', this.member);
  }


}
