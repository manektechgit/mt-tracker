using System.Collections.Generic;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Abstract
{
    public interface IAttendenceHourRepository
    {
        IEnumerable<AttendenceHour> GetAttendenceHourList(AttendenceHourPagination AttendenceHourPagination);

        AttendenceHour AddAttendenceHour(AttendenceHour Detail);
        AttendenceHour UpdateAttendenceHour(AttendenceHour Detail);
        AttendenceHour ActiveDeactiveAttendenceHour(AttendenceHour Detail);
    }
}
