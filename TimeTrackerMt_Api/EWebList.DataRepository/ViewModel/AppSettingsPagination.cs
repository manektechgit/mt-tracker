using System;
using System.Collections.Generic;
using System.Text;

namespace TimeTrackerMt.DataRepository.ViewModel
{
    public class AppSettingsPagination
    {

        public int DisplayLength { get; set; }
        public int DisplayStart { get; set; }
        public string Search { get; set; }
        public string SortCol { get; set; }
        public string SortDir { get; set; }

        public int CompanyId { get; set; }
    }
}
