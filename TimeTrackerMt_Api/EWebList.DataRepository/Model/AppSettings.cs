using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.Model
{
    public class AppSettings
    {
        public int? SettingId { get; set; }
        public int? CompanyId { get; set; }
        public string Parameterkey { get; set; }
        public string Value { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }

        public string DisplayName { get; set; }
        public int? recordsTotal { get; set; }


    }
}
