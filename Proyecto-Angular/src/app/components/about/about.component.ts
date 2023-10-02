import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public email: string;
  constructor(){
    this.title = "Kevin Toasa"
    this.subtitle = "Desarrollador web"
    this.email = "kevin.toasa@epn.edu.ec"
  }
  ngOnInit(): void {
    
  }
}
