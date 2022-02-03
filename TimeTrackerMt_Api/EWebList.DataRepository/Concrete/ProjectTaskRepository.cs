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
   public class ProjectTaskRepository : IProjectTaskRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;

        public ProjectTaskRepository(IConfiguration configuration, IGeneralGenericFunction generalGenericFunction)
        {
            _configuration = configuration;
            _generalGenericFunction = generalGenericFunction;
        }

        public IConfiguration _configuration { get; }

        public ProjectTask InsertTask(ProjectTask Details)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Name", Details.Name);
                parameters.Add("@ProjectId", Details.ProjectId);
                parameters.Add("@CreatedBy", Details.CreatedBy);
                parameters.Add("@StatusId", Details.StatusId);
                parameters.Add("@LoginRoleId", Details.LoginRoleId);
                parameters.Add("@LoginDepartmentId", Details.LoginDepartmentId);

                var Data = SqlMapper.Query<ProjectTask>(con, "InsertProjectTask", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (Data == null) return null;

                con.Close();
                return Data;
            }
        }

        public IEnumerable<ProjectTask> TaskDataTableList(PaginationModel paginationModel)
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
                parameters.Add("@ProjectId", paginationModel.ProjectId);
                parameters.Add("@LoginRoleId", paginationModel.LoginRoleId);

                var result = SqlMapper.Query<ProjectTask>(con, "ProjectTaskDataTableList", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public int UpdateTaskDetail(ProjectTask Details)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TaskId", Details.TaskId);
                parameters.Add("@Name", Details.Name);
                parameters.Add("@ProjectId", Details.ProjectId);
                parameters.Add("@StatusId", Details.StatusId);
                parameters.Add("@UpdatedBy", Details.CreatedBy);
                parameters.Add("@LoginRoleId", Details.LoginRoleId);
                parameters.Add("@LoginDepartmentId", Details.LoginDepartmentId);

                var result = Convert.ToInt32(con.ExecuteScalar("UpdateTaskDetails", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public ProjectTask SoftDeleteTask(ProjectTask Details)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@TaskId", Details.TaskId);
                parameters.Add("@IsDelete", Details.IsDelete);
                var result = SqlMapper.Query<ProjectTask>(con, "SoftDeleteTask", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }
    }
}
