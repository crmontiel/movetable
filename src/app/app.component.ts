import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dbtabledesign';
  itemMoviendo: any
  xMouse = 0
  w
  pos
  td = "PRUEBA DE DATA"
  @HostListener('mousedown', ['$event.target'])
  onMouseDown(event) {
    if (event.id.includes('mydivheader')) {
      this.itemMoviendo = document.getElementById(event.parentNode.id)
      this.xMouse = window.event["clientX"];
      this.pos = this.itemMoviendo.offsetLeft + (this.xMouse - this.itemMoviendo.offsetLeft)
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    let x = window.event["clientX"];
    let y = window.event["clientY"];
    if (String(this.itemMoviendo) !== 'undefined') {

      this.itemMoviendo.style.top = y + "px"
      this.itemMoviendo.style.left = this.pos + (x - this.pos) + "px"
      // this.itemMoviendo.style.left = x - (this.w / 2) + "px"



      var d1 = document.getElementById('fk1');
      var d2 = document.getElementById('fk2');
      console.log("++")
      console.log(d2.offsetTop)
      console.log("++")
      this.connect(d1, d2, "#0F0", 1, (x + this.itemMoviendo.offsetWidth));
    }
  }

  @HostListener('mouseup', ['$event.target'])
  onMouseUp(event) {
    this.itemMoviendo = 'undefined'
    document.onmouseup = null;
    document.onmousemove = null;

  }

  constructor() { }

  ngOnInit() { }

  ver() {
    console.log(this.td)
  }





  getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset,
      width: rect.width || el.offsetWidth,
      height: rect.height || el.offsetHeight
    };
  }


  connect(div1, div2, color, thickness, pd) {
    // console.log("-------------")
    // console.log(div1)
    // console.log("\n")
    // console.log("-------------")
    var off1 = div1;
    var pad = div1.parentNode
    var off2 = div2;
    console.log(off1.offsetLeft)
    // bottom right
    var x1 = off1.offsetLeft + off1.offsetWidth;
    var y1 = off1.offsetTop + off1.offsetHeight;
    // top right
    var x2 = off2.offsetLeft + off2.offsetWidth;
    var y2 = off2.offsetTop;
    // distance
    var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
    // make hr
    // var htmlLine = document.getElementById('linea');
    var dabajo
    // console.log(String(document.getElementById('abajo')))
    if (String(document.getElementById('abajo')) != 'null') {
      dabajo = document.getElementById('abajo')
    } else {
      // console.log("#lleno")
      dabajo = document.createElement('div')
      dabajo.setAttribute("id", 'abajo')
      document.getElementById('canvas').appendChild(dabajo)
    }
    // var dabajo = document.getElementById('abajo');
    //
    // style.top
    var l_recta = `
    padding:0px; margin:0px;
    height:${thickness}px;
    background-color:${color};
    line-height:1px;
    position:absolute;
    left:${pd}px;
    top:${cy - (cy / 2)}px;
    width:${length}px;
    `

    var l_iz = `
    padding:0px; margin:0px;
    height:${thickness}px;
    background-color:${color};
    line-height:1px;
    position:absolute;
    left:${cx}px;
    top:${cy - (cy / 2)}px;
    width:${25}px;
    `


    // -moz-transform:rotate(" + angle + "deg);
    // -webkit-transform:rotate(" + angle + "deg);
    // -o-transform:rotate(" + angle + "deg);
    // -ms-transform:rotate(" + angle + "deg);
    // transform:rotate(" + angle + "deg);


    // htmlLine.setAttribute('style', l_iz)
    console.log("##")
    dabajo.setAttribute('style', l_recta)


  }






}
