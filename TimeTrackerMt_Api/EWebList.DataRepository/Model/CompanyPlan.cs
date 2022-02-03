using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
    public class CompanyPlan
    {
        public long CompanyPlanId { get; set; }
        public long CompanyId { get; set; }
        public string CompanyName { get; set; }
        public int PlanId { get; set; }
        public string PlanName { get; set; }
        public int NoOfUsers { get; set; }
        public string PayType { get; set; }
        public decimal AmountPerUser { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string PaymentId { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public long? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
