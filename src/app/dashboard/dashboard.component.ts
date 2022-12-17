import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 userDetails : any;
  constructor() { }

  ngOnInit(): void {
    this.userDetails= sessionStorage.getItem("userDetails");
    this.userDetails=JSON.parse(this.userDetails)
    console.log(this.userDetails)
  }
  ngOnDestroy(){
    sessionStorage.setItem("userDetails",'')
  }

}
