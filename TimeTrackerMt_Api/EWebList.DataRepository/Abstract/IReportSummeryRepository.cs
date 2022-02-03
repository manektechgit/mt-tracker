using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.DataRepository.Abstract
{
  public  interface IReportSummeryRepository
    {
        string GetReportSummeryList(ReportSummery ReportSummery);      
        IEnumerable<Reports> GetDateList(ReportSummery ReportsParameters);
    }
}
