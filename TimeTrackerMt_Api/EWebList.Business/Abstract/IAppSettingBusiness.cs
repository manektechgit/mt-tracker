using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Abstract
{

    public interface IAppSettingBusiness
    {
        //IEnumerable<AppSetting> GetAppSettingList();

        IEnumerable<AppSetting> GetAppSettingList(AppSettingPagination AppSettingPagination);

        AppSetting AddAppSetting(AppSetting Detail);
        AppSetting UpdateAppSetting(AppSetting Detail);

        AppSetting AppSettingCategory(AppSetting Detail);
    }

}
