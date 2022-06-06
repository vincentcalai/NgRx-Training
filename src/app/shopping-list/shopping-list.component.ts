import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredient: Ingredient;

  ingredients: Ingredient[];

  subscription : Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredient();
    this.subscription = this.shoppingListService.ingredientEvent.subscribe(
       (ingredientsArr: Ingredient[]) => this.ingredients = ingredientsArr
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
