using System.Collections.Generic;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Abstract
{
    public interface IAttendenceHourBusiness
    {
        IEnumerable<AttendenceHour> GetAttendenceHourList(AttendenceHourPagination AttendenceHourPagination);

        AttendenceHour UpdateAttendenceHour(AttendenceHour Detail);

        AttendenceHour AddAttendenceHour(AttendenceHour Detail);
        AttendenceHour ActiveDeactiveAttendenceHour(AttendenceHour Detail);

    }
   
}
