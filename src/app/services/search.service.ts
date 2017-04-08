import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';

import { ItemModel } from '../models/item.model';

@Injectable()
export class SearchService {
    private baseUrl = "http://xx,xx,xx,xx:1337/api/";
    private isSearching = new Subject<boolean>();
    private items: ItemModel[] = [];
    private params: any;
    private total: number;

    constructor(private http: Http) {}

    getItems(): ItemModel[] {
        return this.items || [];
    }

    getCount(): number {
        return this.total || 0;
    }

    getParams(): any {
        return this.params || {};
    }

    getIsSearching(): Observable<boolean> {
        return this.isSearching.asObservable();
    }

    doSearch(params: any) {
        this.isSearching.next(true);
        this.params = params;
        this.params.page = params.page || 1;
        this.params.limit = params.limit || 20;
        var url = this.baseUrl + "items/" + this.buildQueryString();
        this.http.get(url)
            .toPromise()
            .then(response => {
                var responseObject = response.json();
                this.items = responseObject.results as ItemModel[];
                this.total = responseObject.total;
                this.isSearching.next(false);
            });
    }

    private buildQueryString(): string {
        var paramsList:Array<string> = [];
        var queryString = "";
        if (!isNaN(this.params.type) && this.params.type > -1){
            paramsList.push("type=" + this.params.type.toString(10));
        }
        if (!isNaN(this.params.subType) && this.params.subType > -1){
            paramsList.push("subType=" + this.params.subType.toString(10));
        }
        if (!isNaN(this.params.rarity) && this.params.rarity > -1) {
            paramsList.push("rarity=" + this.params.rarity.toString(10));
        }
        if (!isNaN(this.params.level)) {
            paramsList.push("min_level=" + this.params.level.toString(10));
        }
        if (!isNaN(this.params.page)) {
            paramsList.push("page=" + this.params.page.toString(10));
        }
        if (!isNaN(this.params.limit)) {
            paramsList.push("limit=" + this.params.limit.toString(10));
        }

        if (paramsList.length) {
            queryString = "?" + paramsList.join("&");
        }

        return queryString;
    }
}
