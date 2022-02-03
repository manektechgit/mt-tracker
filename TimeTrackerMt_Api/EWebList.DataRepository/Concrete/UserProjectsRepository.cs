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
    public class UserProjectsRepository : IUserProjectsRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;

        public UserProjectsRepository(IConfiguration configuration, IGeneralGenericFunction generalGenericFunction)
        {
            _configuration = configuration;
            _generalGenericFunction = generalGenericFunction;
        }

        public IConfiguration _configuration { get; }

        public IEnumerable<UserProjects> GetProjectUsers(int ProjectId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", ProjectId);
                var result = SqlMapper.Query<UserProjects>(con, "GetProjectUsers", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public int DeleteProjectUsers(int Id)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", Id);
                var result = Convert.ToInt32(con.ExecuteScalar("DeleteProjectUsers", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }
        public bool InsertProjectWiseUsers(UserProjects User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", User.ProjectId);
                parameters.Add("@UserId", User.UserId);
                parameters.Add("@RoleId", User.RoleId);
                parameters.Add("@CreatedBy", User.CreatedBy);

                var result = Convert.ToBoolean(con.ExecuteScalar("InsertProjectWiseUsers", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }


        public IEnumerable<UserProjects> GetUserProjects(int UserId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                var result = SqlMapper.Query<UserProjects>(con, "GetUserProjects", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<UserProjects> GetUserProjectswithStatus(int UserId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                var result = SqlMapper.Query<UserProjects>(con, "GetUserProjectswithStatus", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<UserProjects> GetUserById(int? UserId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", UserId);
                var result = SqlMapper.Query<UserProjects>(con, "GetUserById", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        //public int DeleteUserProjects(int? UserId)
        //{
        //    string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
        //    using (SqlConnection con = new SqlConnection(connectionString))
        //    {
        //        DynamicParameters parameters = new DynamicParameters();
        //        parameters.Add("@UserId",UserId);               
        //        var result = Convert.ToInt32(con.ExecuteScalar("deleteUserProjects", param: parameters, commandType: CommandType.StoredProcedure));
        //        con.Close();
        //        return result;
        //    }
        //}
        public UserProjects InsertUserProject(UserProjects Project)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", Project.ProjectId);
                parameters.Add("@UserId", Project.UserId);
                parameters.Add("@CreatedBy", Project.CreatedBy);

                var Data = SqlMapper.Query<UserProjects>(con, "InsertUserProject", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (Data == null) return null;

                con.Close();
                return Data;
            }
        }

        public IEnumerable<ProjectTask> GetUserProjectTask(long projectId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@ProjectId", projectId);
                var result = SqlMapper.Query<ProjectTask>(con, "GetUserProjectTask", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }
    }
}
