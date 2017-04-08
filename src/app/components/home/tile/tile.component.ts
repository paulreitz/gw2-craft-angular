import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ItemModel } from '../../../models/item.model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() item: ItemModel;
  name:string = "";
  cssClass: string = "";

  constructor(private router: Router) { }

  ngOnInit() {
    this.cssClass = this.item.rarity.toLowerCase();
    this.name = this.item.name.replace("&lsquo;", "'");
  }

  showDiagram() {
    let link = ["/diagram", this.item.id];
    this.router.navigate(link);
  }

}
