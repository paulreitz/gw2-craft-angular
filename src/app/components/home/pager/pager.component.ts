import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  showPager: boolean = false;
  itemsLabel: string = "";
  pages: Array<number> = [];
  page: number = 1;
  isFirstPage: boolean = false;
  isLastPage: boolean = false;
  private pageLimit = 10;
  private totalPages: number = 1;

  private isSearchingSubscription: Subscription;

  constructor(
    private resx: LanguageService,
    private searchService: SearchService
  ){}

  ngOnInit() {
    this.isSearchingSubscription = this.searchService.getIsSearching().subscribe(searching => {
      this.showPager = !searching && this.searchService.getCount() > 0;
      if (this.showPager) {
        this.page = this.searchService.getParams().page || 1;
        this.setLabel();
        this.setPageArray();
      }
    });
    if (this.searchService.getCount() > 0) {
      this.showPager = true;
      this.page = this.searchService.getParams().page || 1;
      this.setLabel();
      this.setPageArray();
    }
  }

  isCurrentPage(page:number):boolean {
    return page === this.page;
  }

  pageSelected(page:number): void {
    if (!this.isCurrentPage(page)) {
      var params = this.searchService.getParams();
      params.page = page;
      this.searchService.doSearch(params);
    }
  }

  firstPage() {
    if (this.page !== 1) {
      var params = this.searchService.getParams();
      params.page = 1;
      this.searchService.doSearch(params);
    }
  }

  previousPage() {
    if (this.page !== 1) {
      var params = this.searchService.getParams();
      params.page = this.page - 1;
      this.searchService.doSearch(params);
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      var params = this.searchService.getParams();
      params.page = this.page + 1;
      this.searchService.doSearch(params);
    }
  }

  lastPage() {
    if (this.page < this.totalPages) {
      var params = this.searchService.getParams();
      params.page = this.totalPages;
      this.searchService.doSearch(params);
    }
  }

  private setLabel(): void {
    var total:number = this.searchService.getCount();
    var limit:number = this.searchService.getParams().limit || 20;
    var fromNumber:number = ((this.page -1) * limit) + 1;
    var toNumber:number = this.page * limit;
    toNumber = (toNumber < total)? toNumber : total;
    this.itemsLabel = this.resx.getFormatedString("pager-items", [fromNumber, toNumber, total]);
  }

  private setPageArray(): void {
    this.pages = [];
    var total = this.searchService.getCount();
    var limit = this.searchService.getParams().limit || 20;
    var totalPages = (Math.ceil(total / limit));
    var upperPage = (Math.ceil(this.page / this.pageLimit)) * this.pageLimit;
    var lowerPage = upperPage - (this.pageLimit - 1);
    upperPage = (upperPage < totalPages)? upperPage : totalPages;
    this.isFirstPage = this.page === 1;
    this.isLastPage = this.page === totalPages;
    this.totalPages = totalPages;
    for (var i = lowerPage; i <= upperPage; i++) {
      this.pages.push(i);
    }
  }

}
