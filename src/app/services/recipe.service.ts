import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/toPromise';

import { RecipeModel } from '../models/recipe.model';
import { NodeModel } from '../models/node.model';
import { ItemModel } from '../models/item.model';

@Injectable()
export class RecipeService {
    private baseUrl = "http://xx.xx.xx.xx:1337/api/recipe/";
    private isSearching = new Subject<boolean>();
    private root: NodeModel;
    private recipe: RecipeModel;

    constructor(private http: Http) {}

    getIsSearching(): Observable<boolean> {
        return this.isSearching.asObservable();
    }

    getRootNode() :NodeModel {
        return this.root;
    }

    getBaseMaterials(): {[key:string]: {item: ItemModel, count: number}} {
        var items: {[key: string]: {item: ItemModel, count: number}} = {};
        this.root.getBaseMaterials(items);
        return items;
    }

    doSearch(id: number) {
        this.isSearching.next(true);
        var url = `${this.baseUrl}${id}`;
        this.http.get(url)
            .toPromise()
            .then(response => {
                this.recipe = response.json() as RecipeModel;
                this.root = new NodeModel(this.recipe.root);
                this.root.setChildren(this.recipe);
                this.isSearching.next(false);
            })
    }
}