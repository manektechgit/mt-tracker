using TimeTrackerMt.DataRepository.Model;
using System.Collections.Generic;

namespace TimeTrackerMt.Business.Abstract
{
    public interface IUserSettingBusiness
    {
        IEnumerable<UserSetting> GetUserSetting(long userId);

        int UpdateUserSetting(UserSetting userSetting);
    }
}