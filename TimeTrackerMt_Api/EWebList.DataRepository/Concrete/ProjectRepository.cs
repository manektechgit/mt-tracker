using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.DataRepository.Concrete
{
   public class ProjectRepository : IProjectRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;

        public ProjectRepository(IConfiguration configuration, IGeneralGenericFunction generalGenericFunction)
        {
            _configuration = configuration;
            _generalGenericFunction = generalGenericFunction;
        }

        public IConfiguration _configuration { get; }


        public IEnumerable<Project> GetProjectlist()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<Project>(con, "ProjectControl", null, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<Project> GetProjectlistByUser(int UserId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                
                var result = SqlMapper.Query<Project>(con, "ProjectControlByUser", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public Project InsertProject(Project Details)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Name", Details.Name);
                parameters.Add("@CompanyId", Details.CompanyId);
                parameters.Add("@DepartmentId", Details.DepartmentId);
                parameters.Add("@CreatedBy", Details.CreatedBy);
                parameters.Add("@StatusId", Details.StatusId);
                parameters.Add("@LoginRoleId", Details.LoginRoleId);
                parameters.Add("@LoginDepartmentId", Details.LoginDepartmentId);

                var Data = SqlMapper.Query<Project>(con, "InsertProject", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (Data == null) return null;

                con.Close();
                return Data;
            }
        }

        public IEnumerable<Project> ProjectDataTableList(PaginationModel paginationModel)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@iDisplayLength", paginationModel.DisplayLength);
                parameters.Add("@iDisplayStart", paginationModel.DisplayStart);
                parameters.Add("@sSearch", paginationModel.Search);
                parameters.Add("@iSortCol", paginationModel.SortCol);
                parameters.Add("@sSortDir", paginationModel.SortDir);
                parameters.Add("@CompanyId", paginationModel.CompanyId);
                parameters.Add("@DepartmentId", paginationModel.DepartmentId);
                parameters.Add("@LoginRoleId", paginationModel.LoginRoleId);

                var result = SqlMapper.Query<Project>(con, "ProjectDataTableList", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public Project GetProjectDetailById(long ProjectId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", ProjectId);
                var result = SqlMapper.Query<Project>(con, "getProjectDetailById", param: parameters, commandType: CommandType.StoredProcedure).SingleOrDefault();
                con.Close();
                return result;
            }
        }

        public int UpdateProjectDetail(Project Details)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", Details.ProjectId);
                parameters.Add("@Name", Details.Name);
                parameters.Add("@CompanyId", Details.CompanyId);
                parameters.Add("@DepartmentId", Details.DepartmentId);
                parameters.Add("@StatusId", Details.StatusId);               
                parameters.Add("@UpdatedBy", Details.UpdatedBy);
                parameters.Add("@LoginRoleId", Details.LoginRoleId);
                parameters.Add("@LoginDepartmentId", Details.LoginDepartmentId);

                var result = Convert.ToInt32(con.ExecuteScalar("UpdateProjectDetails", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public IEnumerable<Project> GetProjectDropDownList(int CompanyId, int DepartmentId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();               
                parameters.Add("@CompanyId", CompanyId);
                parameters.Add("@DepartmentId", DepartmentId);
                var result = SqlMapper.Query<Project>(con, "getProjectDropdown", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<Project> GetProjectsByCompanyAndDepartment(int CompanyId, string DepartmentList)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", CompanyId);
                parameters.Add("@DepartmentList", DepartmentList);
                var result = SqlMapper.Query<Project>(con, "getProjectsByCompanyAndDepartment", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<Project> GetProjectDropDownListByUserId(int UserId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                var result = SqlMapper.Query<Project>(con, "getProjectDropdownByUserId", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public Project SoftDeleteProject(Project Details)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", Details.ProjectId);
                parameters.Add("@IsDelete", Details.IsDelete);
                var result = SqlMapper.Query<Project>(con, "SoftDeleteProject", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }


    }
}
