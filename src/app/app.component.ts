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
    if (event.id.includes('mydivheader')) {
      this.itemMoviendo = document.getElementById(event.parentNode.id)
    }
    this.xMouse = window.event["clientX"];
    this.pos = this.itemMoviendo.offsetLeft + (this.xMouse - this.itemMoviendo.offsetLeft)
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    let x = window.event["clientX"];
    let y = window.event["clientY"];
    if (String(this.itemMoviendo) !== 'undefined') {

      this.itemMoviendo.style.top = y + "px"
      this.itemMoviendo.style.left = this.pos + (x - this.pos) + "px"
      // this.itemMoviendo.style.left = x - (this.w / 2) + "px"

    }
  }

  @HostListener('mouseup', ['$event.target'])
  onMouseUp(event) {
    this.itemMoviendo = 'undefined'
    document.onmouseup = null;
    document.onmousemove = null;

  }


  constructor() {

  }


  ngOnInit() {

  }






}
