using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Concrete
{
   public class UserReportBusiness: IUserReportBusiness
    {
        private readonly IUserReportRepository _userReportsRepository;
        public UserReportBusiness(IUserReportRepository userReportsRepository)
        {
            _userReportsRepository = userReportsRepository;
        }
       
        public string getUserReportsList(UserReportsParameter UserReportsParameter)
        {
            return _userReportsRepository.getUserReportsList(UserReportsParameter);
        }

        public IEnumerable<Reports> GetUserlist(UserReportsParameter UserReportsParameter)
        {
            return _userReportsRepository.GetUserlist(UserReportsParameter);
        }

        public string getUserReportDetail(UserReportsParameter UserReportsParameter)
        {
            return _userReportsRepository.getUserReportDetail(UserReportsParameter);
        }

    }
}
