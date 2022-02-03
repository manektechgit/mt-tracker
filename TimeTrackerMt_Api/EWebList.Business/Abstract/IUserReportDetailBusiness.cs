using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Abstract
{
    public interface IUserReportDetailBusiness
    {

        string getUserReportDetail(UserReportsParameter ReportsParameters);
       
    }
}
