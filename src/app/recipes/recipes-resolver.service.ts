import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesAction from '../recipes/store/recipe.action';
import { take, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //const recipes = this.recipeService.getRecipes();
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => {
        return recipesState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesAction.FetchRecipes());
          return this.actions$.pipe(ofType(RecipesAction.SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
    this.store.dispatch(new RecipesAction.FetchRecipes());
    return this.actions$.pipe(ofType(RecipesAction.SET_RECIPES), take(1));
  }
}
