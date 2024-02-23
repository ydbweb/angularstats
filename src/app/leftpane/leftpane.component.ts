import { Component, OnInit , Input, Output, EventEmitter,ViewChildren,QueryList,ElementRef } from '@angular/core';


@Component({
  selector: 'app-leftpane',
  templateUrl: './leftpane.component.html',
  styleUrls: ['./leftpane.component.css']
})
export class LeftpaneComponent implements OnInit {
  @Input() listMainItems :any = [];
  @Input() listItemsLeft1 :any = [];
  @Input() listItemsLeft2 :any = [];
  @Input() listItemsLeftNames :any = [];
  @Input() listItemsLeftNamesWithData : any = [];
  @Input() listItemsLeftNamesSelected : any = [];
  @Input() itemid :any = [];
  @Output() refreshRight = new EventEmitter<string>();
  @Output() clickItemId = new EventEmitter<string>();
  @Output() clickNameAddToGraphArray : EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>

  constructor() { }

  ngOnInit(): void {
  }

  refreshRightc(mainitemid : string) {
    this.refreshRight.emit(mainitemid);
  }

  clickItemIdc(mainitemid : string) {
    this.clickItemId.emit(mainitemid);
  }

  clickNameAddToGraphArrayc(check1 : any,name : string, data1 : string) {
    var xt=check1.target.checked;
    check1 = xt ? "1" : "0";
    this.clickNameAddToGraphArray.emit({check1, name, data1});
  }

  getRandomInt(max:any) {
    return Math.floor(Math.random() * max);
  }

  mathrandom(){
    if (this.checkboxes!==undefined){
    this.checkboxes.forEach((element) => {
      console.log(element);
      if (this.listItemsLeftNamesSelected.includes(element.nativeElement.value))
      element.nativeElement.checked = true;
      else
      element.nativeElement.checked = false;
    });
  }
  }

}
