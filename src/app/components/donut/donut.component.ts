import { Component, Input } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent {

  @Input() title :string = 'No Title';
  @Input() labels: Label[] = ['Label1', 'Label2', 'Label3'];
  @Input() data: MultiDataSet = [[1,1,1]];

  public colors: Color[] = [
    {
      backgroundColor: ['#6857E6','#009FEE','#F02059']
    }
  ]

}
