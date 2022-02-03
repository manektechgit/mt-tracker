using TimeTrackerMt.DataRepository.Model;
using System.Collections.Generic;

namespace TimeTrackerMt.DataRepository.Abstract
{
    public interface IUserSettingRepository
    {
        IEnumerable<UserSetting> GetUserSetting(long userId);

        int UpdateUserSetting(UserSetting userSetting);
    }
}