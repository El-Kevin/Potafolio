import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public saveProjectID: string;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
  ){
    this.title = "Editar Proyecto";
    this.project = new Project('','','','','2019','','');
    this.status = '';
    this.filesToUpload = new Array<File>();
    this.saveProjectID = '';
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      console.log(id);
      this.getProject(id);
    });
  }

  getProject(id: any){
    this._projectService.getProject(id).subscribe(
      response => {
        console.log(response);
        this.project = response;
        console.log(this.project.name);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form: any){
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if(response.project){
          // Subir imagen si hay archivos para cargar
          if(this.filesToUpload.length > 0){
            this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.filesToUpload, 'image')
              .then((result:any) => {
                if(result && result.project && result.project._id){
                  this.status = 'sucess';
                  this.saveProjectID = result.project._id;
                } else {
                  this.status = 'failed';
                }
              })
              .catch(error => {
                console.log(error);
                this.status = 'failed';
              });
          } else {
            this.status = 'sucess';
            this.saveProjectID = response.project._id;
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(error);
        this.status = 'failed';
      }
    );
  }

  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
