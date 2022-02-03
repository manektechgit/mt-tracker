import { Component, OnInit, OnDestroy, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
    AppJsPath,
    AppMessages,
} from 'src/app/_app-constants/app-constants.config';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { AttendencehourService } from 'src/app/_services/attendencehour.service';
import { AttendencehourMaster } from 'src/app/_models/attendencehour-master';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { AttendencehourPagination } from 'src/app/_models/attendencehour-pagination';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { CompanyPlanService } from 'src/app/_services/companyplan.service';
import { PlanMaster } from 'src/app/_models/Plan-master';
import { IPayPalConfig, ICreateOrderRequest, PayPalScriptService, NgxPaypalComponent } from 'ngx-paypal';
import { CompanyPlan } from 'src/app/_models/company-plan.model';
import { defaultMaxListeners } from 'events';
import { PlanPaymentService } from 'src/app/_services/planpayment.service';
import { Subscription } from 'rxjs';
declare var $: any;
// declare var paypal;

@Component({
    selector: 'app-company-plan',
    templateUrl: './company-plan.component.html',
    styleUrls: ['./company-plan.component.css'],
})
export class CompanyPlanComponent implements OnInit {

    //@ViewChild('paypal') paypalElement: NgxPaypalComponent;

    // @ViewChild('payPalElem1') paypalComponent1?:  NgxPaypalComponent;
    // @ViewChild('payPalElem2') paypalComponent2?:  NgxPaypalComponent;

    @ViewChildren('payPalElem') payPals: QueryList<NgxPaypalComponent>

    currentLoginUser: LoginResponseModel;
    noOfUser: number;
    currentPlan: any;
    payType: string;
    plans: any;
    totalAmount: number;

    companyPlan: CompanyPlan;
    paymentResultSubscript: Subscription;

    //public payPalConfig?: IPayPalConfig;

    // product = {
    //     price: '1.00',
    //     description: 'Check Amount'
    // }// this property can be make dynamically from your web api
    // payeeEmail: string = 'Merchant Account to credit the charge Amount'
    // paidFor: boolean = false; //Payment Successful Message handling
    // paypalConfig = {//Configuration for paypal Smart Button
    //     createOrder: (data, actions) => {
    //         return actions.order.create({
    //             purchase_units: [{
    //                 description: 'Manager To Owner Payment',
    //                 amount: {
    //                     currency_code: 'USD',
    //                     value: 1
    //                 }, payee: {
    //                     email_address: this.payeeEmail // to send amout to corresponding Merchant
    //                 },
    //                 invoice_id: '<You can geneate on your Own Logic>',
    //             }]
    //         });
    //     },
    //     onApprove: async (data, actions) => {
    //         const order = await actions.order.capture();
    //         this.paidFor = true;
    //         console.log(order)
    //     },
    //     onError: err => {
    //         console.log(err)
    //     }
    // }

    constructor(
        private router: Router,
        private alertService: AlertService,
        private authService: AuthenticationService,
        private messageService: MessageService,
        private confirmationDialogService: ConfirmationDialogService,
        private companyPlanService: CompanyPlanService,
        private planPaymentService: PlanPaymentService
        // private payPalScriptService: PayPalScriptService
    ) {
        this.currentLoginUser = this.authService.GetLoginUserDetail();
    }

    ngOnInit(): void {
        $.getScript(AppJsPath.customJs);
        this.noOfUser = 5;
        this.payType = "monthly";
        this.GetPlansForCompany();
        this.GetCompanyPlan();

        this.paymentResultSubscript = this.planPaymentService.paymentResultEmitter.subscribe((data) => {
            this.GetCompanyPlan();
        });

        // this.payPalConfig = {
        //     currency: 'USD',
        //     clientId: 'AUAF8NGosp8EBmrGtKo5jki_QyxrxFOdKov_2YhIILdhUo_jbLU1JLyQGMM8Yx8bpcXOsi8AX0CHrGL5',
        // };

        // this.payPalScriptService.registerPayPalScript({
        //     clientId: 'AUAF8NGosp8EBmrGtKo5jki_QyxrxFOdKov_2YhIILdhUo_jbLU1JLyQGMM8Yx8bpcXOsi8AX0CHrGL5',
        //     currency: 'USD',

        // }, (payPalApi) => {
        //     this.payPals.forEach(element => {
        //         if (element) {
        //             console.log(payPalApi);
        //             element.customInit(payPalApi);
        //         }
        //     });
        // });

        // this.payPalConfig = {
        //     currency: 'USD',
        //     clientId: 'AUAF8NGosp8EBmrGtKo5jki_QyxrxFOdKov_2YhIILdhUo_jbLU1JLyQGMM8Yx8bpcXOsi8AX0CHrGL5',
        //     createOrderOnClient: (data) => <ICreateOrderRequest>{
        //         intent: 'CAPTURE',
        //         purchase_units: [
        //             {
        //                 amount: {
        //                     currency_code: 'USD',
        //                     value: '0',
        //                     breakdown: {
        //                         item_total: {
        //                             currency_code: 'USD',
        //                             value: '0'
        //                         }
        //                     }
        //                 },
        //                 items: [
        //                     {
        //                         name: '',
        //                         quantity: '1',
        //                         category: 'DIGITAL_GOODS',
        //                         unit_amount: {
        //                             currency_code: 'USD',
        //                             value: '0',
        //                         },
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     advanced: {
        //         commit: 'true'
        //     },
        //     style: {
        //         label: 'paypal',
        //         layout: 'horizontal'
        //     },
        //     onApprove: (data, actions) => {
        //         console.log('onApprove - transaction was approved, but not authorized', data, actions);
        //         actions.order.get().then(details => {
        //             //console.log('onApprove - you can get full order details inside onApprove: ', details);
        //         });
        //     },
        //     onClientAuthorization: (data) => {
        //         console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        //         //this.showSuccess = true;
        //     },
        //     onCancel: (data, actions) => {
        //         console.log('OnCancel', data, actions);
        //     },
        //     onError: err => {
        //         console.log('OnError', err);
        //         this.alertService.error("Something went wrong!");
        //     },
        //     onClick: (data, actions) => {
        //         console.log('onClick', data, actions);
        //     },
        // };
    }

    GetPlansForCompany() {
        this.companyPlanService.GetPlansForCompany().subscribe((res) => {
            if (res.StatusCode === 200) {
                this.plans = res.Result;
            }
        });
    }

    GetCompanyPlan() {
        this.companyPlanService.GetCompanyPlan(this.currentLoginUser.CompanyId).subscribe((res) => {
            if (res.StatusCode === 200) {
                this.currentPlan = res.Result;
                this.planPaymentService.setCurrentPlan(this.currentPlan);
                this.noOfUser = this.currentPlan.NoOfUsers;
                this.payType = this.currentPlan.PayType;
            }
        });
    }

    changePayType(event: any) {
        this.payType = event.target.innerText;
        this.planPaymentService.setPayType(this.payType);
    }

    changeNoOfUser(event: any) {
        this.planPaymentService.setNoOfUser(this.noOfUser);
    }

    paymentConfig(plan: any) {
        let totalAmount = plan.AmountPerUser * this.noOfUser * (this.payType == "Annually" ? 12 : 1);

        // this.payPalScriptService.registerPayPalScript({
        //     clientId: 'AUAF8NGosp8EBmrGtKo5jki_QyxrxFOdKov_2YhIILdhUo_jbLU1JLyQGMM8Yx8bpcXOsi8AX0CHrGL5',
        //     currency: 'USD'
        // }, (payPalApi) => {
        //     this.payPals.forEach(element => {
        //         if (element) {
        //             // this.payPalConfig = {
        //             //     currency: 'USD',
        //             //     clientId: 'AUAF8NGosp8EBmrGtKo5jki_QyxrxFOdKov_2YhIILdhUo_jbLU1JLyQGMM8Yx8bpcXOsi8AX0CHrGL5',
        //             //     createOrderOnClient: (data) => <ICreateOrderRequest>{
        //             //         intent: 'CAPTURE',
        //             //         purchase_units: [
        //             //             {
        //             //                 amount: {
        //             //                     currency_code: 'USD',
        //             //                     value: totalAmount.toString(),
        //             //                     breakdown: {
        //             //                         item_total: {
        //             //                             currency_code: 'USD',
        //             //                             value: totalAmount.toString()
        //             //                         }
        //             //                     }
        //             //                 },
        //             //                 items: [
        //             //                     {
        //             //                         name: plan.Name,
        //             //                         quantity: '1',
        //             //                         category: 'DIGITAL_GOODS',
        //             //                         unit_amount: {
        //             //                             currency_code: 'USD',
        //             //                             value: totalAmount.toString(),
        //             //                         },
        //             //                     }
        //             //                 ]
        //             //             }
        //             //         ]
        //             //     },
        //             //     advanced: {
        //             //         commit: 'true'
        //             //     },
        //             //     style: {
        //             //         label: 'paypal',
        //             //         layout: 'horizontal'
        //             //     },
        //             //     onApprove: (data, actions) => {
        //             //         console.log('onApprove - transaction was approved, but not authorized', data, actions);
        //             //         actions.order.get().then(details => {
        //             //             this.companyPlan = {
        //             //                 ModifiedBy: this.currentLoginUser.UserId,
        //             //                 AmountPerUser: plan.AmountPerUser,
        //             //                 CompanyId: this.currentLoginUser.CompanyId,
        //             //                 CreatedBy: this.currentLoginUser.UserId,
        //             //                 NoOfUsers: this.noOfUser,
        //             //                 PayType: this.payType,
        //             //                 PaymentId: details.id,
        //             //                 PlanId: plan.PlanId,
        //             //                 TotalAmount: totalAmount,
        //             //             } as CompanyPlan;

        //             //             if (this.currentPlan) {
        //             //                 this.companyPlan.CompanyPlanId = this.currentPlan.CompanyPlanId;
        //             //                 this.companyPlanService.UpdateCompanyPlan(this.companyPlan).subscribe((res) => {
        //             //                     this.GetCompanyPlan();
        //             //                     this.alertService.success("Plan purchase successfully");
        //             //                 });
        //             //             } else {
        //             //                 this.companyPlanService.BuyCompanyPlan(this.companyPlan).subscribe((res) => {
        //             //                     this.GetCompanyPlan();
        //             //                     this.alertService.error("Something went wrong!");
        //             //                 });
        //             //             }
        //             //             //console.log('onApprove - you can get full order details inside onApprove: ', details);
        //             //         });
        //             //     },
        //             //     onClientAuthorization: (data) => {
        //             //         console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        //             //         //this.showSuccess = true;
        //             //     },
        //             //     onCancel: (data, actions) => {
        //             //         console.log('OnCancel', data, actions);
        //             //     },
        //             //     onError: err => {
        //             //         console.log('OnError', err);
        //             //         this.alertService.error("Something went wrong!");
        //             //     },
        //             //     onClick: (data, actions) => {
        //             //         console.log('onClick', data, actions);
        //             //     },
        //             // };
        //             element.customInit(payPalApi);
        //         }
        //     });
        // });

        //let totalAmount = plan.AmountPerUser * this.noOfUser * (this.payType == "Annually" ? 12 : 1)

        // this.payPalConfig = {
        //     currency: 'USD',
        //     clientId: 'AUAF8NGosp8EBmrGtKo5jki_QyxrxFOdKov_2YhIILdhUo_jbLU1JLyQGMM8Yx8bpcXOsi8AX0CHrGL5',
        //     createOrderOnClient: (data) => <ICreateOrderRequest>{
        //         intent: 'CAPTURE',
        //         purchase_units: [
        //             {
        //                 amount: {
        //                     currency_code: 'USD',
        //                     value: totalAmount.toString(),
        //                     breakdown: {
        //                         item_total: {
        //                             currency_code: 'USD',
        //                             value: totalAmount.toString()
        //                         }
        //                     }
        //                 },
        //                 items: [
        //                     {
        //                         name: plan.Name,
        //                         quantity: '1',
        //                         category: 'DIGITAL_GOODS',
        //                         unit_amount: {
        //                             currency_code: 'USD',
        //                             value: totalAmount.toString(),
        //                         },
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     advanced: {
        //         commit: 'true'
        //     },
        //     style: {
        //         label: 'paypal',
        //         layout: 'vertical'
        //     },
        //     onApprove: (data, actions) => {
        //         console.log('onApprove - transaction was approved, but not authorized', data, actions);
        //         actions.order.get().then(details => {
        //             this.companyPlan = {
        //                 ModifiedBy: this.currentLoginUser.UserId,
        //                 AmountPerUser: plan.AmountPerUser,
        //                 CompanyId: this.currentLoginUser.CompanyId,
        //                 CreatedBy: this.currentLoginUser.UserId,
        //                 NoOfUsers: this.noOfUser,
        //                 PayType: this.payType,
        //                 PaymentId: details.id,
        //                 PlanId: plan.PlanId,
        //                 TotalAmount: totalAmount,
        //             } as CompanyPlan;

        //             if (this.currentPlan) {
        //                 this.companyPlan.CompanyPlanId = this.currentPlan.CompanyPlanId;
        //                 this.companyPlanService.UpdateCompanyPlan(this.companyPlan).subscribe((res) => {
        //                     this.GetCompanyPlan();
        //                     this.alertService.success("Plan purchase successfully");
        //                 });
        //             } else {
        //                 this.companyPlanService.BuyCompanyPlan(this.companyPlan).subscribe((res) => {
        //                     this.GetCompanyPlan();
        //                     this.alertService.error("Something went wrong!");
        //                 });
        //             }
        //             //console.log('onApprove - you can get full order details inside onApprove: ', details);
        //         });
        //     },
        //     onClientAuthorization: (data) => {
        //         console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        //         //this.showSuccess = true;
        //     },
        //     onCancel: (data, actions) => {
        //         console.log('OnCancel', data, actions);
        //     },
        //     onError: err => {
        //         console.log('OnError', err);
        //         this.alertService.error("Something went wrong!");
        //     },
        //     onClick: (data, actions) => {
        //         console.log('onClick', data, actions);
        //     },
        // };        
    }

    // setAndGetPayPalConfig(plan: any) {
    //     let totalAmount = plan.AmountPerUser * this.noOfUser * (this.payType == "Annually" ? 12 : 1)

    //     let payPalConfig = {
    //         currency: 'USD',
    //         clientId: 'AUAF8NGosp8EBmrGtKo5jki_QyxrxFOdKov_2YhIILdhUo_jbLU1JLyQGMM8Yx8bpcXOsi8AX0CHrGL5',
    //         createOrderOnClient: (data) => <ICreateOrderRequest>{
    //             intent: 'CAPTURE',
    //             purchase_units: [
    //                 {
    //                     amount: {
    //                         currency_code: 'USD',
    //                         value: totalAmount.toString(),
    //                         breakdown: {
    //                             item_total: {
    //                                 currency_code: 'USD',
    //                                 value: totalAmount.toString()
    //                             }
    //                         }
    //                     },
    //                     items: [
    //                         {
    //                             name: plan.Name,
    //                             quantity: '1',
    //                             category: 'DIGITAL_GOODS',
    //                             unit_amount: {
    //                                 currency_code: 'USD',
    //                                 value: totalAmount.toString(),
    //                             },
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         advanced: {
    //             commit: 'true'
    //         },
    //         style: {
    //             label: 'paypal',
    //             layout: 'horizontal'
    //         },
    //         onApprove: (data, actions) => {
    //             console.log('onApprove - transaction was approved, but not authorized', data, actions);
    //             actions.order.get().then(details => {
    //                 this.companyPlan = {
    //                     ModifiedBy: this.currentLoginUser.UserId,
    //                     AmountPerUser: plan.AmountPerUser,
    //                     CompanyId: this.currentLoginUser.CompanyId,
    //                     CreatedBy: this.currentLoginUser.UserId,
    //                     NoOfUsers: this.noOfUser,
    //                     PayType: this.payType,
    //                     PaymentId: details.id,
    //                     PlanId: plan.PlanId,
    //                     TotalAmount: totalAmount,
    //                 } as CompanyPlan;

    //                 if (this.currentPlan) {
    //                     this.companyPlan.CompanyPlanId = this.currentPlan.CompanyPlanId;
    //                     this.companyPlanService.UpdateCompanyPlan(this.companyPlan).subscribe((res) => {
    //                         this.GetCompanyPlan();
    //                         this.alertService.success("Plan purchase successfully");
    //                     });
    //                 } else {
    //                     this.companyPlanService.BuyCompanyPlan(this.companyPlan).subscribe((res) => {
    //                         this.GetCompanyPlan();
    //                         this.alertService.error("Something went wrong!");
    //                     });
    //                 }
    //                 //console.log('onApprove - you can get full order details inside onApprove: ', details);
    //             });
    //         },
    //         onClientAuthorization: (data) => {
    //             console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    //             //this.showSuccess = true;
    //         },
    //         onCancel: (data, actions) => {
    //             console.log('OnCancel', data, actions);
    //         },
    //         onError: err => {
    //             console.log('OnError', err);
    //             this.alertService.error("Something went wrong!");
    //         },
    //         onClick: (data, actions) => {
    //             console.log('onClick', data, actions);
    //         },
    //     };

    //     return payPalConfig;
    // }
}
