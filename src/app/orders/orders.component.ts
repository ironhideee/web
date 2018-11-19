import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.orderService.getAllUserOrders()
      .subscribe((orders) => {
        this.orders = orders;
        // console.log(this.orders[0].amountCost);
      }, (error) => {
        console.error('Error getting user all orders');
      });
  }

}
