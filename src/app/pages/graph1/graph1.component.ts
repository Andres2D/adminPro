import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.css']
})
export class Graph1Component {

  public labels1: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1: MultiDataSet = [
    [350, 450, 100]
  ];
  public title: string = 'Sales';

}
