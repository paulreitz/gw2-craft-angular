import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { ItemModel } from '../../../models/item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  itemList: Array<{item: ItemModel, count: number}>;

  constructor(
    private recipeService: RecipeService
  ){}

  ngOnInit() {
    var itemCounts = this.recipeService.getBaseMaterials();
    this.itemList = [];
    for (var key in itemCounts) {
      var itemCount = itemCounts[key];
      this.itemList.push({item: itemCount.item, count: itemCount.count});
    }
  }

  getWikiLink(item:ItemModel):string {
    var url: string = "https://wiki.guildwars2.com/wiki/";
    url += item.name.replace(" ", "_");
    return url;
  }

}
