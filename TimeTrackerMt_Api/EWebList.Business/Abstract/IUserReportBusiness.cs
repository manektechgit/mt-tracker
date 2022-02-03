using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Abstract
{
   public interface IUserReportBusiness
    {
        
        string getUserReportsList(UserReportsParameter ReportsParameters);                   
        IEnumerable<Reports> GetUserlist(UserReportsParameter ReportsParameters);

        string getUserReportDetail(UserReportsParameter ReportsParameters);
    }
}
