import { Component, OnInit } from '@angular/core';
import { Member } from '../intefaces/member.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-elder',
  templateUrl: './elder.component.html',
  styleUrls: ['./elder.component.css']
})
export class ElderComponent implements OnInit {

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

  constructor(private memberService: MemberService) { 
    this.member = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService.findLeaders().subscribe((leaders: any[]) => {
        this.member = new MatTableDataSource(leaders);
    });
  }



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

  
}
