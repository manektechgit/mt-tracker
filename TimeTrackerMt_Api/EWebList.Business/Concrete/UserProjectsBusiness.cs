using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.Common;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using System.Collections.Generic;
using System;
using System.Linq;

namespace TimeTrackerMt.Business.Concrete
{
   public class UserProjectsBusiness: IUserProjectsBusiness
    {
        private readonly IUserProjectsRepository _userProjectsRepository;        
        private readonly Email _email;

        public UserProjectsBusiness(IUserProjectsRepository userMasterRepository, Email email)
        {
            _userProjectsRepository = userMasterRepository;
            _email = email;
        }


        public IEnumerable<UserProjects> GetProjectUsers(int ProjectId)
        {
            var result = _userProjectsRepository.GetProjectUsers(ProjectId);

            return result;
        }

        public int DeleteProjectUsers(int Id)
        {
            var result = _userProjectsRepository.DeleteProjectUsers(Id);

            return result;
        }

        public bool InsertProjectWiseUsers(UserProjects User)
        {
            var Projectresult = _userProjectsRepository.InsertProjectWiseUsers(User);
            if(Projectresult == true) { 
            var result = _userProjectsRepository.GetUserById(User.UserId);
            var result1 = _userProjectsRepository.GetUserProjects(Convert.ToInt32 (User.UserId));
            var Item = result.ElementAt(0); Item.ProjectName = result1.ElementAt(0).ProjectName;
              _email.ProjectMessage(Item);
            }
            return Projectresult;
        }


        public IEnumerable<UserProjects> GetUserProjects(int userId)
        {
            var result = _userProjectsRepository.GetUserProjects(userId);

            return result;
        }

        public IEnumerable<UserProjects> GetUserProjectswithStatus(int userId)
        {
            var result = _userProjectsRepository.GetUserProjectswithStatus(userId);

            return result;
        }

        public IEnumerable<ProjectTask> GetUserProjectTask(long projectId)
        {
            var result = _userProjectsRepository.GetUserProjectTask(projectId);
            return result;
        }

        //public int DeleteUserProjects (int? userId)
        //{
        //    var result = _userProjectsRepository.DeleteUserProjects(userId);

        //    return result;
        //}

        //public UserProjects InsertUserProject(UserProjects Project)
        //{
        //    var result = _userProjectsRepository.InsertUserProject(Project);
        //    return result;
        //}


    }
}
