using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
	public class PlanMaster
	{
		public int? PlanId { get; set; }

		public string Name { get; set; }

		public int? AmountPerUser { get; set; }

		public bool IsTimeTracking { get; set; }

		public bool IsTaskAndProject { get; set; }

		public int NoOfStorageMonth { get; set; }

		public int NoOfSupportDays { get; set; }
		public int NoOfDepartmentAllowed { get; set; }
		public bool IsAllowClientAccess { get; set; }
		public bool IsDefaultPlan { get; set; }
		public bool IsActive { get; set; }

		public long? CreateBy { get; set; }
	}
}
