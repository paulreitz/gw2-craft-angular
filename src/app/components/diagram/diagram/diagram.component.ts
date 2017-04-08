import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/switchMap';

import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css'],
  providers: [RecipeService]
})
export class DiagramComponent implements OnInit {

  isSearching: boolean = true;
  isSearchingSubscription: Subscription;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.isSearchingSubscription = this.recipeService.getIsSearching().subscribe(searching => {
      this.isSearching = searching;
    });
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.recipeService.doSearch(this.id);
    })
  }

}
