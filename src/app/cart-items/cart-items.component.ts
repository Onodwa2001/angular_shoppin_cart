import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent {
  cartItems: any = [];

  balance: number = 0;
  count: number = 0;

  constructor() {
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      let item = sessionStorage.getItem(JSON.parse(String(key)));
      let parsedItem = JSON.parse(String(item));
      this.cartItems.push(parsedItem);
    }

    this.countItems();
    this.updateBalance();
  }

  updateBalance() {
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      sum += (this.cartItems[i].price * this.cartItems[i].qty);
    }
    this.balance = sum;
  }

  @Output() countEmitter = new EventEmitter();

  countItems() {
    let count = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      count += this.cartItems[i].qty;
    }
    this.count = count;
  }

  removeItem(id: string) {
    sessionStorage.removeItem(id);
    location.reload();
  }

  increment(id: string) {
    let item = JSON.parse(String(sessionStorage.getItem(id)));
    let qty = item.qty;
    item.qty = ++qty;

    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == Number.parseInt(id)) {
        this.cartItems[i].qty = qty;
      }
    }

    this.updateBalance();

    sessionStorage.setItem(id, JSON.stringify(item));
  }

  decrement(id: string) {
    let item = JSON.parse(String(sessionStorage.getItem(id)));
    let qty = item.qty;
    item.qty = --qty;

    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == Number.parseInt(id)) {
        this.cartItems[i].qty = qty;
      }
    }

    this.updateBalance();

    sessionStorage.setItem(id, JSON.stringify(item));
  }

  clearCart() {
    sessionStorage.clear();
    location.reload();
  }

}
