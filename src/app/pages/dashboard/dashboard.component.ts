import { ComponentRef, Component, OnInit , ViewChild, ViewContainerRef  } from '@angular/core';
import Chart from 'chart.js';
// import {CdkDrag} from '@angular/cdk/drag-drop';
import { WidgetOneComponent } from './widget-one/widget-one.component';
import { ApiService } from "../../../service/apiservice";

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
  public grphval:any = [];
  public pieval:any = [];
  public allcourses:any = [];
  public allcoursesrev:any = [];

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef; 

  constructor(private apiService: ApiService,) {
    
  }

  componentsReferences = Array<ComponentRef<WidgetOneComponent>>()
  child_unique_key: number = 0;


  ngOnInit() {


  
    const currentYear = new Date().getFullYear();
    const firstDay = new Date(currentYear, 0, 1);
    
    let newDate = new Date(firstDay.setMonth(firstDay.getMonth()+6));
    

    var dateObj = {
      startDate:new Date(currentYear, 0, 1).toISOString().split('T')[0],
      endDate:newDate.toISOString().split('T')[0],
    }


    this.apiService.getAllCourseRevByTeacher().subscribe((res:any)=>{
      console.log("Reveneue-->",res.data.data);
      localStorage.setItem("courseDt",JSON.stringify(res.data.data));

    })


    this.apiService.getAllGraphTeacherId(dateObj).subscribe((res:any)=>{
      res.shift()
      res.map((el)=>{
              this.grphval.push(el.amount);
      })
    var chartSales = document.getElementById('chart-sales');
    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data:  {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',  ],
        datasets: [{
          label: 'Revenue Generated',
          data: this.grphval
        }]
      }
		});
    })

    let ageObj = { range: [ [9,12] , [13,15] , [16,18] , [19,21]   ]}
    this.apiService.getStudentsByAgeGroup(ageObj).subscribe((res:any)=>{
      res.map((el:any)=>{
        this.pieval.push(el.data)
      })
      var chartOrders = document.getElementById('chart-orders');
      var ordersChart = new Chart(chartOrders, {
        type: 'pie',
        options: piechartExample2.options,
        data: {
          labels: ["Age Group 9-12 ", "Age Group  13-15", "Age Group  16-18", "Age Group  19-21"],
          datasets: [
            {
              label: "Age Group",
              backgroundColor: [
                'red',
                'orange',
                'green',
                'blue',
              ],
              data: this.pieval,
              maxBarThickness: 10
            }
          ]
        }
      });
    })


    this.apiService.getAllCourseByTeacher().subscribe((res:any)=>{
     this.allcourses = res.data.data;
    })






    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    

    parseOptions(Chart, chartOptions());

   

   
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
       console.log("courseName--->",courseName);
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
