import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent {
  @Input('cartData') cartResuts: any;

  qty: number = 1;
  cartItemToBeAdded: any;

  increment() {
    this.qty++;
  }

  decrement() {
    if (this.qty > 1)
      this.qty--
  }

  sendToSession(data: any) {
    sessionStorage.setItem(data.id, JSON.stringify(data));
  }

  itemExists(id: string): boolean {
    let cartItemFound = JSON.parse(String(sessionStorage.getItem(id)));
    return (cartItemFound != null);
  }

  addToCart(data: any) {

    if (this.itemExists(data.id)) {
      // item is already in the cart
      let cartItemFound = JSON.parse(String(sessionStorage.getItem(data.id)));
      cartItemFound.qty += this.qty;
      sessionStorage.setItem(data.id, JSON.stringify(cartItemFound));
    } else {
      // item is not in cart already
      let localData = {
        id: data.id, 
        title: data.title, 
        price: data.price, 
        description: data.description, 
        image: data.image, 
        qty: this.qty 
      }

      this.cartItemToBeAdded = localData;
      this.sendToSession(this.cartItemToBeAdded);
    }

  }

}

