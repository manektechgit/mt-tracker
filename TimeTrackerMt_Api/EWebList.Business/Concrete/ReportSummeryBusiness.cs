using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Concrete
{
   public class ReportSummeryBusiness: IReportSummeryBusiness
    {

        private readonly IReportSummeryRepository _reportSummeryRepository;
        public ReportSummeryBusiness(IReportSummeryRepository reportSummeryRepository)
        {
            _reportSummeryRepository = reportSummeryRepository;
        }
      
        public IEnumerable<Reports> GetDateList(ReportSummery ReportsParameters)
        {
            return _reportSummeryRepository.GetDateList(ReportsParameters);
        }

        public string GetReportSummeryList(ReportSummery ReportSummery)
        {
            return _reportSummeryRepository.GetReportSummeryList(ReportSummery);
        }

    }
}
