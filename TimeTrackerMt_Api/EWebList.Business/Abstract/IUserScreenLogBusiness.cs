using System.Collections.Generic;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Abstract
{
    public interface IUserScreenLogBusiness
    {
        bool SaveScreenshot(UserScreenshot userScreenshot);

        IEnumerable<UserScreenshot> GetUserScreenShots(UserScreenShotRequestModel userScreenshot);
    }
}