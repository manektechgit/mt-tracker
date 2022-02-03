using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Concrete
{
  public  class ProjectBusiness: IProjectBusiness
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectBusiness(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public IEnumerable<Project> GetProjectlist()
        {
            return _projectRepository.GetProjectlist();
        }

        public IEnumerable<Project> GetProjectlistByUser(int UserId)
        {
            return _projectRepository.GetProjectlistByUser(UserId);
        }

        public Project InsertProject(Project Details)
        {

            var result = _projectRepository.InsertProject(Details);

            return result;
        }

        public IEnumerable<Project> ProjectDataTableList(PaginationModel paginationModel)
        {
            return _projectRepository.ProjectDataTableList(paginationModel);
        }


        public Project GetProjectDetailById(long ProjectId)
        {
            var result = _projectRepository.GetProjectDetailById(ProjectId);
           
            return result;
        }

        public int UpdateProjectDetail(Project Details)
        {
           
            return _projectRepository.UpdateProjectDetail(Details);
        }

        public IEnumerable<Project> GetProjectDropDownList(int CompanyId, int DepartmentId)
        {
            return _projectRepository.GetProjectDropDownList(CompanyId, DepartmentId);
        }

        public IEnumerable<Project> GetProjectsByCompanyAndDepartment(int CompanyId, string DepartmentList)
        {
            return _projectRepository.GetProjectsByCompanyAndDepartment(CompanyId, DepartmentList);
        }

        public IEnumerable<Project> GetProjectDropDownListByUserId(int UserId)
        {
            return _projectRepository.GetProjectDropDownListByUserId(UserId);
        }

        public Project SoftDeleteProject(Project Details)
        {

            var result = _projectRepository.SoftDeleteProject(Details);

            return result;
        }
    }
}
