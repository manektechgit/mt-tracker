using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Concrete
{
    public class ReportsBusiness : IReportsBusiness
    {
        
        private readonly IReportsRepository _reportsRepository;
        public ReportsBusiness(IReportsRepository reportsRepository)
        {
            _reportsRepository = reportsRepository;
        }
        //public IEnumerable<Reports> GetReportsList(int UserId, string fromDate, string toDate)
        //{
        //    return _reportsRepository.GetReportsList(UserId, fromDate, toDate);
        //}

        public string GetReportsList(ReportsParameters ReportsParameters)
        {
            return _reportsRepository.GetReportsList(ReportsParameters);
        }

        //public IEnumerable<Reports> GetUserList()
        //{
        //    return _reportsRepository.GetUserList();
        //}

        public IEnumerable<Reports> GetUserList(ReportsParameters ReportsParameters)
        {
            return _reportsRepository.GetUserList(ReportsParameters);
        }

        public IEnumerable<Reports> GetProjectlist(ReportsParameters ReportsParameters)
        {
            return _reportsRepository.GetProjectlist(ReportsParameters);
        }


        public IEnumerable<Reports> GetDateList(ReportsParameters ReportsParameters)
        {
            return _reportsRepository.GetDateList(ReportsParameters);
        }

       
    }
}
