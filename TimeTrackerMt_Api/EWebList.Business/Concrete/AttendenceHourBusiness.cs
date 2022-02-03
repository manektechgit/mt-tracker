using System.Collections.Generic;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Concrete
{
    public class AttendenceHourBusiness : IAttendenceHourBusiness
    {
        private readonly IAttendenceHourRepository _attendenceHourRepository;

        public AttendenceHourBusiness(IAttendenceHourRepository attendenceHourRepository)
        {
            _attendenceHourRepository = attendenceHourRepository;
        }


        public IEnumerable<AttendenceHour> GetAttendenceHourList(AttendenceHourPagination AttendenceHourPagination)
        {
            return _attendenceHourRepository.GetAttendenceHourList(AttendenceHourPagination);
        }

        public AttendenceHour AddAttendenceHour(AttendenceHour Detail)
        {

            var result = _attendenceHourRepository.AddAttendenceHour(Detail);

            return result;
        }
        public AttendenceHour UpdateAttendenceHour(AttendenceHour Detail)
        {
            var result = _attendenceHourRepository.UpdateAttendenceHour(Detail);

            return result;
        }

        public AttendenceHour ActiveDeactiveAttendenceHour(AttendenceHour Detail)
        {

            var result = _attendenceHourRepository.ActiveDeactiveAttendenceHour(Detail);

            return result;
        }
    }
}
