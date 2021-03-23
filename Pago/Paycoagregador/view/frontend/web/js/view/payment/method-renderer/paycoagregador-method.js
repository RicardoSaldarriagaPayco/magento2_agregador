/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
/*global define*/
define(
    [
        'Magento_Checkout/js/view/payment/default',
        'mage/url',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/checkout-data',
        'https://checkout.epayco.co/checkout.js'
    ],
    function (Component,url,quote,checkoutData) {
        'use strict';
        return Component.extend({
            defaults: {
                self:this,
                template: 'Pago_Paycoagregador/payment/paycoagregador'
            },
            redirectAfterPlaceOrder: false,
            renderCheckout: function() {
                var totals = quote.getTotals();
                var countryBllg = quote.shippingAddress();
                var customerData = checkoutData.getShippingAddressFromData();
                if(window.checkoutConfig.payment.Paycoagregador.paycoagregador_test == "1"){
                    window.checkoutConfig.payment.Paycoagregador.paycoagregador_test= "true";
                    var test2 = true;
                } else {
                    window.checkoutConfig.payment.Paycoagregador.paycoagregador_test = "false";
                    var test2 = false;
                }
                var handler = ePayco.checkout.configure({
                    key: window.checkoutConfig.payment.Paycoagregador.paycoagregador_public_key,
                    test:test2
                })
                var taxes = 0;
                taxes = totals._latestValue.base_tax_amount
                taxes = ''+taxes;
                var items = '';
                for(var i = 0; i <  window.checkoutConfig.quoteItemData.length; i++){
                    if(window.checkoutConfig.totalsData.items.length==1){
                        items=window.checkoutConfig.quoteItemData[i].product.name;
                    }else{
                        items += window.checkoutConfig.quoteItemData[i].product.name+',';
                    }
                }

                var docType='';
                var mobile = '';
                var doc= '';
                var country = '';
                //calcular base iva
                var tax_base = 0;
                tax_base = totals._latestValue.base_subtotal_with_discount;
                tax_base = ''+tax_base;
                // fin calcular base iva
                if(!window.checkoutConfig.isCustomerLoggedIn){
                    var name_billing =  customerData.firstname + ' ' + customerData.lastname;
                    var address_billing =  customerData.street[0]+ ' ' + customerData.street[1];
                    country = customerData.country_id;
                } else {
                    var  name_billing = window.checkoutConfig.customerData.firstname + ' '+ window.checkoutConfig.customerData.lastname;
                   mobile = countryBllg.telephone;
                    var address_billing = countryBllg.street[0];
                    country = countryBllg.countryId;
                }
                var lang = '';
                var temp = window.checkoutConfig.payment.Paycoagregador.language.split("_");
                lang = temp[0];
                var amount = '';
                console.log(url.build("confirmation/paycoagregador/index"));
                amount = totals._latestValue.base_grand_total;
                var data={
                    name: items,
                    description: items,
                    invoice: this.getOrderId(),
                    currency: window.checkoutConfig.quoteData.store_currency_code,
                    amount: amount,
                    tax_base: tax_base.replace('.',','),
                    tax: taxes.replace('.',','),
                    country: country,
                    lang: lang,
                    //Onpage='false' - Standard='true'
                    external: window.checkoutConfig.payment.Paycoagregador.vertical_cs,
                    //Atributos opcionales
                    extra1: 'extra1',
                    extra2: 'extra2',
                    extra3: 'extra3',
                    confirmation:url.build("confirmation/paycoagregador/index"),
                    response: url.build("confirmation/paycoagregador/index"),
                    //Atributos cliente
                    name_billing: name_billing,
                    address_billing: address_billing,
                    type_doc_billing: docType,
                    mobilephone_billing: mobile,
                    number_doc_billing: doc
                };
                handler.open(data);
            },
            getOrderId: function(){
                return window.checkoutConfig.payment.Paycoagregador.getOrderId;
            },
            getOrderData: function(){
                return window.checkoutConfig.payment.Paycoagregador.getOrderData;
            },

            getMailingAddress: function() {
                return window.checkoutConfig.payment.checkmo.mailingAddress;
            },
            responseAction: function(){
                return window.checkoutConfig.payment.Paycoagregador.responseAction;
            },
        });
    }
);
