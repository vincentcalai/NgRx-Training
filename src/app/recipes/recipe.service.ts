
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    recipes:Recipe[] = [
        new Recipe('Hainanese Curry Rice', 'A Chinese favourite mixed rice dish', 
        'https://burpple-1.imgix.net/foods/1b88053d285d8c469e41276398_original.?w=645&dpr=1&fit=crop&q=80&auto=format'
            , [
               new Ingredient('Pork Chop', 5),
               new Ingredient('Egg', 1), 
               new Ingredient('Cabbage', 10)
              ]
        ),
        new Recipe('Dim Sum Afternoon Set', 'A Chinese Dim Sum dish served in the afternoon', 
        'https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/methode/2019/03/18/0871a798-40c0-11e9-b20a-0cdc8de4a6f4_image_hires_151120.jpg?itok=JmklqvQ4&v=1552893091'
            , [
                new Ingredient('Siew Mai', 3),
                new Ingredient('Pork Bun', 3), 
                new Ingredient('Polo Bun', 4),
                new Ingredient('Egg Tart', 5)
              ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService){}
    
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredients(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);    
    }

}