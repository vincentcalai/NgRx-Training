import { EventEmitter, Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientEvent = new EventEmitter<Ingredient[]>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];


    getIngredient(){
        return this.ingredients.slice();
    }

    addIngredient(addedIngredient: Ingredient){
        this.ingredients.push(addedIngredient);
        this.ingredientEvent.emit(this.ingredients.slice());
    }  

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientEvent.emit(this.ingredients.slice());
    }
}