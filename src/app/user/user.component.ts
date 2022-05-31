import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [` .morethan5 {
    color: 'white'
  }`]
})
export class UserComponent implements OnInit {

  username: string = '';
  isTextEmpty: boolean = true;
  showText: boolean = true;
  indexes: number[] = [];
  index: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  // checkText(username){
  //   if(username === ''){
  //     console.log("username is true");
  //     this.isTextEmpty = true;
  //   } else{
  //     console.log("username is false");
  //     this.isTextEmpty = false;
  //   }
  // }

  clearText(){
    this.username = '';
  }

  toggleText(){
    this.index = this.index+1;
    console.log(this.index);
    this.indexes.push(this.index);
    console.log(" line 39: " + this.index);
    this.showText = !this.showText;


  }

}
