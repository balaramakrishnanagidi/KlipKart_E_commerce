import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgIf, LayoutComponent, RouterOutlet]
})
export class AppComponent implements OnInit{
  title = 'klipkart';

  constructor( private router: Router, 
    private bnIdle: BnNgIdleService,
    private toastr: ToastrService){}

  isLoginPage = false;

  ngOnInit(): void {
   
    this.bnIdle.startWatching(120).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        this.toastr.error('Login again', 'Session Expired!',{ positionClass: 'toast-top-center' });
        sessionStorage.removeItem("user_token");
        this.router.navigate(['/login']);
        this.bnIdle.stopTimer();
      }
    });

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.isLoginPage = event.url === '/login';
      }
    });
  }


}
