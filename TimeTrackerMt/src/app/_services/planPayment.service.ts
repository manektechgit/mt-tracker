import { dashCaseToCamelCase } from "@angular/compiler/src/util";
import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class PlanPaymentService {
    noOfUser: number;
    currentPlan: any;
    payType: string;
    paymentResult: boolean;
    payClickPlanId: any;
    //talAmount: number;

    noOfUserEmitter = new EventEmitter<number>();
    currentPlanEmitter = new EventEmitter<any>();
    payTypeEmitter = new EventEmitter<string>();

    paymentResultEmitter = new EventEmitter<boolean>();
    payClickPlanIdEmitter = new EventEmitter<any>();

    // totalAmountEmitter = new EventEmitter<number>();

    setPayClickPlanId(id: any) {
        this.payClickPlanId = id;
        this.payClickPlanIdEmitter.emit(id);
    }

    setPaymentResult(result: boolean) {
        this.paymentResult = result;
        this.paymentResultEmitter.emit(result);
    }

    setNoOfUser(number: number) {
        this.noOfUser = number;
        this.noOfUserEmitter.emit(number);
    }

    setCurrentPlan(currentPlan: any) {
        this.currentPlan = currentPlan;
        this.currentPlanEmitter.emit(currentPlan);
    }

    setPayType(payType: string) {
        this.payType = payType;
        this.payTypeEmitter.emit(payType);
    }

    // setTotalAmount(totalAmount: number) {
    //     this.totalAmount = totalAmount;
    //     this.totalAmountEmitter.emit(totalAmount);
    // }

    getPaymentResult() {
        return this.paymentResult;
    }

    getNoOfUser() {
        return this.noOfUser;
    }

    getCurrentPlan() {
        return this.currentPlan;
    }

    getPayType() {
        return this.payType;
    }

    getPayClickPlanId() {
        this.payClickPlanId;
    }

    // getTotalAmount() {
    //     return this.totalAmount;
    // }
}
