using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Concrete
{
    public class UserScreenLogRepository : IUserScreenLogRepository
    {
        public IConfiguration _configuration { get; }

        public UserScreenLogRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool SaveScreenshot(UserScreenshot userScreenshot)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userScreenshot.UserId);
                parameters.Add("@Image", userScreenshot.Image);
                parameters.Add("@ProjectId", userScreenshot.ProjectId);
                parameters.Add("@TaskId", userScreenshot.TaskId);
                var result = Convert.ToInt32(con.ExecuteScalar("AddScreenlog", param: parameters, commandType: CommandType.StoredProcedure));
                if (result <= 0) return false;
                con.Close();
                return true;
            }
        }

        public IEnumerable<UserScreenshot> GetUserScreenShots(UserScreenShotRequestModel userScreenshot)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", userScreenshot.UserId);
                parameters.Add("@ProjectId", userScreenshot.ProjectId);
                parameters.Add("@fromtime", userScreenshot.fromtime);
                parameters.Add("@totime", userScreenshot.totime);
                parameters.Add("@SDate", userScreenshot.SDate);
                var result = SqlMapper.Query<UserScreenshot>(con, "GetUserScreenShots", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }
    }
}