import { Component, OnInit , Input, Output, EventEmitter,ViewChildren,QueryList,ElementRef } from '@angular/core';


@Component({
  selector: 'app-leftpane',
  templateUrl: './leftpane.component.html',
  styleUrls: ['./leftpane.component.css']
})
export class LeftpaneComponent implements OnInit {
  @Input() listMainItems :any = [];
  @Input() listItemsLeft :any = [];
  @Input() listItemsLeftNames :any = [];
  @Input() listItemsLeftNamesWithData : any = [];
  @Input() listItemsLeftNamesSelected : any = [];
  @Input() itemid :any = [];
  @Output() refreshRight = new EventEmitter<string>();
  @Output() clickItemId = new EventEmitter<any>();
  @Output() clickNameAddToGraphArray : EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>

  constructor() { }

  ngOnInit(): void {
  }

  refreshRightc(mainitemid : string) {
    this.refreshRight.emit(mainitemid);
  }

  clickItemIdc(check1:any,itemid : any, numbitem: any) {
    this.clickItemId.emit({check1,itemid,numbitem});
  }


}
