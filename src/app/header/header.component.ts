import {Component, OnInit, Renderer2} from '@angular/core';
import { sessionStorage } from '../localstorage.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  
  login_data:any = {};
  constructor(private renderer: Renderer2,public session:sessionStorage,public router:Router,public dialog:DialogComponent) { 
    this.login_data = this.session.getSession();
    this.login_data = this.login_data.value;
    this.login_data = this.login_data.data;
    console.log(this.login_data);
  }
  
  ngOnInit() {
  }
  
  status:boolean = false;
  toggleHeader() {
    this.status = !this.status;
    if(this.status) {
      this.renderer.addClass(document.body, 'nav-active');
    }
    else {
      this.renderer.removeClass(document.body, 'nav-active');
    }
  }
  
  status1:boolean = false;
  toggleNav() {
    this.status1 = !this.status1;
    if(this.status1) {
      this.renderer.addClass(document.body, 'active');
    }
    else {
      this.renderer.removeClass(document.body, 'active');
    }
  }
  
  logout()
  {
    this.dialog.confirm("Logout").then((result) => {
      if(result)
      {
        this.session.LogOutSession();
    this.router.navigate(['']);
      }
  });
    
  }
}
