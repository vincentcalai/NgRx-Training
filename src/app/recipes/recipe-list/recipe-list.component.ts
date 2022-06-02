import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output()
  recipeWasSelected = new EventEmitter<Recipe>();

  recipes:Recipe[] = [
    new Recipe('A Test Recipe', 'Testing desc of recipe', 
    'https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg?quality=90&webp=true&resize=300,272'),
    new Recipe('Another Test Recipe', 'Testing desc of recipe', 
    'https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg?quality=90&webp=true&resize=300,272')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedRecipe(recipe: Recipe){
    console.log(recipe);
    this.recipeWasSelected.emit(recipe);
  }

}
