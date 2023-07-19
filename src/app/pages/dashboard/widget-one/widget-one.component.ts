
import { CommonModule,  } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-widget-one',
  standalone: true,
  imports: [CommonModule],
//   template: `
//     <h2>widget-one</h2>
//     Name: {{ name }}
//   `,
templateUrl: './widget-one.component.html',
  styleUrls: ['./widget-one.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetOneComponent implements OnChanges {


  public tblData;
  @Input() name: string | undefined;
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes are happen');
    

    this.tblData = JSON.parse(localStorage.getItem('courseDt'));
   // console.log(this.name); 
    
    this.tblData = this.tblData.filter((el:any)=>   el.courseName === this.name);
    // console.log("this.tblData--->",this.tblData);
  }
  
 // @Output() parentFuntion: EventEmitter<any> = new EventEmitter()
 public unique_key: number;
 public parentRef: DashboardComponent;

  removeSection() {

    console.log(this.unique_key)
    this.parentRef.remove(this.unique_key)
  }




}