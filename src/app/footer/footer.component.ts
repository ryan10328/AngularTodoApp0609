import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {
  moreThanFive: boolean;

  @Input('todos') myTodos: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.moreThanFive = this.myTodos.length >= 5;
  }

}
