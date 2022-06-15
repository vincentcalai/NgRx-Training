import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import * as RecipeAction from '../store/recipe.action';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;

  id: number;
  editMode: boolean = false;

  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      //console.log(this.editMode);
      this.initForm();
    });
  }

  private initForm() {
    let recipeName: string = '';
    let recipeImagePath: string = '';
    let recipeDescription: string = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      //const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map((recipeState) => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((recipe) => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe.ingredients) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(
        new RecipeAction.UpdateRecipe({
          index: this.id,
          newRecipe: this.recipeForm.value,
        })
      );
    } else {
      //this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipeAction.AddRecipe(this.recipeForm.value));
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
