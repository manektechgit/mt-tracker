using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Abstract
{
   public interface IProjectBusiness
    {
        IEnumerable<Project> GetProjectlist();

        IEnumerable<Project> GetProjectlistByUser(int UserId);

        Project InsertProject(Project Details);

        IEnumerable<Project> ProjectDataTableList(PaginationModel paginationModel);

        Project GetProjectDetailById(long ProjectId);

        int UpdateProjectDetail(Project Details);

        IEnumerable<Project> GetProjectDropDownList(int CompanyId, int DepartmentId);

        IEnumerable<Project> GetProjectsByCompanyAndDepartment(int CompanyId, string DepartmentList);

        IEnumerable<Project> GetProjectDropDownListByUserId(int UserId);

        Project SoftDeleteProject(Project Detail);
    }
}
