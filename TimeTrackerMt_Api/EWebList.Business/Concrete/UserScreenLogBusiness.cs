using System.Collections.Generic;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Concrete
{
    public class UserScreenLogBusiness : IUserScreenLogBusiness
    {
        private readonly IUserScreenLogRepository _userScreenLogRepository;

        public UserScreenLogBusiness(IUserScreenLogRepository userScreenLogRepository)
        {
            _userScreenLogRepository = userScreenLogRepository;
        }

        public IEnumerable<UserScreenshot> GetUserScreenShots(UserScreenShotRequestModel userScreenshot)
        {
            return _userScreenLogRepository.GetUserScreenShots(userScreenshot);
        }

        public bool SaveScreenshot(UserScreenshot userScreenshot)
        {
            return _userScreenLogRepository.SaveScreenshot(userScreenshot);
        }
    }
}