import { Component, Renderer2 } from '@angular/core';
import { DatabaseService } from 'src/_services/DatabaseService'
import { AuthGuard } from './auth.guard';
import { sessionStorage } from './localstorage.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
// import
// import { LocalStorage } from './localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'abacusdesk';
  login_data:any={};
  kei_user:any;

  constructor(public serve:DatabaseService,public session:sessionStorage,public router:Router,public renderer:Renderer2,private bnIdle: BnNgIdleService){
    
    console.log(this.serve.can_active);
    console.log("can");
    this.session.getSession()
    .subscribe(resp=>{
      console.log(resp);
      this.login_data = resp.data;
    });
  }
  ngOnInit(): void {
console.log("hlo")

    this.bnIdle.startWatching(3600).subscribe((isTimedOut: boolean) => {
      console.log("hlo1")

      if (isTimedOut) {
        console.log('session expired');
        this.session.LogOutSession();
        this.router.navigate(['']);

        this.kei_user = JSON.parse(localStorage.getItem('st_user')) || [];

        console.log(this.kei_user);


        this.kei_user = {};
        this.kei_user.st_log = false;

        localStorage.removeItem('st_user');


      }

    });

  };
}
