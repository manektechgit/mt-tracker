using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
	public class Project
	{
		public long ProjectId { get; set; }

		public string Name { get; set; }

		public int? CompanyId { get; set; }
		public string CompanyName { get; set; }

		public int? DepartmentId { get; set; }
		public string DepartmentName { get; set; }

		public string CreatedBy { get; set; }
		public string CreatedByName { get; set; }

		public DateTime? CreatedDate { get; set; }

		public short? StatusId { get; set; }

		public string Status { get; set; }
		public long? UpdatedBy { get; set; }

		public DateTime? UpdatedDate { get; set; }
		public int? recordsTotal { get; set; }

		public bool IsDelete { get; set; }

		public int? LoginRoleId { get; set; }

		public int? LoginDepartmentId { get; set; }

	}
}
