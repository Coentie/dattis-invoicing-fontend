import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './shared/card/card.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
