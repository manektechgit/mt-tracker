using System;

namespace TimeTrackerMt.DataRepository.Model
{
	public class Department
	{
		public DateTime? CreatedDate { get; set; }
		public int DepartmentId { get; set; }

		public string DepartmentName { get; set; }

		public int? CompanyId { get; set; }

		public short? StatusId { get; set; }

		public long? CreatedBy { get; set; }
		public string CompanyName { get; set; }
		public string Status { get; set; }
		public int? recordsTotal { get; set; }
		public bool IsDelete { get; set; }

	}
}