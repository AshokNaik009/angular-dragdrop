import { ComponentRef, Component, OnInit , ViewChild, ViewContainerRef  } from '@angular/core';
import Chart from 'chart.js';
// import {CdkDrag} from '@angular/cdk/drag-drop';
import { WidgetOneComponent } from './widget-one/widget-one.component';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  piechartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  //imports: [CdkDrag],
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  componentsReferences = Array<ComponentRef<WidgetOneComponent>>()
  child_unique_key: number = 0;


  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'pie',
      options: piechartExample2.options,
      data: piechartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  parentfunction(data) {
    console.log("data--->",data)
  }

  createComponent(courseName) {



   // this.container.clear();
   
  
   if(this.componentsReferences.length > 0) {
       // console.log("courseName--->",courseName);
    var isExist =  this.componentsReferences.filter(
        x => x.instance.name == courseName
      );

      if(isExist.length > 0) {

        console.log("Data exist");

      } else {
        const widgetOneRef = this.container.createComponent(WidgetOneComponent);
        widgetOneRef.setInput('name', courseName);
        let childComponent = widgetOneRef.instance;
        childComponent.unique_key = ++this.child_unique_key;
        childComponent.parentRef = this;
        // add reference for newly created component
        this.componentsReferences.push(widgetOneRef);
      }
   } else {

    const widgetOneRef = this.container.createComponent(WidgetOneComponent);
    widgetOneRef.setInput('name', courseName);

    let childComponent = widgetOneRef.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;

    // add reference for newly created component
    this.componentsReferences.push(widgetOneRef);


   }


   
   
    
    
    //widgetOneRef.setOutput('parentfunction', this.parentfunction);
    // const widgetTwoRef = this.container.createComponent(WidgetTwoComponent);
    // widgetTwoRef.setInput('name', 'profanis');
  }


  remove(key: number) {

    
    if (this.container.length < 1) return;

    let componentRef = this.componentsReferences.filter(
      x => x.instance.unique_key == key
    )[0];

  

     let vcrIndex: number = this.componentsReferences.indexOf(componentRef as any);
  

    // removing component from container
    this.container.remove(vcrIndex);

    // removing component from the list
    this.componentsReferences = this.componentsReferences.filter(
      x => x.instance.unique_key !== key
    );
    
  }


}
