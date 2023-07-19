
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
/* import * as firebase from "firebase"; */
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from "@angular/core";


@Injectable()
export class ApiService {

    constructor(private http: HttpClient, ) {}


    getAllCourseRevByTeacher() {
        return this.http.get(`${environment.baseURL}/courseRev/allCoursesRev?teacher=64b77e977eafefd09b254b1a&populate=student`,{})
        .pipe(
          map((data)=>{
            return data;
          })
        );
      }


      getAllCourseByTeacher() {
        return this.http.get(`${environment.baseURL}/course/allCourses?teacher=64b77e977eafefd09b254b1a`,{})
        .pipe(
          map((data)=>{
            return data;
          })
        );
      }


      getAllGraphTeacherId(data) {
        return this.http.post(`${environment.baseURL}/courseRevApi`,data)
        .pipe(
          map((data)=>{
            return data;
          })
        );
      }


      getStudentsByAgeGroup(data) {
        return this.http.post(`${environment.baseURL}/students/pieChartData`,data)
        .pipe(
          map((data)=>{
            return data;
          })
        );
      }
    

}


