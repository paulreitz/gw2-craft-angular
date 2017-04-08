import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SearchService } from '../../../services/search.service';
import { ItemModel } from '../../../models/item.model';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  isSearching: boolean = false;
  items: ItemModel[] = [];
  isSeachingSubscription: Subscription;
  emptySearchResults: string;


  constructor(
    private resx: LanguageService,
    private searchService: SearchService
    ) { }

  ngOnInit() {
    this.emptySearchResults = this.resx.getString("display-empty");
    this.isSeachingSubscription = this.searchService.getIsSearching().subscribe(searching => {
      this.isSearching = searching;
      if (!this.isSearching) {
        this.items = this.searchService.getItems();
      }
    });
    if (this.searchService.getCount()) {
      this.items = this.searchService.getItems();
    }
    else {
      this.isSearching = true;
    }
  }

}
