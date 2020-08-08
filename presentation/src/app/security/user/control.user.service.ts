import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
const URL_API = environment.ApiUrl;

@Injectable({
    providedIn: 'root'
})
export class ControlService {

    precatorios = new BehaviorSubject<boolean>(null);

    constructor(private http: HttpClient) { }


}
