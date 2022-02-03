using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Concrete
{
    public class AttendenceHourRepository : IAttendenceHourRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;
        public IConfiguration _configuration { get; }
        public AttendenceHourRepository(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
        }

        public IEnumerable<AttendenceHour> GetAttendenceHourList(AttendenceHourPagination AttendenceHourPagination)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@iDisplayLength", AttendenceHourPagination.DisplayLength);
                parameters.Add("@iDisplayStart", AttendenceHourPagination.DisplayStart);
                parameters.Add("@sSearch", AttendenceHourPagination.Search);
                parameters.Add("@iSortCol", AttendenceHourPagination.SortCol);
                parameters.Add("@sSortDir", AttendenceHourPagination.SortDir);
                parameters.Add("@CompanyId", AttendenceHourPagination.CompanyId);
                var result = SqlMapper.Query<AttendenceHour>(con, "AttendenceHourControl", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }


        public AttendenceHour AddAttendenceHour(AttendenceHour AttendenceHour)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", AttendenceHour.CompanyId);
                parameters.Add("@FullDayHours", AttendenceHour.FullDayHours);
                parameters.Add("@HalfDayHours", AttendenceHour.HalfDayHours);
                parameters.Add("@StartDate", AttendenceHour.StartDate);
                parameters.Add("@EndDate", AttendenceHour.EndDate);
                parameters.Add("@IsActive", AttendenceHour.IsActive);
                var UserData = SqlMapper.Query<AttendenceHour>(con, "AddAttendenceHour", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (UserData == null) return null;

                con.Close();
                return UserData;
            }
        }


        public AttendenceHour UpdateAttendenceHour(AttendenceHour AttendenceHour)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", AttendenceHour.Id);
                parameters.Add("@FullDayHours", AttendenceHour.FullDayHours);
                parameters.Add("@HalfDayHours", AttendenceHour.HalfDayHours);
                parameters.Add("@StartDate", AttendenceHour.StartDate);
                parameters.Add("@EndDate", AttendenceHour.EndDate);
                var result = SqlMapper.Query<AttendenceHour>(con, "UpdateAttendenceHour", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (result == null) return null;

                con.Close();
                return result;
            }
        }

        public AttendenceHour ActiveDeactiveAttendenceHour(AttendenceHour AttendenceHour)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", AttendenceHour.Id);

                if (AttendenceHour.IsActive)
                {
                    parameters.Add("@TypeStatusId", 1);
                }
                else
                {
                    parameters.Add("@TypeStatusId", 0);
                }

                var result = SqlMapper.Query<AttendenceHour>(con, "ActiveDeactiveAttendenceHour", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }
    }
}
