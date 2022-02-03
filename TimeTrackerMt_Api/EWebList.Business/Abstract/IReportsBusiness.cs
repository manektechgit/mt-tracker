using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Abstract
{
    public interface IReportsBusiness
    {
        //IEnumerable<Reports> GetReportsList(int UserId,string fromDate, string toDate);
        string GetReportsList(ReportsParameters ReportsParameters);

        
        //IEnumerable<Reports> GetUserList();
        IEnumerable<Reports> GetUserList(ReportsParameters ReportsParameters);
        IEnumerable<Reports> GetProjectlist(ReportsParameters ReportsParameters);
        
        //IEnumerable<Reports> GetDateList();
        IEnumerable<Reports> GetDateList(ReportsParameters ReportsParameters);

        //string GetDateList();
      
    }
}
