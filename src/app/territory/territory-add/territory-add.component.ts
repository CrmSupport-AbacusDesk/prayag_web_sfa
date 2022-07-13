import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';

@Component({
  selector: 'app-territory-add',
  templateUrl: './territory-add.component.html',
  animations: [slideToTop()],
})
export class TerritoryAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  active:any = {};
  toggleterritory(key,action)
  {
    console.log(action);
    console.log(key);
    
    if(action == 'open')
    { this.active[key] = true; }
    if(action == 'close')
    { this.active[key] = false;}

    console.log(this.active);
  }
}
