import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ColorService } from '../../services/color';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  private colorService = inject(ColorService);


  pageTitle = signal('Hello, Home');

  bgColorFromSubject = signal<string>('transparent');
  bgColorFromBehavior = signal<string>('white');

 
  private subs = new Subscription();

  ngOnInit(): void {
    this.subs.add(
      this.colorService.colorSubject$.subscribe((color) => {
        this.bgColorFromSubject.set(color);
      }),
    );

  
    this.subs.add(
      this.colorService.colorBehaviorSubject$.subscribe((color) => {
        this.bgColorFromBehavior.set(color);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
