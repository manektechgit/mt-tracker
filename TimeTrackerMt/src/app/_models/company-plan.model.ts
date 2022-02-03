export interface CompanyPlan {
    CompanyPlanId: number;
    CompanyId: number;
    PlanId: number;
    NoOfUsers: number
    PayType: string;
    AmountPerUser: number;
    TotalAmount: number;
    ExpiryDate: string;
    PaymentId: string;
    CreatedBy: number;
    ModifiedBy: number;
}