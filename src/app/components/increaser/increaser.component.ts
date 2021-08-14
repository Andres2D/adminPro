import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.css']
})
export class IncreaserComponent implements OnInit{

  @Input('value') progress: number = 40;
  @Input() btnClass: string = 'btn btn-primary';
  @Output('value') valueOutput: EventEmitter<number> = new EventEmitter();

  ngOnInit(){
    this.btnClass = `btn ${this.btnClass}`;
  }

  ChangeValue(value: number){
    
    if(this.progress >= 100 && value >= 0){
      this.valueOutput.emit(100);
      return this.progress = 100;
    }

    if(this.progress <= 0 && value < 0){
      this.valueOutput.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.valueOutput.emit(this.progress);
  }

  onChange(newValue: number) {
    if(newValue >= 100) {
      this.progress = 100;
    } else if(newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.valueOutput.emit(this.progress);
  }

}
