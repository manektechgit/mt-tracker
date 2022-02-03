using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Abstract
{
   public interface IUserReportRepository
    {
        string getUserReportsList(UserReportsParameter UserReportsParameter);      
        IEnumerable<Reports> GetUserlist(UserReportsParameter UserReportsParameter);

        string getUserReportDetail(UserReportsParameter ReportsParameters);
    }
}
