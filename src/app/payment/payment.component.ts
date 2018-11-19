import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //const id = +this.route.snapshot.parent.params['orderId'];
  }

  onAction(){
    // const crypto = require('crypto');
    // const request = require('request');
    //
    // // replace with your own credentials from
    // // https://gateway.fomopay.com/web/merchant/configurations
    // const API_USERNAME = 'INSERT_API_USERNAME_HERE';
    // const API_SECRET = 'INSERT_API_SECRET_HERE';
    //
    // // use your own unique transaction ID
    // let transaction = crypto.randomBytes(8).toString('hex');
    // // generate a unique random nonce
    // let nonce = crypto.randomBytes(8).toString('hex');
    //
    // // parameters according to documents
    // const values = {
    //   merchant: API_USERNAME,
    //   price: '1.00',
    //   description: 'applepie',
    //   transaction: transaction,
    //   return_url: 'https://RETURN.URL/HERE',
    //   callback_url: 'https://CALLBACK.URL/HERE',
    //   currency_code: 'sgd',
    //   type: 'sale',
    //   timeout: 3600,
    //   nonce: nonce
    // };
    //
    // // convert parameters to the form of 'key=value'
    // // and sort them lexicographically
    // const sortedValues =
    //   Object.entries(values)  // [['merchant','API_USERNAME'],['price','1.0'],['description','applepie']...]
    //     .map(kv => kv[0] + '=' + kv[1]) // ['merchant=API_USERNAME', 'price=1.0', 'description=applepie'...]
    //     .sort();  // ['callback_url=https://CALLBACK.URL/HERE', 'currency_code=sgd'...]
    //
    // // append shared key to the end of params array
    // sortedValues.push('shared_key=' + API_SECRET);
    //
    // // concat sorted params array with &
    // const signStr = sortedValues.join('&');
    // // 'callback_url=https://CALLBACK.URL/HERE&currency_code=sgd&description=...'
    //
    // // calculate hex sha256 sum of the string as the signature
    // const signature = crypto
    //   .createHash('sha256')
    //   .update(signStr)
    //   .digest('hex')
    //   .toLowerCase();
    //
    // // add the signature to the original parameter list
    // values['signature'] = signature;
    //
    // // post the parameters to the api,
    // // in the format of application/x-www-form-urlencoded
    // request.post(
    //   'https://gateway.fomopay.com/pgw/v1',
    //   {
    //     form: values
    //   },
    //   function (err, response, body) {
    //     if (err) {
    //       console.error(err.message || err);
    //       return
    //     }
    //     console.log(response.statusCode, body);
    //   }
    // );
  }

  toNextStep(){
    console.log("action taken");
  }
}
