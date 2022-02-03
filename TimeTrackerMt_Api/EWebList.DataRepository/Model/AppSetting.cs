using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
    public class AppSetting
    {
		public int? AppSattingId { get; set; }
        public int? CompanyId { get; set; }
        public string Parameter { get; set; }
        public string ParameterValue { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public int? DisplayOrder { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? IsActive { get; set; }
        public string DisplayName { get; set; }
        public int? recordsTotal { get; set; }

    }
}
