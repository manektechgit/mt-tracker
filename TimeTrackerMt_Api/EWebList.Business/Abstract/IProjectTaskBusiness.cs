using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Abstract
{
   public interface IProjectTaskBusiness
    {
        ProjectTask InsertTask(ProjectTask Details);

        IEnumerable<ProjectTask> TaskDataTableList(PaginationModel paginationModel);

        int UpdateTaskDetail(ProjectTask Details);

        ProjectTask SoftDeleteTask(ProjectTask Detail);
    }
}
