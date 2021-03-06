using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.DataRepository.Abstract
{
    public interface IAttandanceLogRepository
    {
        IEnumerable<AttandanceLog> GetUserActivityLogs(AttandanceLog model);

        AttandanceLog InsertStartTimeLog(AttandanceLog model);

        IEnumerable<AttandanceLog> GetLogDetails();

        //AttandanceLog InsertEndTimeLog(int Id);

        AttandanceLog InsertEndTimeLog(AttandanceLog model);

        AttandanceLog AddStartTime(AttandanceLog model);

        IEnumerable<AttandanceLog> GetWorkingHours(int CompanyId, int UserId, string Date);

        AttandanceLog OfflinneSync(AttandanceLog model);
    }
}