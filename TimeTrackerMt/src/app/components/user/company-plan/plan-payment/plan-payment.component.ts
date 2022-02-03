import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
    AppJsPath,
} from 'src/app/_app-constants/app-constants.config';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { LoginResponseModel } from 'src/app/_models/login-response.model';
import { CompanyPlanService } from 'src/app/_services/companyplan.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { CompanyPlan } from 'src/app/_models/company-plan.model';
import { PlanPaymentService } from 'src/app/_services/planpayment.service';
import { Subscriber, Subscription } from 'rxjs';
declare var $: any;
declare var paypal;

@Component({
    selector: 'app-plan-payment',
    templateUrl: './plan-payment.component.html',
})
export class PlanPaymentComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('paypal') paypalElement: ElementRef;

    currentLoginUser: LoginResponseModel;
    @Input() noOfUser: number;
    @Input() currentPlan: any;
    @Input() payType: string;
    @Input() plan: any;
    totalAmount: number;
    pay: boolean;
    companyPlan: CompanyPlan;

    //payPalConfig?: IPayPalConfig;
    paypalConfig: any;

    noOfUserSubscript: Subscription;
    currentPlanSubscript: Subscription;
    payTypeSubscript: Subscription;

    constructor(
        private alertService: AlertService,
        private authService: AuthenticationService,
        private companyPlanService: CompanyPlanService,
        private planPaymentService: PlanPaymentService
    ) {
        this.currentLoginUser = this.authService.GetLoginUserDetail();
    }

    ngOnDestroy(): void {
        this.noOfUserSubscript.unsubscribe();
        this.currentPlanSubscript.unsubscribe();
        this.payTypeSubscript.unsubscribe();
    }

    ngAfterViewInit(): void {
        //paypal.Buttons(this.paypalConfig).render(this.paypalElement.nativeElement);
    }

    ngOnInit(): void {
        $.getScript(AppJsPath.customJs);

        this.pay = false;

        // this.noOfUser = this.planPaymentService.getNoOfUser();
        // this.currentPlan = this.planPaymentService.getCurrentPlan();
        // this.payType = this.planPaymentService.getPayType();

        //this.paymentConfig();

        this.noOfUserSubscript = this.planPaymentService.noOfUserEmitter.subscribe((data) => {
            //  this.paypalElement.nativeElement.innerHTML = '';
            this.noOfUser = data;
            //this.paymentConfig();
            //   paypal.Buttons(this.paypalConfig).render(this.paypalElement.nativeElement)
        });

        this.currentPlanSubscript = this.planPaymentService.currentPlanEmitter.subscribe((data) => {
            // this.paypalElement.nativeElement.innerHTML = '';
            this.currentPlan = data;
            //this.paymentConfig();
            // paypal.Buttons(this.paypalConfig).render(this.paypalElement.nativeElement)
        });

        this.payTypeSubscript = this.planPaymentService.payTypeEmitter.subscribe((data) => {
            //this.paypalElement.nativeElement.innerHTML = '';
            this.payType = data;
            //this.paymentConfig();
            //paypal.Buttons(this.paypalConfig).render(this.paypalElement.nativeElement)
        });

        this.planPaymentService.payClickPlanIdEmitter.subscribe((id) => {
            if (this.plan.PlanId != id) {
                this.paypalConfig = null;
                this.pay = false;
                this.paypalElement.nativeElement.innerHTML = '';
            }
        });
    }

    paymentConfig() {
        this.planPaymentService.setPayClickPlanId(this.plan.PlanId);
        if (this.currentPlan.PlanId != this.plan.PlanId) {
            this.totalAmount = this.plan.AmountPerUser * this.noOfUser * (this.payType == "Annually" ? 12 : 1)
            this.pay = true;
            this.paypalConfig = {//Configuration for paypal Smart Button
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: 'USD',
                                    value: this.totalAmount.toString(),
                                    breakdown: {
                                        item_total: {
                                            currency_code: 'USD',
                                            value: this.totalAmount.toString()
                                        }
                                    }
                                },
                                items: [
                                    {
                                        name: this.plan.Name,
                                        quantity: '1',
                                        category: 'DIGITAL_GOODS',
                                        unit_amount: {
                                            currency_code: 'USD',
                                            value: this.totalAmount.toString(),
                                        },
                                    }
                                ]
                            }
                        ]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order)
                    console.log('onApprove - transaction was approved, but not authorized', data, actions);
                    actions.order.get().then(details => {
                        this.companyPlan = {
                            ModifiedBy: this.currentLoginUser.UserId,
                            AmountPerUser: this.plan.AmountPerUser,
                            CompanyId: this.currentLoginUser.CompanyId,
                            CreatedBy: this.currentLoginUser.UserId,
                            NoOfUsers: this.noOfUser,
                            PayType: this.payType,
                            PaymentId: details.id,
                            PlanId: this.plan.PlanId,
                            TotalAmount: this.totalAmount,
                        } as CompanyPlan;

                        if (this.currentPlan) {
                            this.companyPlan.CompanyPlanId = this.currentPlan.CompanyPlanId;
                            this.companyPlanService.UpdateCompanyPlan(this.companyPlan).subscribe((res) => {
                                this.planPaymentService.setPaymentResult(true);
                                this.alertService.success("Plan purchase successfully");
                                this.pay = false;
                                this.paypalElement.nativeElement.innerHTML = '';
                            });
                        } else {
                            this.companyPlanService.BuyCompanyPlan(this.companyPlan).subscribe((res) => {
                                this.planPaymentService.setPaymentResult(true);
                                this.alertService.error("Something went wrong!");
                            });
                        }
                    });
                },
                onError: err => {
                    console.log(err)
                }
            }

            paypal.Buttons(this.paypalConfig).render(this.paypalElement.nativeElement);
        }

        // this.payPalConfig = {
        //     currency: 'USD',
        //     clientId: 'AUAF8NGosp8EBmrGtKo5jki_QyxrxFOdKov_2YhIILdhUo_jbLU1JLyQGMM8Yx8bpcXOsi8AX0CHrGL5',
        //     createOrderOnClient: (data) => <ICreateOrderRequest>{
        //         intent: 'CAPTURE',
        //         purchase_units: [
        //             {
        //                 amount: {
        //                     currency_code: 'USD',
        //                     value: this.totalAmount.toString(),
        //                     breakdown: {
        //                         item_total: {
        //                             currency_code: 'USD',
        //                             value: this.totalAmount.toString()
        //                         }
        //                     }
        //                 },
        //                 items: [
        //                     {
        //                         name: this.plan.Name,
        //                         quantity: '1',
        //                         category: 'DIGITAL_GOODS',
        //                         unit_amount: {
        //                             currency_code: 'USD',
        //                             value: this.totalAmount.toString(),
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
        //                 AmountPerUser: this.plan.AmountPerUser,
        //                 CompanyId: this.currentLoginUser.CompanyId,
        //                 CreatedBy: this.currentLoginUser.UserId,
        //                 NoOfUsers: this.noOfUser,
        //                 PayType: this.payType,
        //                 PaymentId: details.id,
        //                 PlanId: this.plan.PlanId,
        //                 TotalAmount: this.totalAmount,
        //             } as CompanyPlan;

        //             if (this.currentPlan) {
        //                 this.companyPlan.CompanyPlanId = this.currentPlan.CompanyPlanId;
        //                 this.companyPlanService.UpdateCompanyPlan(this.companyPlan).subscribe((res) => {
        //                     //this.planPaymentService.setPaymentResult(true);
        //                     this.alertService.success("Plan purchase successfully");
        //                 });
        //             } else {
        //                 this.companyPlanService.BuyCompanyPlan(this.companyPlan).subscribe((res) => {
        //                     //this.planPaymentService.setPaymentResult(true);
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
        //         //this.planPaymentService.setPaymentResult(false);
        //         this.alertService.error("Something went wrong!");
        //     },
        //     onClick: (data, actions) => {
        //         console.log('onClick', data, actions);
        //     },
        // };
    }

}
