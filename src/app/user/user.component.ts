import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username: string = '';
  isTextEmpty: boolean = true;

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

}
