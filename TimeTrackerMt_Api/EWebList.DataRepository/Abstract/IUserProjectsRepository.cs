using TimeTrackerMt.DataRepository.Model;
using System.Collections.Generic;

namespace TimeTrackerMt.DataRepository.Abstract
{
  public  interface IUserProjectsRepository
    {
        IEnumerable<UserProjects> GetProjectUsers(int ProjectId);

        int DeleteProjectUsers(int Id);

        bool InsertProjectWiseUsers(UserProjects Project);


        IEnumerable<UserProjects> GetUserProjects(int userId);
        IEnumerable<UserProjects> GetUserProjectswithStatus(int userId);

        IEnumerable<UserProjects> GetUserById(int? userId);
        IEnumerable<ProjectTask> GetUserProjectTask(long projectId);

        //int DeleteUserProjects(int? userId);

        //UserProjects InsertUserProject(UserProjects Project);
    }
}
