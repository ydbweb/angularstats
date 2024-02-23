import { Component, OnInit , Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  @Input() listItemsWithData :any = [];
  @Input() listItemsWithDataTop :any = [];

  sortbool : any;

  constructor() {this.sortbool=false; }

  ngOnInit(): void {

  }

  log(val:any) { console.log(val); }


  sort(colName : any,type : any) {
    if (type!=0){
      console.log("colname"+type+"type"+type);
      if (this.sortbool==false){
        this.sortbool=true;
        this.listItemsWithData.sort((a:any, b:any) => (parseFloat(a[colName].data!=""?a[colName].data:-20000000000) > parseFloat(b[colName].data!=""?b[colName].data:-20000000000)) ? 1 : -1)
      }else{
        this.sortbool=false;
        this.listItemsWithData.sort((a:any, b:any) => (parseFloat(b[colName].data!=""?b[colName].data:-20000000000) > parseFloat(a[colName].data!=""?a[colName].data:-20000000000)) ? 1 : -1)
      }
    }
    if (type==0){
      if (this.sortbool==false){
        this.sortbool=true;
        this.listItemsWithData.sort((a:any, b:any) => (b[colName].data > a[colName].data) ? 1 : -1)
      }else{
        this.sortbool=false;
        this.listItemsWithData.sort((a:any, b:any) => (a[colName].data > b[colName].data) ? 1 : -1)
      }
    }
  }


}
