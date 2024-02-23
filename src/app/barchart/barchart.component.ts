import { ElementRef, ViewChild, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

    @ViewChild('canvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;

    @Input() listItemsLeftNamesWithData : any = [];
    @Input() titlerightpane : any;

    canvasheight : any;
    canvaswidth : any;
    interval : any;
    ctx :  any;
    backgroundcolor : any;
    fontcolor :  any;
    linecolor : any;



    ngOnInit(): void {
      this.canvasheight=220;
      this.canvaswidth=750;
      this.interval=5;
      this.backgroundcolor = "#FFFFFF";
      this.fontcolor = "#000000";
      this.linecolor = "#000000";
    }


    constructor() {

    }

    setMainBarchart(maindata : any){
      this.draw(maindata);
    }

    sortUp() {
      this.listItemsLeftNamesWithData.sort((a:any, b:any) => (parseFloat(a.value!=""?a.value:-20000000000) > parseFloat(b.value!=""?b.value:-20000000000)) ? 1 : -1)
      this.draw(this.listItemsLeftNamesWithData);
    }

    sortDown() {
      this.listItemsLeftNamesWithData.sort((a:any, b:any) => (parseFloat(b.value!=""?b.value:-20000000000) > parseFloat(a.value!=""?a.value:-20000000000)) ? 1 : -1)
      this.draw(this.listItemsLeftNamesWithData);
    }

    sortAlphabetic() {
      this.listItemsLeftNamesWithData.sort((a:any, b:any) => (b.name < a.name) ? 1 : -1)
      this.draw(this.listItemsLeftNamesWithData);
    }

    sortAlphabeticCba() {
      this.listItemsLeftNamesWithData.sort((a:any, b:any) => (b.name > a.name) ? 1 : -1)
      this.draw(this.listItemsLeftNamesWithData);
    }


    draw(maindata : any){
      var canvas = <HTMLCanvasElement>document.getElementById("canvas");
      this.ctx = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
      //this.ctx = this.canvas.nativeElement.getContext('2d');

      this.ctx.resetTransform();
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.translate(0, 0);

      let canheight = this.canvasheight;
      let canwidth = this.canvaswidth;

      let multiply = maindata.length;
      let barwidth=Math.round(((canwidth-35) / multiply));


      this.canvas.nativeElement.height = canheight;
      this.canvas.nativeElement.width =  canwidth;

      this.ctx.fillStyle = this.backgroundcolor;
      this.ctx.fillRect(0, 0, canwidth, canheight);
      let interval=parseInt(this.interval);

      this.ctx.fillStyle = this.linecolor;
      this.ctx.translate(0, 0);
      this.ctx.fillRect(10, -15, 2,  canheight);
      this.ctx.textAlign = "center";

      let y=canheight;
      let step=70;
      this.ctx.translate(0, 0);
      this.ctx.fillStyle = this.linecolor;
      this.ctx.fillRect(4, 200, canwidth,  2);
      this.ctx.translate(0, 0);

      for (let b=0;b<5;b++){
        this.ctx.fillStyle = this.linecolor;
        this.ctx.fillRect(4, 200-(b*step), 6,  2);
      }

      let max2 = maindata.reduce((op : any, item : any) => op = op > parseInt(item.value) ? op : parseInt(item.value), 0);
      this.ctx.translate(0, 0);
      let x=14;
      for (let b=0;b<multiply;b++){
        this.ctx.translate(0, 0);
        this.ctx.fillStyle = maindata[b]["color"];
        let perc=Math.round((maindata[b]["value"]/max2)*100);
        let val=(180/100)*perc;
        this.ctx.fillRect(x+(b*barwidth), 200, barwidth,  -(val));
      }












    }

}
