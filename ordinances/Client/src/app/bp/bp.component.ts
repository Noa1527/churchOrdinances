import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { Member, Members } from 'src/app/services/member.type';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { MemberDialogComponent } from '../components/member-dialog/member-dialog.component';

@Component({
  selector: 'app-bp',
  templateUrl: './bp.component.html',
  styleUrls: ['./bp.component.css']
})
export class BpComponent implements OnInit {

  member: MatTableDataSource<Member>;
  
  displayedColumns: string[] = [
    'firstName', 
    'lastName',
    'email', 
    'age', 
    'gender', 
    'phone', 
    'ordinance.Baptism', 
    'ordinance.PriestHood', 
    'ordinance.Initiatory', 
    'ordinance.Endowment', 
    'ordinance.Sealing', 
    'blessing.is_got', 
    // 'comments' 
  ];

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
    ) { 
    this.member = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.memberService.allMembers$.pipe(
      filter((members: Members | null): members is Members => members !== null),
    ).subscribe((members: Members) => {
      this.member = new MatTableDataSource(members);
    });
    
    this.memberService.getAllMembers().subscribe();
  }

  // getMembers(): void {

  //   this.memberService.getAllMembers().subscribe((members: any[]) => {
  //     console.log(members);
      
  //     this.member = new MatTableDataSource(members);

  //   });
  // }

  getAge(birthDate: Date): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const month = today.getMonth() - birthDateObj.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age;
  }

  // applyFilter(event: Event, field: string) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.member.filterPredicate = (data: any, filter: string) => {
  //     return data[field].toLowerCase().includes(filter);
  //   };
  //   this.member.filter = filterValue.trim().toLowerCase();
  // }

  filterValues: Record<string, string> = {};
  
  applyFilter(filterValue: string, columnName: string) {

    this.filterValues[columnName] = filterValue;
    this.member.filterPredicate = (data: any, filter: string) => {
      let filterArray = filter.split(',');

      return filterArray.every(filterValue => {
        let pair = filterValue.split(':');
        return data[pair[0]].trim().toLowerCase().includes(pair[1]);
      });

    };
    
    let finalFilter = Object.keys(this.filterValues).map(key => `${key}:${this.filterValues[key]}`).join(',');
    this.member.filter = finalFilter.trim();
  }
 
  public createOrEditAgency(member?: Member): void {
    const ref = this.dialog.open(MemberDialogComponent, {
        width: '100%',
    });
    
    if (member) {
        ref.componentInstance.member = member;
    }
}

  
}
