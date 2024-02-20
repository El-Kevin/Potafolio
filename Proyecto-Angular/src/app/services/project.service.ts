import { Injectable} from "@angular/core";
//Va a permitir hacer peticiones ajax a un servicio externo y modificar las cabeceras de esas peticiones
import { HttpClient, HttpHeaders } from "@angular/common/http";
//Recpger la informacion que devuelve el apirest
import { Observable } from "rxjs";
import { Project } from '../models/project';
import { Global } from "./global";
@Injectable()
export class ProjectService{
    public url:string;

    constructor(
        public _http: HttpClient
    ){
        this.url = Global.url;
    }
    /*
    testService(){
        return 'Probando el servicio de angular'
    }
*/
    saveProject(project: Project): Observable<any>{
        let params = JSON.stringify(project);
        let header = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url+'save-project', params,{headers: header});
    }

    getProjects(): Observable<any>{
        let header = new HttpHeaders().set('Content-type','application/json' );
        return this._http.get(this.url+'projects', {headers: header});

    }
    getProject(id: any): Observable<any>{
        let header = new HttpHeaders().set('Content-type','application/json');
        return this._http.get(this.url+'project/'+id, {headers: header});
    }

    deleteProject(id: any): Observable<any>{
        let header = new HttpHeaders().set('Content-type','application/json');
        return this._http.delete(this.url+'project/'+id, {headers:header});
    }
    updateProject(project: Project): Observable<any>{
        let params = JSON.stringify(project);
        let header = new HttpHeaders().set('Content-type','application/json');
        return this._http.put(this.url+'project/'+project._id,params, {headers:header});
    }
}
