import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ColorService } from '../../services/color';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private colorService = inject(ColorService);

  colors = ['white', 'blue', 'yellow', 'red', 'black'];

  onColorChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const chosen = select.value;

    this.colorService.setColorViaSubject(chosen);
    this.colorService.setColorViaBehaviorSubject(chosen);
  }
}
