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
    public class AttandanceLogRepository : IAttandanceLogRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;

        public AttandanceLogRepository(IConfiguration configuration, IGeneralGenericFunction generalGenericFunction)
        {
            _configuration = configuration;
            _generalGenericFunction = generalGenericFunction;
        }

        public IConfiguration _configuration { get; }

        public IEnumerable<AttandanceLog> GetUserActivityLogs(AttandanceLog model)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", model.selectedUserId);
                parameters.Add("@ProjectId", model.selectedProjectId);
                parameters.Add("@CompanyId", model.CompanyId);
                parameters.Add("@SFrom", model.fromDate);
                parameters.Add("@STo", model.toDate);
                var result = SqlMapper.Query<AttandanceLog>(con, "GetUserActivityLogs", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public AttandanceLog InsertStartTimeLog(AttandanceLog model)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@ProjectId", model.ProjectId);
                parameters.Add("@TaskId", model.TaskId);
                var Data = SqlMapper.Query<AttandanceLog>(con, "InsertStartTimeLog", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (Data == null) return null;

                con.Close();
                return Data;
            }
        }

        public IEnumerable<AttandanceLog> GetLogDetails()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                var result = SqlMapper.Query<AttandanceLog>(con, "GetLogDetails", null, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        //public AttandanceLog InsertEndTimeLog(int Id, int ProjectId)
        //{
        //    string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
        //    using (SqlConnection con = new SqlConnection(connectionString))
        //    {
        //        DynamicParameters parameters = new DynamicParameters();
        //        parameters.Add("@Id", Id);
        //        parameters.Add("@ProjectId", ProjectId);

        //        var Data = SqlMapper.Query<AttandanceLog>(con, "InsertEndTimeLog", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

        //        if (Data == null) return null;

        //        con.Close();
        //        return Data;
        //    }
        //}

        public AttandanceLog InsertEndTimeLog(AttandanceLog model)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", model.Id);
                parameters.Add("@ProjectId", model.ProjectId);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@Date", model.Date);

                var Data = SqlMapper.Query<AttandanceLog>(con, "InsertEndTimeLog", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (Data == null) return null;

                con.Close();
                return Data;
            }
        }

        public AttandanceLog AddStartTime(AttandanceLog model)
         {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", model.Id);
                parameters.Add("@ProjectId", model.ProjectId);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@Date", model.Date);
                parameters.Add("@TaskId", model.TaskId);

                var Data = SqlMapper.Query<AttandanceLog>(con, "AddStartTime", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (Data == null) return null;

                con.Close();
                return Data;
            }
        }

        public AttandanceLog OfflinneSync(AttandanceLog model)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", model.Id);
                parameters.Add("@ProjectId", model.ProjectId);
                parameters.Add("@UserId", model.UserId);
                parameters.Add("@OutTime", model.OutTime);
                parameters.Add("@InOut", model.InOutFlage);

                var Data = SqlMapper.Query<AttandanceLog>(con, "spOfflineAttendenceLog", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (Data == null) return null;

                con.Close();
                return Data;
            }
        }

        public IEnumerable<AttandanceLog> GetWorkingHours(int CompanyId, int UserId, string Date)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", CompanyId);
                parameters.Add("@UserId", UserId);
                parameters.Add("@Date", Date);
                var result = SqlMapper.Query<AttandanceLog>(con, "GetWorkingHours", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }
    }
}