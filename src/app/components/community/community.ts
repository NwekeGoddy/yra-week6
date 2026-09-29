import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ColorService } from '../../services/color';

@Component({
  selector: 'app-community',
  imports: [CommonModule],
  templateUrl: './community.html',
  styleUrl: './community.css',
})
export class Community implements OnInit, OnDestroy {
  private colorService = inject(ColorService);


  pageTitle = signal('Hello, Community');

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
