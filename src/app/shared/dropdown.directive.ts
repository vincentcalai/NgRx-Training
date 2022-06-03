import { Directive, HostBinding, HostListener, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective{

  //@Input() dropdownToggle: boolean;

  @HostBinding('class.open') isOpen : boolean = false;

  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  constructor() {

  }


}
