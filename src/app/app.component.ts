import { Component, OnInit, HostListener } from '@angular/core';
import { CargaDbService } from './http/carga-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dbtabledesign';
  idMoviendo: any;
  idTabla: any = {
    w: null,
    top: null,
    left: null
  };
  click: any = {
    x: null,
    y: null
  }



  xMouse = 0
  w
  pos
  data: any = []
  fks: any = []




  @HostListener('mousedown', ['$event.target'])
  onMouseDown(event) {
    if (event.id.includes('mydivheader')) {
      let div = document.getElementById(event.parentNode.id)
      div.classList.add('addzIndex')

      this.idTabla = {
        w: div.offsetWidth,
        top: div.offsetTop,
        left: div.offsetLeft,
        h: div.offsetHeight
      }
      this.click = {
        x: window.event["clientX"],
        y: window.event["clientY"]
      }

      // let mov

      // console.log(this.idTabla)
      this.idMoviendo = Number(event.getAttribute("data-id"))

      // this.xMouse = window.event["clientX"];
      // this.pos = this.itemMoviendo.offsetLeft + (this.xMouse - this.itemMoviendo.offsetLeft)
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    let x = window.event["clientX"];
    let y = window.event["clientY"];
    if (String(this.idMoviendo) !== 'undefined') {

      let calc_click_x = (this.idTabla.w - ((this.idTabla.left + this.idTabla.w) - this.click.x))
      let calc_click_y = (this.idTabla.h - ((this.idTabla.top + this.idTabla.h) - this.click.y))

      this.data[this.idMoviendo].style = {
        top: y - calc_click_y + "px",
        left: x - calc_click_x + "px"
      }
      this.generaPoligonos()

      // var d1 = document.getElementById('fk1');
      // var d2 = document.getElementById('fk2');
      // this.connect(d1, d2, "#0F0", 1, (x + this.itemMoviendo.offsetWidth));
    }
  }

  @HostListener('mouseup', ['$event.target'])
  onMouseUp(event) {

    let div = document.getElementById(event.parentNode.id)
    try {
      div.classList.remove('addzIndex')
    } catch (e) { }

    this.idMoviendo = 'undefined'
    document.onmouseup = null;
    document.onmousemove = null;

  }

  constructor(private _CargaDbService: CargaDbService) { }

  async ngOnInit() {
    this.data = await this._CargaDbService.cargaDb()["tablas"]
    this.fks = await this._CargaDbService.cargaDb()["fk"]
    /////////////+
    setTimeout(() => {
      this.generaPoligonos()
    }, 600)

  }

  log(i) {
    console.log(i)
  }


  ver() {
    // console.log(this.td)
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



  async  generaPoligonos() {
    // console.log(document)
    this.fks.forEach(async item => {
      let div1 = await document.getElementById(item.t1)
      let div2 = await document.getElementById(item.t2)
      //--------------------------------------
      let tabla1 = {
        x: div1.parentNode.parentNode["offsetLeft"],
        y: div1.parentNode.parentNode["offsetTop"],
        w: div1.parentNode.parentNode["offsetWidth"],
        fk: div1.offsetTop + (div1.offsetHeight / 2) + div1.parentNode.parentNode["offsetTop"]
      }
      let tabla2 = {
        x: div2.parentNode.parentNode["offsetLeft"],
        y: div2.parentNode.parentNode["offsetTop"],
        w: div2.parentNode.parentNode["offsetWidth"],
        fk: div2.offsetTop + (div2.offsetHeight / 2) + div2.parentNode.parentNode["offsetTop"]
      }
      let d = tabla1.x
      if (tabla2.x < tabla1.x) {
        console.log("#++-")
      } else {
        tabla1.x = tabla1.x + tabla1.w
        console.log("#////**+")
      }

      let largo

      if (tabla2.x < d) {

        largo = Math.sqrt(((tabla2.x - tabla1.x) * (tabla2.x - tabla1.x)) + ((tabla2.y - tabla1.y) * (tabla2.y - tabla1.y)));
        console.log("#1")
      } else {

        // largo = tabla2.x + (tabla2.x - tabla1.x);
        largo = Math.sqrt(((tabla1.x - tabla2.x) * (tabla1.x - tabla2.x)) + ((tabla1.y - tabla2.y) * (tabla1.y - tabla2.y)));
        console.log("#2")
      }
      console.log(largo)
      //
      let valLinea = tabla2.x < tabla1.x ? tabla1.x - (largo / 2) : tabla1.x + tabla1.w
      // let valLinea = tabla2.x < tabla1.x ? tabla1.x + largo / 2 : tabla1.x + tabla1.w


      let r = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')

      let inicio = tabla1.x + "," + tabla1.fk

      let finInicio = (tabla2.x < tabla1.x ? (valLinea / 2) : valLinea) + "," + tabla1.fk




      let medio = (tabla2.x < tabla1.x ? (valLinea / 2) : tabla2.x - (tabla2.x - tabla1.x)) + "," + tabla2.fk




      let final = (tabla2.x < tabla1.x ? tabla2.x + tabla2.w : tabla2.x) + "," + tabla2.fk






      // let finMedio = (tabla1.x + largo / 2) + "," + tabla2.fk

      // r.setAttribute('points', inicio + " " + finInicio + " " + medio + " " + final)

      // r.setAttribute('style', 'fill:none;stroke:black;stroke-width:1')

      // let d = document.getElementById("poligonos").append(r)
      item.px = inicio + " " + finInicio + " " + medio + " " + final

      // console.log(fk)
    })

  }


}
