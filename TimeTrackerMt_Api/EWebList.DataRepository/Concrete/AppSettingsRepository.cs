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
    public class AppSettingsRepository : IAppSettingsRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;
        public IConfiguration _configuration { get; }

        public AppSettingsRepository(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
        }

        //public IEnumerable<AppSettings> GetAppSettingsList(int companyId)
        //{
        //    string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
        //    using (SqlConnection con = new SqlConnection(connectionString))
        //    {
        //        DynamicParameters parameters = new DynamicParameters();
        //        parameters.Add("@CompanyId", companyId);
        //        var result = SqlMapper.Query<AppSettings>(con, "AppSettingsControl", param: parameters, commandType: CommandType.StoredProcedure);
        //        con.Close();
        //        return result;
        //    }
        //}

        public IEnumerable<AppSettings> GetAppSettingsList(AppSettingsPagination AppSettingsPagination)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@iDisplayLength", AppSettingsPagination.DisplayLength);
                parameters.Add("@iDisplayStart", AppSettingsPagination.DisplayStart);
                parameters.Add("@sSearch", AppSettingsPagination.Search);
                parameters.Add("@iSortCol", AppSettingsPagination.SortCol);
                parameters.Add("@sSortDir", AppSettingsPagination.SortDir);
                parameters.Add("@CompanyId", AppSettingsPagination.CompanyId);
                var result = SqlMapper.Query<AppSettings>(con, "AppSettingsControl", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public AppSettings UpdateAppSettings(AppSettings User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@SettingId", User.SettingId);
                parameters.Add("@Value", User.Value);
                var UserData = SqlMapper.Query<AppSettings>(con, "UpdateAppSettings", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (UserData == null) return null;

                con.Close();
                return UserData;
            }
        }

        public AppSettings AppSettingsType(AppSettings User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Type", User.Type);
                var UserData = SqlMapper.Query<AppSettings>(con, "AppSettingsType", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return UserData;
            }
        }

        public AppSettings AppSettingsByKey(string Parameterkey, int companyId)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Parameterkey", Parameterkey);
                parameters.Add("@CompanyId", companyId);
                var result = SqlMapper.Query<AppSettings>(con, "spAppSettingsByKey", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }
    }
}