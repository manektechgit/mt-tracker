using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using System.Collections.Generic;

namespace TimeTrackerMt.Business.Concrete
{
    public class UserSettingBusiness : IUserSettingBusiness
    {
        private readonly IUserSettingRepository _userSettingRepository;

        public UserSettingBusiness(IUserSettingRepository userSettingRepository)
        {
            _userSettingRepository = userSettingRepository;
        }

        public IEnumerable<UserSetting> GetUserSetting(long userId)
        {
            return _userSettingRepository.GetUserSetting(userId);
        }

        public int UpdateUserSetting(UserSetting userSetting)
        {
            return _userSettingRepository.UpdateUserSetting(userSetting);
        }
    }
}