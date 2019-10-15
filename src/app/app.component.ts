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
      let largo
      if (tabla1.x > tabla2.x) {
        largo = await (tabla2.x - (tabla1.x + tabla1.w)) / 2
      } else {

        largo = await (tabla2.x - (tabla1.x + tabla1.w)) / 2

      }

      // let largo = Math.sqrt(((tabla2.x - tabla1.x) * (tabla2.x - tabla1.x)) + ((tabla2.y - tabla1.y) * (tabla2.y - tabla1.y)));

      item.px = `${tabla1.x + tabla1.w},${tabla1.fk}
                 ${tabla1.x + tabla1.w + largo},${tabla1.fk}
                 ${tabla1.x + tabla1.w + largo},${tabla2.fk}
                 ${tabla2.x},${tabla2.fk}
                `
    })
  }

}
