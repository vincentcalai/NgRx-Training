import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f')
  slForm : NgForm
  subscription : Subscription;

  editMode = false;
  editItemIndex : number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }
 

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe( (index: number) => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(this.editItemIndex);
      this.slForm.setValue({
        'name' : this.editedItem.name,
        'amount' : this.editedItem.amount
      })
    })
  }

  onSubmit(form: NgForm){
    const value = form.value;
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editItemIndex, new Ingredient(value.name, value.amount));
    } else{
      this.shoppingListService.addIngredient({name: value.name, amount: value.amount});
    }
    this.editMode = false;
    form.reset();
  }

  deleteItem(){
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.clearForm();
  }

  clearForm(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
