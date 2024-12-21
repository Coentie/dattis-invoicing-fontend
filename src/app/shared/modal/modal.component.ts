import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  viewable = input.required<boolean>();
  viewableChange = output<boolean>();

  onCloseClickHandler() {
    this.viewableChange.emit(false);
  }
}