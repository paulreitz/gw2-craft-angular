import { Component, OnInit } from '@angular/core';
import { TypesModel } from '../../../models/types.model';
import { LanguageService } from '../../../services/language.service';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  filterLabel: string;
  typeLabel: string;
  subTypeLabel: string;
  rarityLabel: string;
  levelLabel: string;
  searchLabel: string;

  types: Array<{type: string, value: number}>;
  subTypes: Array<{type: string, value: number}>;
  rarities: Array<{type: string, value: number}>;
  levels: Array<number>;

  searchParams = {
    type: -1,
    subType: -1,
    rarity: -1,
    level: 1,
    page: 1
  }

  constructor(
    private resx: LanguageService,
    private searchService: SearchService
    ) {}

  ngOnInit() {
    this.filterLabel = this.resx.getString("search-filter");
    this.typeLabel = this.resx.getString("search-type");
    this.subTypeLabel = this.resx.getString("search-subType");
    this.rarityLabel = this.resx.getString("search-rarity");
    this.levelLabel = this.resx.getString("search-level");
    this.searchLabel = this.resx.getString("search-label");

    this.types = [];
    TypesModel.baseTypes.forEach((type:string, index: number) => {
      this.types.push({ type: type, value: index });
    });
    this.types.unshift({ type: "All", value: -1 });

    this.subTypes = [{ type: "All", value: -1 }];

    this.rarities = [];
    TypesModel.baseRarities.forEach((type: string, index: number) => {
      this.rarities.push({ type: type, value: index });
    });
    this.rarities.unshift({ type: "All", value: -1 });

    this.levels = [];
    for (var i:number = 1; i <= 80; i++) {
      this.levels.push(i);
    }

    if (this.searchService.getCount() === 0) {
      this.doSearch();
    }
  }

  setSubType() {
    var val = this.searchParams.type;
    this.subTypes = [];
    if (val > -1) {
      var t = TypesModel.baseTypes[val];
      this.subTypes = TypesModel.subTypes[t];
    }
    this.subTypes.unshift({ type: "All", value: -1 });
    this.searchParams.subType = -1;
  }

  doSearch() {
    this.searchParams.page = 1;
    this.searchService.doSearch(this.searchParams);
  }

}
