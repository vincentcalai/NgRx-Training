import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

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

  constructor() { }

  ngOnInit(): void {
  }

  addIngre(name: HTMLInputElement){
    console.log(' name: ' + name.value + ' amount: ' + this.amount.nativeElement.value);
    const ingName = name.value;
    const ingAmount = this.amount.nativeElement.value;
    this.ingredientAdded.emit(new Ingredient(ingName, ingAmount));
  }

}
