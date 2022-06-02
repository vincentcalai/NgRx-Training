import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTab: string = 'recipe';
  title = 'my-demo-app';

  onSelectTab(tab: string){
    console.log(tab);
    this.selectedTab = tab;
  }
}
