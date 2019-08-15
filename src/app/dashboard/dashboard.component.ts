import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { Entity } from '../entity';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  orders: Order[];
  current_status = '开始';
  progress: string;
  current_url: string;
  fundation_name: string;
  legal_entity_name: string;
  legal_current_status = '开始';
  legal_progress: string;

  ar_entity_name: string;
  ar_current_status = '开始';
  ar_progress: string;

  pte_entity_name: string;
  pte_current_status = '开始';
  pte_progress: string;

  constructor(
    private router: Router,
    private orderService: OrderService
    ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    return this.orderService
      .getOrders()
      .subscribe(orders => {
        this.orders = orders;
        // console.log(orders);
        if (this.orders.length === 0) {
          this.current_status = '开始';
        }
        for (let s of orders) {
          // console.log(s);
          // clg订单信息
          if (s.orderType === 'clg' && s.is_satori === true) {
            this.fundation_name = s.incorporationName;
            switch (s.applicationStatus) {
              case 'incorp_introduction' :
                this.progress = '新加坡基金会介绍';
                break;
              case 'incorp_form' :
                this.progress = '提交基本注册信息';
                break;
              case 'incorp_cart' :
                this.progress = '确认订单项目';
                break;
              case 'incorp_checkout' :
                this.progress = '接收订单并付款';
                break;
              case 'incorp_sign' :
                this.progress = '签署文件';
                break;
              case 'incorp_status' :
                this.progress = '申请状态查看';
                break;
              case 'incorp_success' :
                this.progress = '注册完成';
                break;
            }
            if (s.applicationStatus === 'incorp_introduction') {
              this.current_status = '开始';
            } else if (s.applicationStatus === 'incorp_success') {
              this.current_status = '查看';
            } else {
              this.current_status = '继续';
            }
          }
          // legal订单信息
          if (s.orderType === 'legal_arch') {
            this.legal_entity_name = s.incorporationName;
            switch (s.applicationStatus) {
              case 'legal_intro' :
                this.legal_progress = '合规介绍';
                break;
              case 'legal_cart' :
                this.legal_progress = '确认订单项目';
                break;
              case 'legal_checkout' :
                this.legal_progress = '核对订单并付款';
                break;
              case 'legal_white_paper' :
                this.legal_progress = '白皮书审核';
                break;
              case 'legal_kyc' :
                this.legal_progress = 'KYC资料提交';
                break;
              case 'legal_success' :
                this.legal_progress = '完成审核';
                break;
            }
            if (s.applicationStatus === 'legal_intro') {
              this.legal_current_status = '开始';
            } else if (s.applicationStatus === 'legal_success') {
              this.legal_current_status = '查看';
            } else {
              this.legal_current_status = '继续';
            }
          }
          // annual_renewal订单信息
          if (s.orderType === 'annual_renewal') {
            this.ar_entity_name = s.incorporationName;
            switch (s.applicationStatus) {
              case 'annual_intro' :
                this.ar_progress = '年度续费介绍';
                break;
              case 'annual_cart' :
                this.ar_progress = '确认订单项目';
                break;
              case 'annual_checkout' :
                this.ar_progress = '核对订单并付款';
                break;
              case 'annual_sign_contract' :
                this.ar_progress = '签署合同';
                break;
              case 'annual_submit_bizfile' :
                this.ar_progress = '提交Bizfile';
                break;
              case 'annual_sign_dir_reso' :
                this.ar_progress = '签署董事决议';
                break;
              case 'annual_success' :
                this.ar_progress = '续费完成';
                break;
            }
            if (s.applicationStatus === 'annual_intro') {
              this.ar_current_status = '开始';
            } else if (s.applicationStatus === 'annual_success') {
              this.ar_current_status = '查看';
            } else {
              this.ar_current_status = '继续';
            }
          }

          // pte-sg || pte-bvi 订单信息
          if (s.orderType === 'plc_singapore' || s.orderType === 'plc_bvi' && s.is_satori === true) {
            this.pte_entity_name = s.incorporationName;
            switch (s.applicationStatus) {
              case 'incorp_introduction' :
                this.pte_progress = '私人有限公司介绍';
                break;
              case 'incorp_form' :
                this.pte_progress = '提交基本注册信息';
                break;
              case 'incorp_cart' :
                this.pte_progress = '确认订单项目';
                break;
              case 'incorp_checkout' :
                this.pte_progress = '核对订单并付款';
                break;
              case 'incorp_sign' :
                this.pte_progress = '签署文件';
                break;
              case 'incorp_status' :
                this.pte_progress = '申请状态查看';
                break;
              case 'incorp_success' :
                this.pte_progress = '注册完成';
                break;
            }
            if (s.applicationStatus === 'incorp_introduction') {
              this.pte_current_status = '开始';
            } else if (s.applicationStatus === 'incorp_success') {
              this.pte_current_status = '查看';
            } else {
              this.pte_current_status = '继续';
            }
          }
        }
      });
  }

  createClg() {
    const entity = new Entity();
    entity.entityType = 'clg';
    entity.is_satori = true;
    return this.orderService
      .createEntity(entity)
      .subscribe((e) => {
          this.orderService
            .createOrder(new Order(), 'clg', e.id)
            .subscribe((o) => {
              console.log(o);
              switch (o.applicationStatus) {
                case 'incorp_introduction' :
                  this.current_url = 'introduction';
                  break;
                case 'incorp_form' :
                  this.current_url = 'form';
                  break;
                case 'incorp_cart' :
                  this.current_url = 'cart';
                  break;
                case 'incorp_checkout' :
                  this.current_url = 'invoice';
                  break;
                case 'incorp_sign' :
                  this.current_url = 'sign';
                  break;
                case 'incorp_status' :
                  this.current_url = 'status';
                  break;
                case 'incorp_success' :
                  this.current_url = 'success';
                  break;
              }
              this.router.navigate(['/order/clg/', o.id, this.current_url]);
          });
      });
   }

  createAudit() {
    let entityId = null;
    for(const order of this.orders){
      if(order.orderType.toLowerCase() == 'clg'){
        entityId = order.entity_id;
      }
    }
    if (entityId != null) {
      return this.orderService
        .getEntity(entityId)
        .subscribe((e) => {
          this.orderService
            .createOrder(new Order(), 'audit', e.id)
            .subscribe((o) => {
              this.router.navigate(['/order/audit/', o.id]);
          });
        },
        error => {
            // To-do:处理获取entity发生错误时的情况
        });
    } else {
      // To-do: 处理entity id 未赋值时候的情况
      return this.router.navigate(['/entityinfo']);
    }
  }

  startLegal() {
    let legal_exist = false;
    for (const order of this.orders) {
      if (order.orderType.toLowerCase() === 'legal_arch') {
        legal_exist = true;
        const entity = new Entity();
        entity.entityType = order.entity_type;
        entity.is_satori = order.is_satori;
        return this.orderService
          .createEntity(entity)
          .subscribe((e) => {
            this.orderService
              .createOrder(new Order(), 'legal_arch', e.id)
              .subscribe((o) => {
                console.log(o);
                switch (o.applicationStatus) {
                  case 'legal_intro' :
                    this.current_url = 'introduction';
                    break;
                  case 'legal_cart' :
                    this.current_url = 'cart';
                    break;
                  case 'legal_checkout' :
                    this.current_url = 'checkout';
                    break;
                  case 'legal_white_paper' :
                    this.current_url = 'whitepaper';
                    break;
                  case 'legal_kyc' :
                    this.current_url = 'kyc';
                    break;
                  case 'legal_success' :
                    this.current_url = 'success';
                    break;
                }
                this.router.navigate(['/order/legal_arch/', o.id, this.current_url]);
              });
          });
      }
    }
    if (legal_exist === false) {
      return this.router.navigate(['/entityinfo']);
    }
  }

  startAnnual() {
    let annual_exist = false;
    for (const order of this.orders) {
      if (order.orderType.toLowerCase() === 'annual_renewal') {
        annual_exist = true;
        const entity = new Entity();
        entity.entityType = order.entity_type;
        entity.is_satori = order.is_satori;
        return this.orderService
          .createEntity(entity)
          .subscribe((e) => {
            this.orderService
              .createOrder(new Order(), 'annual_renewal', e.id)
              .subscribe((o) => {
                console.log(o);
                switch (o.applicationStatus) {
                  case 'annual_intro' :
                    this.current_url = 'introduction';
                    break;
                  case 'annual_cart' :
                    this.current_url = 'cart';
                    break;
                  case 'annual_checkout' :
                    this.current_url = 'checkout';
                    break;
                  case 'annual_sign_contract' :
                    this.current_url = 'sign_contract';
                    break;
                  case 'annual_submit_bizfile' :
                    this.current_url = 'submit_bizfile';
                    break;
                  case 'annual_sign_dir_reso' :
                    this.current_url = 'sign_dir_reso';
                    break;
                  case 'annual_success' :
                    this.current_url = 'success';
                    break;
                }
                this.router.navigate(['/order/annual_renewal/', o.id, this.current_url]);
              });
          });
      }
    }
    if (annual_exist === false) {
      return this.router.navigate(['/annual-entityinfo']);
    }
  }

  startPLC() {
    let plc_sg_exist = false;
    let plc_bvi_exist = false;
    for (const order of this.orders) {
      if (order.orderType.toLowerCase() === 'plc_singapore') {
        plc_sg_exist = true;
        const entity = new Entity();
        entity.entityType = order.entity_type;
        entity.is_satori = order.is_satori;
        return this.orderService
          .createEntity(entity)
          .subscribe((e) => {
            this.orderService
              .createOrder(new Order(), 'plc_singapore', e.id)
              .subscribe((o) => {
                console.log(o);
                switch (o.applicationStatus) {
                  case 'incorp_introduction' :
                    this.current_url = 'introduction';
                    break;
                  case 'incorp_form' :
                    this.current_url = 'form';
                    break;
                  case 'incorp_cart' :
                    this.current_url = 'cart';
                    break;
                  case 'incorp_checkout' :
                    this.current_url = 'invoice';
                    break;
                  case 'incorp_sign' :
                    this.current_url = 'sign';
                    break;
                  case 'incorp_status' :
                    this.current_url = 'status';
                    break;
                  case 'incorp_success' :
                    this.current_url = 'success';
                    break;
                }
                this.router.navigate(['/order/plc_singapore/', o.id, this.current_url]);
              });
          });
      }
      if (order.orderType.toLowerCase() === 'plc_bvi') {
        plc_bvi_exist = true;
        const entity = new Entity();
        entity.entityType = order.entity_type;
        entity.is_satori = order.is_satori;
        return this.orderService
          .createEntity(entity)
          .subscribe((e) => {
            this.orderService
              .createOrder(new Order(), 'plc_bvi', e.id)
              .subscribe((o) => {
                // console.log(o);
                switch (o.applicationStatus) {
                  case 'incorp_introduction' :
                    this.current_url = 'introduction';
                    break;
                  case 'incorp_form' :
                    this.current_url = 'form';
                    break;
                  case 'incorp_cart' :
                    this.current_url = 'cart';
                    break;
                  case 'incorp_checkout' :
                    this.current_url = 'invoice';
                    break;
                  case 'incorp_sign' :
                    this.current_url = 'sign';
                    break;
                  case 'incorp_status' :
                    this.current_url = 'status';
                    break;
                  case 'incorp_success' :
                    this.current_url = 'success';
                    break;
                }
                this.router.navigate(['/order/plc_bvi/', o.id, this.current_url]);
              });
          });
      }
    }
    if (plc_sg_exist === false && plc_bvi_exist === false) {
      return this.router.navigate(['/plc-selection']);
    }
  }
}
