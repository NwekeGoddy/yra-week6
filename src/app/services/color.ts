import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {

  private colorSubject = new Subject<string>();
  colorSubject$ = this.colorSubject.asObservable();

  setColorViaSubject(color: string) {
    this.colorSubject.next(color);
  }

 private colorBehaviorSubject = new BehaviorSubject<string>('green'); //default color green
  colorBehaviorSubject$ = this.colorBehaviorSubject.asObservable();

  setColorViaBehaviorSubject(color: string) {
    this.colorBehaviorSubject.next(color);
  }
}
