using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Abstract
{
  public  interface IUserProjectsBusiness
    {
        IEnumerable<UserProjects> GetProjectUsers(int Id);

         int DeleteProjectUsers(int Id);

        bool InsertProjectWiseUsers(UserProjects User);
        IEnumerable<UserProjects> GetUserProjects(int userId);
        IEnumerable<UserProjects> GetUserProjectswithStatus(int userId);

        IEnumerable<ProjectTask> GetUserProjectTask(long projectId);

        // int DeleteUserProjects(int? userId);

        //  UserProjects InsertUserProject(UserProjects Project);
    }
}
