import { Component, EventEmitter, Output } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  items: any = [];

  constructor(private itemsService: ItemsService) {
    this.itemsService.getItems()
      .subscribe(data => this.items = data);
  }

  @Output() cartItem = new EventEmitter();

  sendDataToParentComponent(item: any) {
    this.cartItem.emit(item);
  }
}
