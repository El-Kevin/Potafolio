import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  //cargo los servicios en la propiedad providers
  providers: [ProjectService]
})

export class CreateComponent implements OnInit{
  public title: string;
  public project: Project;

  constructor(
    private _projectService: ProjectService
  ){
    this.title = "Crear Proyeto"
    this.project = new Project('','','','','2019','','');
  }
  ngOnInit(): void {
    
  }
  onSubmit(form: any){
    console.log(this.project);
  }

}
