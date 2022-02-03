using System.Collections.Generic;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Abstract
{
    public interface IUserScreenLogRepository
    {
        bool SaveScreenshot(UserScreenshot userScreenshot);

        IEnumerable<UserScreenshot> GetUserScreenShots(UserScreenShotRequestModel userScreenshot);
    }
}