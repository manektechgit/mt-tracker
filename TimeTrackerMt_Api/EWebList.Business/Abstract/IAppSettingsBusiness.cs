using System.Collections.Generic;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Abstract
{
    public interface IAppSettingsBusiness
    {
        //IEnumerable<AppSettings> GetAppSettingsList(int companyId);

        IEnumerable<AppSettings> GetAppSettingsList(AppSettingsPagination AppSettingsPagination);

        AppSettings UpdateAppSettings(AppSettings Detail);

        AppSettings AppSettingsType(AppSettings Detail);

        AppSettings AppSettingsByKey(string Parameterkey, int companyId);
    }
}