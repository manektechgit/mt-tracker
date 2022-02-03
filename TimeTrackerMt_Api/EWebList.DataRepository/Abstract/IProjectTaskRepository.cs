using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.DataRepository.Abstract
{
  public interface IProjectTaskRepository
    {
        ProjectTask InsertTask(ProjectTask Details);

        IEnumerable<ProjectTask> TaskDataTableList(PaginationModel paginationModel);

        int UpdateTaskDetail(ProjectTask Details);

        ProjectTask SoftDeleteTask(ProjectTask Details);
    }
}
