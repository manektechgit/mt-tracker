using System.Collections.Generic;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.Common;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Concrete
{
    public class AttandanceLogBusiness : IAttandanceLogBusiness
    {
        private readonly IAttandanceLogRepository _attandanceLogRepository;
        private readonly Email _email;

        public AttandanceLogBusiness(IAttandanceLogRepository userMasterRepository, Email email)
        {
            _attandanceLogRepository = userMasterRepository;
            _email = email;
        }

        public IEnumerable<AttandanceLog> GetUserActivityLogs(AttandanceLog model)
        {
            var result = _attandanceLogRepository.GetUserActivityLogs(model);

            return result;
        }

        public AttandanceLog InsertStartTimeLog(AttandanceLog Project)
        {
            var result = _attandanceLogRepository.InsertStartTimeLog(Project);
            return result;
        }

        public IEnumerable<AttandanceLog> GetLogDetails()
        {
            return _attandanceLogRepository.GetLogDetails();
        }

        //public AttandanceLog InsertEndTimeLog(int Id)
        //{
        //    var result = _attandanceLogRepository.InsertEndTimeLog(Id);
        //    return result;
        //}

        public AttandanceLog InsertEndTimeLog(AttandanceLog Project)
        {
            var result = _attandanceLogRepository.InsertEndTimeLog(Project);
            return result;
        }

        public AttandanceLog AddStartTime(AttandanceLog Project)
        {
            var result = _attandanceLogRepository.AddStartTime(Project);
            return result;
        }

        public IEnumerable<AttandanceLog> GetWorkingHours(int CompanyId, int UserId, string Date)
        {
            return _attandanceLogRepository.GetWorkingHours(CompanyId, UserId, Date);
        }

        public AttandanceLog OfflinneSync(AttandanceLog model)
        {
            return _attandanceLogRepository.OfflinneSync(model);
        }
    }
}