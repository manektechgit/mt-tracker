using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Concrete
{
  public  class ProjectTaskBusiness: IProjectTaskBusiness
    {
        private readonly IProjectTaskRepository _taskRepository;

        public ProjectTaskBusiness(IProjectTaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public ProjectTask InsertTask(ProjectTask Details)
        {

            var result = _taskRepository.InsertTask(Details);

            return result;
        }

        public IEnumerable<ProjectTask> TaskDataTableList(PaginationModel paginationModel)
        {
            return _taskRepository.TaskDataTableList(paginationModel);
        }

        public int UpdateTaskDetail(ProjectTask Details)
        {

            return _taskRepository.UpdateTaskDetail(Details);
        }

        public ProjectTask SoftDeleteTask(ProjectTask Details)
        {

            var result = _taskRepository.SoftDeleteTask(Details);

            return result;
        }
    }
}
