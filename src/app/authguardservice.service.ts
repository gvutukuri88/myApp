import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardserviceService implements CanActivate{

  constructor() { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {

    if(sessionStorage.getItem("userDetails")){
      console.log(sessionStorage.getItem("userDetails"))
      return true
    }
    return false
      
  }
}
