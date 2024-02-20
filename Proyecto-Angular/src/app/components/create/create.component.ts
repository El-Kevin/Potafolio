import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  //cargo los servicios en la propiedad providers
  providers: [ProjectService, UploadService]
})

export class CreateComponent implements OnInit{
  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public saveProjectID:string;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ){
    this.title = "Crear Proyeto"
    this.project = new Project('','','','','2019','','');
    this.status = '';
    this.filesToUpload = new Array<File>;
    this.saveProjectID = '';
    this.url = Global.url;
  }
  ngOnInit(): void {
    
  }
  onSubmit(form: any){
    //console.log(this.project);
    //recoger lo que me devuelva el apirest
    this._projectService.saveProject(this.project).subscribe(
      response => {
        console.log(response)
        if(response.project){
          
          //Subir imagen
          this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [],this.filesToUpload,'image').
          then((result:any) => {
            console.log(result.project._id);
            this.status = 'sucess';
            form.reset();
          });
        }else{
          this.status = 'failed';
        }
      },
      err =>{
        console.log(<any>err)
      }
    );
  }
  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
