using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Concrete
{
    public class AppSettingBusiness : IAppSettingBusiness
    {
        private readonly IAppSettingRepository _appSettingRepository;

        public AppSettingBusiness(IAppSettingRepository appSettingRepository)
        {
            _appSettingRepository = appSettingRepository;
        }
        //public IEnumerable<AppSetting> GetAppSettingList()
        //{
        //    return _appSettingRepository.GetAppSettingList();
        //}

        public IEnumerable<AppSetting> GetAppSettingList(AppSettingPagination AppSettingPagination)
        {
            return _appSettingRepository.GetAppSettingList(AppSettingPagination);
        }

        public AppSetting AddAppSetting(AppSetting Detail)
        {

            var result = _appSettingRepository.AddAppSetting(Detail);

            return result;
        }

        public AppSetting UpdateAppSetting(AppSetting Detail)
        {

            var result = _appSettingRepository.UpdateAppSetting(Detail);

            return result;
        }

        

        public AppSetting AppSettingCategory(AppSetting Detail)
        {

            var result = _appSettingRepository.AppSettingCategory(Detail);

            return result;
        }



    }
}
