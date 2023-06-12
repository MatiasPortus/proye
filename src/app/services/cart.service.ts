import { Injectable } from '@angular/core';
import Medicamento from 'src/app/interfaces/medicamento.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: { medicamento: Medicamento, cantidad: number }[] = [];

  addToCart(medicamento: Medicamento, cantidad: number) {
    const item = this.cartItems.find(cartItem => cartItem.medicamento.id === medicamento.id);
    if (item) {
      item.cantidad += cantidad;
    } else {
      this.cartItems.push({ medicamento, cantidad });
    }
  }

  removeFromCart(medicamento: Medicamento) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.medicamento.id !== medicamento.id);
  }

  clearCart() {
    this.cartItems = [];
  }
}
