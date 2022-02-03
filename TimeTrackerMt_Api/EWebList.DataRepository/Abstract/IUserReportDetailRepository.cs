using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.DataRepository.Abstract
{
   public interface IUserReportDetailRepository
    {
        string getUserReportDetail(UserReportsParameter ReportsParameters);
    }
}
