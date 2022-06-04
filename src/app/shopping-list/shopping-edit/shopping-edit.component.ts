import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('amountInput')
  amount: ElementRef;
 
  @Output()
  ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngre(name: HTMLInputElement){
    console.log(' name: ' + name.value + ' amount: ' + this.amount.nativeElement.value);
    const ingName = name.value;
    const ingAmount = this.amount.nativeElement.value;
    this.shoppingListService.addIngredient({name:ingName, amount: ingAmount});
  }

}
