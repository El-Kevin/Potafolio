import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url: string;
  constructor(
    private _projectService: ProjectService
  ){
    this.projects = [];
    this.url = Global.url;  
  }
  ngOnInit(): void {
    this.getProject();
  }

  getProject(){
    this._projectService.getProjects().subscribe(
      Response => {
        if(Response.projects){
          this.projects = Response.projects;
        }
        //console.log(Response);
      },
      error =>{
        console.log(<any>error)
      }
    );
  }
}
