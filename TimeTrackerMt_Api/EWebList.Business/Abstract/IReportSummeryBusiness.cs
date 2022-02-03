using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Abstract
{
  public  interface IReportSummeryBusiness
    {
        string GetReportSummeryList(ReportSummery ReportSummery);       
        IEnumerable<Reports> GetDateList(ReportSummery ReportsParameters);
       
    }
}
