using System;
using System.Collections.Generic;

namespace TimeTrackerMt.DataRepository.Model
{
    public class CardMaster
    {
		public long CardId { get; set; }
		public long CompanyId { get; set; }
		public string CompanyName { get; set; }
		public string FullName { get; set; }
        public string CardNumber { get; set; }
		public string CardExpiryDate { get; set; }
		public string CardCVC { get; set; }
		public int? CountryId { get; set; }
		public string CountryName { get; set; }
		public int? StateId { get; set; }
		public string StateName { get; set; }
		public string PostalCode { get; set; }
        public long CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? recordsTotal { get; set; }
        public bool IsDelete { get; set; }
	}
}