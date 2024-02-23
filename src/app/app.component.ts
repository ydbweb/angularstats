import { Component, ViewChild } from '@angular/core';
import { StatsservService } from './statsserv.service';
import { BarchartComponent } from './barchart/barchart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularstats1';
  isLoading : any = [];
  listMainItems : any = [];
  listItemsWithData : any = [];
  listItemsWithDataTop : any = [];
  listItemsLeft1 : any = [];
  listItemsLeft2 : any = [];
  listItemsLeftNames : any = [];
  listItemsLeftNamesWithData : any = [];
  listItemsLeftNamesSelected : any = [];
  mainitemid : any;
  itemid : any;
  model = {check1 : "1", name: "geek1", data1: 24 }
  titlerightpane = {titlemainitem : "1", titleitem: "geek1" }

  @ViewChild(BarchartComponent)
  private bcchart!: BarchartComponent;




  constructor(private statsservService : StatsservService) { }

  ngOnInit(): void {
    this.isLoading = [];
    this.isLoading[0]=1;
    this.mainitemid=23728;
    this.itemid=23729;
    this.getMainItems(true);
  }

  clickItemId(itemid : string){
    this.itemid=parseInt(itemid);
    this.getMainItems(false);
  }

  setMainitemidRefreshListing(mainitemid : string){
    this.mainitemid=mainitemid;
    this.getMainItems(true);
  }

  clickNameAddToGraphArray(data : any){
     this.model = data;
     var that=this;

     this.listItemsLeftNamesWithData=this.listItemsLeftNamesWithData.filter(function (el : any) {
       return el["name"]!=that.model.name;
     });

     if (this.model.check1=="1"){
       var brightness=4;
       var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
       var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
       var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
       var taby = {"name" : this.model.name ,"value" : this.model.data1 ,"color" : "rgb(" + mixedrgb.join(",") + ")"} ;
       this.listItemsLeftNamesWithData.push(taby);
     }
     this.bcchart.setMainBarchart(this.listItemsLeftNamesWithData);

  }

  getMainItems(fetchfirstid : any) {
    this.isLoading[0]=0;
    this.statsservService.getMainItems().subscribe((res : any)=>{
                var that=this;
                if (fetchfirstid){
                  var tmp = res.filter(function (el : any) {
                    return parseInt(el.id)==parseInt(that.mainitemid);
                  });
                  this.itemid=tmp[0].itemid;
                }

                this.listMainItems = res.filter((arr : any, index : any, self : any) =>
                         index === self.findIndex((t : any) => (t.name === arr.name)))

                this.isLoading[0]=1;
                this.getItemsAndData();
                this.setChoiceItems();
                this.setChoiceItemsNames();
                this.setChoiceItemsDatas();
                this.getItemsAndMainItemName();
    });
  }

  getItemsAndData() {
    this.isLoading[1]=0;
    this.statsservService.getItemsAndData(this.mainitemid).subscribe((res : any)=>{
                this.listItemsWithDataTop = this.multidTop(res);
                this.listItemsWithData = this.multid(res,1);
                this.isLoading[1]=1;
    });
  }

  setChoiceItems() {
    this.isLoading[2]=0;
    this.statsservService.getChoiceItems(this.mainitemid).subscribe((res : any)=>{
                const middleIndex = Math.ceil(res.length / 2);
                const firstHalf = res.splice(0, middleIndex);
                const secondHalf = res.splice(-middleIndex);
                this.listItemsLeft1 = firstHalf;
                this.listItemsLeft2 = secondHalf;
                this.isLoading[2]=1;
    });
  }

  setChoiceItemsNames() {
    this.isLoading[3]=0;
    this.statsservService.getChoiceItemsDatas(this.mainitemid,this.itemid).subscribe((res : any)=>{
                this.listItemsLeftNames = this.multid(res,0);
                this.isLoading[3]=1;
    });
  }

  setChoiceItemsDatas() {
    this.isLoading[4]=0;
    this.statsservService.getChoiceItemsDatas(this.mainitemid,this.itemid).subscribe((res : any)=>{
                this.isLoading[4]=1;
                this.listItemsLeftNamesWithData=this.selectRandomely(res);
                this.listItemsLeftNamesSelected=[];
                this.listItemsLeftNamesSelected=this.listItemsLeftNamesWithData.map(function (el : any) {
                  return el[0]["id"];
                });
                var tmp :  any;
                var that = this;
                this.listItemsLeftNamesWithData=this.listItemsLeftNamesWithData.map(function (el : any) {
                  var brightness=4;
                  var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
                  var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
                  var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
                  return {"name" : el[0]["data"] ,"value" : el[1]["data"] ,"color" : "rgb(" + mixedrgb.join(",") + ")"} ;
                });
                this.listItemsLeftNamesWithData=this.listItemsLeftNamesWithData.filter(function (el : any) {
                  return el["value"]!="" && parseInt(el["value"]) > 0;
                });
                this.bcchart.setMainBarchart(this.listItemsLeftNamesWithData);

    });
  }

  getItemsAndMainItemName() {
    this.isLoading[5]=0;
    this.statsservService.getItemsAndMainItemName(this.itemid).subscribe((res : any)=>{
                this.titlerightpane = {titlemainitem : res[0].mainitemname, titleitem: res[0].itemname }
                this.isLoading[5]=1;
    });
  }

  selectRandomely(tab : any){
    tab=this.multid(tab,0);
    const shuffled = tab.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 20);
    return selected;
  }

  transpose(a :  any) {
      return Object.keys(a[0]).map(function(c) {
          return a.map(function(r : any) { return r[c]; });
      });
  }

  multidTop(res : any){
    var prev=0;
    var j=-1;
    var buffer : any = [];
    for (let i=0;i<res.length;i++){
      if (res[i].item.id!=prev){
        prev=res[i].item.id;
        j++;
        buffer[j]=res[i];
      }
    }
    return buffer;
  }

  multid(res : any, jbinit : number){
    var prev=0;
    var buffer : any = [];
    var bufferfinal : any = [];
    var j=-1;
    var jb=0;
    for (let i=0;i<res.length;i++){
      if (res[i].item.id!=prev){
        prev=res[i].item.id;
        j++;
        buffer[j] = [];
        jb=jbinit;
      }
      buffer[j][jb]=res[i];
      jb++;
    }


    return this.transpose(buffer);

  }
}
