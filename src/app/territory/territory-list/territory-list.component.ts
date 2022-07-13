import { Component, OnInit } from '@angular/core';
import { slideToTop } from '../../router-animation/router-animation.component';

@Component({
  selector: 'app-territory-list',
  templateUrl: './territory-list.component.html',
  animations: [slideToTop()]

})
export class TerritoryListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
