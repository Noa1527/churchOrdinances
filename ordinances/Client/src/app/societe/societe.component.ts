import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from 'src/app/services/member.type';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.css']
})
export class SocieteComponent implements OnInit {

  member: MatTableDataSource<Member>;
  
  displayedColumns: string[] = [
    'firstName', 
    'lastName', 
    'email', 
    'age', 
    'gender', 
    'phone', 
    'ordinance.Baptism', 
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
    this.getSocieteMembers();
  }

  getSocieteMembers(): void {
    this.memberService.findWomenLeaders().subscribe((leaders: any[]) => {
      console.log(leaders);
      
        this.member = new MatTableDataSource(leaders);
        console.log(this.member);
        
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
