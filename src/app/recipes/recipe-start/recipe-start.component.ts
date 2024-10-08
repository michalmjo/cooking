import { Component, OnInit } from '@angular/core';

interface Test {
  data: string;
  text: string;
}

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css'],
})
export class RecipeStartComponent implements OnInit {
  dataTest: Test[] = [
    {
      data: 'data',
      text: 'tekst',
    },
    {
      data: 'data1',
      text: 'tekst1',
    },
    {
      data: 'data2',
      text: 'tekst2',
    },
    {
      data: 'data3',
      text: 'tekst3',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
