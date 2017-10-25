import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private numberSubscription: Subscription;
  private customSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumber = Observable.interval(1000)
      .map((data: number) => {
        return data * 2;
      });
    this.numberSubscription = myNumber.subscribe(
      (number) => {
        console.log(number);
      }
    );

    const myObserver = Observable.create((observer: Observer<string>) => {
        setTimeout(() => {
            observer.next('first package fired!!');
          }, 2000);

        setTimeout(() => {
          observer.next('second package fired!!');
      }, 7000);

      setTimeout(() => {
         observer.error('error');
         observer.complete();
      }, 8000);

      setTimeout(() => {
        observer.next('third package fired!!');
      }, 10000);

      }
    );

    this.customSubscription = myObserver.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('complete');
      }
    );

    ///read more on www.reactivex.io/rxjs
  }

  ngOnDestroy() {
    this.numberSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }
}
