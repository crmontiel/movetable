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
  @HostListener('mousedown', ['$event.target'])
  onMouseDown(event) {
    // we make sure only draggables on the document elements are selected
    // console.log('mousedown');
    // console.log(event.parentNode.id)
    this.itemMoviendo = document.getElementById("mydiv")
    this.xMouse = window.event["clientX"];
    // if(this.itemMoviendo.offsetLeft<=this.xMouse){
    this.pos = this.itemMoviendo.offsetLeft + (this.xMouse - this.itemMoviendo.offsetLeft)
    // }


    // this.w = this.itemMoviendo.offsetWidth
    // this.pos=this.xMouse
    // this.itemMoviendo = document.getElementById(event.parentNode.id)
    // if (event) {

    // this.selectedElement = event.target;
    // console.log(this.itemMoviendo)

    // ##### add this code.
    // event.preventDefault();    // choose one
    // ##### or add this code.
    // return false;    // choose one
    // }

  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    // console.log("###")
    let x = window.event["clientX"];
    let y = window.event["clientY"];
    // console.log(String(this.itemMoviendo) !== 'undefined')
    console.log("###")
    if (String(this.itemMoviendo) !== 'undefined') {

      // this.itemMoviendo.style.top = x + "px";
      // this.itemMoviendo.style.left = y + "px";


      this.itemMoviendo.style.top = y + "px"
      this.itemMoviendo.style.left = this.pos + (x - this.pos) + "px"
      // this.itemMoviendo.style.left = x - (this.w / 2) + "px"

    }
  }

  @HostListener('mouseup', ['$event.target'])
  onMouseUp(event) {

    // if (this.itemMoviendo != '' || this.itemMoviendo != undefined) {
    this.itemMoviendo = 'undefined'
    document.onmouseup = null;
    document.onmousemove = null;
    // }
  }







  constructor() {

  }


  ngOnInit() {
    this.dragElement(document.getElementById("mydiv"));
  }

  pos1 = 0;
  pos2 = 0;
  pos3 = 0;
  pos4 = 0;
  elmnt


  dragElement(item) {
    console.log("#1")
    let d = document.getElementById(item.id + "header")

    if (document.getElementById(item.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      console.log("#")
      // document.getElementById(item.id + "header").onmousedown = this.dragMouseDown('d');
      console.log("#")

    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      this.elmnt.onmousedown = this.dragMouseDown;
    }
  }

  dragMouseDown(e: any) {
    console.log("#2")
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmouseup = this.closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = this.elementDrag;
  }

  elementDrag(e) {
    console.log("#3")
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    // set the element's new position:
    this.elmnt.style.top = (this.elmnt.offsetTop - this.pos2) + "px";
    this.elmnt.style.left = (this.elmnt.offsetLeft - this.pos1) + "px";
  }

  closeDragElement() {
    console.log("#4")
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }


}
