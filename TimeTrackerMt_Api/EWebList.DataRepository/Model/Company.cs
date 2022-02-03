using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
	public class Company
	{
		public int? CompanyId { get; set; }

		public string CompanyName { get; set; }

		public int? NumberOfUser { get; set; }

		public string CompanyURL { get; set; }

		public long? CreatedBy { get; set; }

		public DateTime? CreatedDate { get; set; }

		public int? recordsTotal { get; set; }
		public bool IsActive { get; set; }
	}
}
