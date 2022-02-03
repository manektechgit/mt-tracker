using System.Collections.Generic;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Concrete
{
    public class AppSettingsBusiness : IAppSettingsBusiness
    {
        private readonly IAppSettingsRepository _appSettingsRepository;

        public AppSettingsBusiness(IAppSettingsRepository appSettingsRepository)
        {
            _appSettingsRepository = appSettingsRepository;
        }

        //public IEnumerable<AppSettings> GetAppSettingsList(int companyId)
        //{
        //    return _appSettingsRepository.GetAppSettingsList(companyId);
        //}

        public IEnumerable<AppSettings> GetAppSettingsList(AppSettingsPagination AppSettingsPagination)
        {
            return _appSettingsRepository.GetAppSettingsList(AppSettingsPagination);
        }


        public AppSettings UpdateAppSettings(AppSettings Detail)
        {
            var result = _appSettingsRepository.UpdateAppSettings(Detail);

            return result;
        }

        public AppSettings AppSettingsType(AppSettings Detail)
        {
            var result = _appSettingsRepository.AppSettingsType(Detail);

            return result;
        }

        public AppSettings AppSettingsByKey(string Parameterkey, int companyId)
        {
            var result = _appSettingsRepository.AppSettingsByKey(Parameterkey, companyId);
            return result;
        }
    }
}