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
  listItemsLeft : any[][] = [];
  listItemsLeftNames : any = [];
  listItemsLeftNamesWithData : any = [];
  listItemsLeftNamesSelected : any = [];
  mainitemid : any;
  itemid : any;
  numbitem : any;
  model = {check1 : "1", name: "geek1", data1: 24 }
  titlerightpane = {titlemainitem : "1", titleitem: "geek1" }

  @ViewChild(BarchartComponent)
  private bcchart!: BarchartComponent;




  constructor(private statsservService : StatsservService) { }

  ngOnInit(): void {
    this.isLoading = [];
    this.isLoading[0]=1;
    this.mainitemid=1;
    this.itemid=77;
    this.numbitem=0;
    this.getMainItems(true);
  }

  clickItemId(data : any){
    this.itemid=parseInt(data.itemid);
    console.log(this.itemid);
    this.numbitem=parseInt(data.numbitem);
    this.getMainItems(false);
  }

  setMainitemidRefreshListing(mainitemid : string){
    this.mainitemid=mainitemid;  
    this.getMainItems(true);
  }


  getcolor(){
    var brightness=4;
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return mixedrgb;
  }


  clickNameAddToGraphArray(data : any){
     this.model = data;
     var that=this;

     this.listItemsLeftNamesWithData=this.listItemsLeftNamesWithData.filter(function (el : any) {
       return el["name"]!=that.model.name;
     });

     if (this.model.check1=="1"){
       var brightness=4;
       var taby = {"name" : this.model.name ,"value" : this.model.data1 ,"color" : "rgb(" +  this.getcolor().join(",") + ")"} ;
       this.listItemsLeftNamesWithData.push(taby);
     }
     this.bcchart.setMainBarchart(this.listItemsLeftNamesWithData);

  }



  ListingclickNameAddToGraphArray(data : any){
    if (data.check1==0){
      this.listItemsLeftNamesWithData=this.listItemsLeftNamesWithData.filter(function(el:any) { return el.id != data.iditem; });
      this.listItemsLeftNamesSelected=this.listItemsLeftNamesSelected.filter(function(id:any) { return id != data.iditem; });
    }else{   
      var taby = {"id":data.iditem, "name" :data.name1 ,"value" : data.data ,"color" : "rgb(" +  this.getcolor().join(",") + ")"} ;
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
    this.statsservService.getChoiceItems(this.mainitemid).subscribe((res : any)=>{

                this.listItemsWithDataTop = res;
                this.isLoading[1]=1;
    });
    this.statsservService.getItemsAndData(this.mainitemid).subscribe((res : any)=>{
      var resultingarray : any[][] = [];
      let j=0;
      let itemid=-1;
      let i2=0;

      for (var i=0;i<res.length;i++){
        if (itemid!=res[i]["iditem"]){
          j++;
          i2=0;
          itemid=res[i]["iditem"];
        }

        if (resultingarray[i2]==undefined){
          resultingarray[i2]=new Array();
          resultingarray[i2][0]=res[i];
        }

        resultingarray[i2][j]=res[i];

        i2++;
      }

      this.listItemsWithData=resultingarray;

      var data;
      this.listItemsLeftNamesWithData=new Array();   
      this.listItemsLeftNamesSelected=new Array(); 
      for (i=0;i<Math.floor(Math.random() * 25)+5;i++){
        for (var b=0;b<1;b++){
          var v=Math.floor(Math.random() * resultingarray.length-1);
          var taby = {"id":resultingarray[v][b].id, "name":resultingarray[v][b].namedata ,"value":resultingarray[v][this.numbitem].data ,"color" : "rgb(" +  this.getcolor().join(",") + ")"} ;
          this.listItemsLeftNamesWithData.push(taby);   
          this.listItemsLeftNamesSelected.push(resultingarray[v][b].id);     
        }
      }


      this.bcchart.setMainBarchart(this.listItemsLeftNamesWithData);

      this.isLoading[1]=1;
    });
  }

  setChoiceItems() {
    this.isLoading[2]=0;
    this.statsservService.getChoiceItems(this.mainitemid).subscribe((res : any)=>{
//                const middleIndex = Math.ceil(res.length / 2);
//                const firstHalf = res.splice(0, middleIndex);
//                const secondHalf = res.splice(-middleIndex);
                this.listItemsLeft =res;
                this.isLoading[2]=1;
    });
  }

  setChoiceItemsNames() {
    this.isLoading[3]=0;
    this.statsservService.getChoiceItemsDatas(this.mainitemid,this.itemid).subscribe((res : any)=>{
                this.listItemsLeftNames = res;
                this.isLoading[3]=1;
    });
  }

  setChoiceItemsDatas() {
    this.isLoading[4]=1;
    /*
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
    */
  }

  getItemsAndMainItemName() {
    this.isLoading[5]=1;
    /*
    this.statsservService.getItemsAndMainItemName(this.itemid).subscribe((res : any)=>{
                this.titlerightpane = {titlemainitem : res[0].mainitemname, titleitem: res[0].itemname }
                this.isLoading[5]=1;
    });
    */
  }

  selectRandomely(tab : any){
    /*
    tab=this.multid(tab,0);
    const shuffled = tab.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 20);
    return selected;
    */
  }
}
