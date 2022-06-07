import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { RecipeService } from "../recipes/recipe.service";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientEvent = new Subject<Ingredient[]>();

    startedEditing = new Subject<number>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];


    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(addedIngredient: Ingredient){
        this.ingredients.push(addedIngredient);
        this.ingredientEvent.next(this.ingredients.slice());
    }  

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientEvent.next(this.ingredients.slice());
    }

    updateIngredient(index: number, ingredient: Ingredient){
        this.ingredients[index] = ingredient;
        this.ingredientEvent.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientEvent.next(this.ingredients.slice());
    }
}