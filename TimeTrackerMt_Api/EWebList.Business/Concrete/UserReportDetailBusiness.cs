using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Concrete
{
   public class UserReportDetailBusiness : IUserReportDetailBusiness
    {
        private readonly IUserReportDetailRepository _userReportsDetailRepository;
        public UserReportDetailBusiness(IUserReportDetailRepository userReportsDetailRepository)
        {
            _userReportsDetailRepository = userReportsDetailRepository;
        }
        public string getUserReportDetail(UserReportsParameter UserReportsParameter)
        {
            return _userReportsDetailRepository.getUserReportDetail(UserReportsParameter);
        }
    }
}
