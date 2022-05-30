import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-comp',
  template: `<p>You are so successful!</p>`,
  styleUrls: ['./second-comp.component.css']
})
export class SecondCompComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
