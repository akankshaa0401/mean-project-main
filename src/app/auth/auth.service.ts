import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Authdata } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
constructor(private http: HttpClient, private router: Router) {}
createUser(email:string,password:string){
    const authData:Authdata={email:email,password:password}
    this.http.post("http://localhost:3000/api/user/signup",authData)
    .subscribe(response=>{
        console.log(response)
    })
}
}