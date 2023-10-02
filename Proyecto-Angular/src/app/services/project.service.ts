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
    testService(){
        return 'Probando el servicio de angular'
    }
}
