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
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Concrete
{
    public class AppSettingRepository : IAppSettingRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;
        public IConfiguration _configuration { get; }
        public AppSettingRepository(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
        }

        //public IEnumerable<AppSetting> GetAppSettingList()
        //{
        //    string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
        //    using (SqlConnection con = new SqlConnection(connectionString))
        //    {
        //        DynamicParameters parameters = new DynamicParameters();

        //        var result = SqlMapper.Query<AppSetting>(con, "AppSettingControl", null, commandType: CommandType.StoredProcedure);
        //        con.Close();
        //        return result;
        //    }
        //}

        public IEnumerable<AppSetting> GetAppSettingList(AppSettingPagination AppSettingPagination)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@iDisplayLength", AppSettingPagination.DisplayLength);
                parameters.Add("@iDisplayStart", AppSettingPagination.DisplayStart);
                parameters.Add("@sSearch", AppSettingPagination.Search);
                parameters.Add("@iSortCol", AppSettingPagination.SortCol);
                parameters.Add("@sSortDir", AppSettingPagination.SortDir);
                var result = SqlMapper.Query<AppSetting>(con, "AppSettingControl", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }


        public AppSetting AddAppSetting(AppSetting User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CompanyId", User.CompanyId);
                parameters.Add("@Parameter", User.Parameter);
                parameters.Add("@ParameterValue", User.ParameterValue);
                parameters.Add("@Category", User.Category);
                parameters.Add("@Description", User.Description);
                parameters.Add("@DisplayOrder", User.DisplayOrder);
                parameters.Add("@IsActive", User.IsActive);
                parameters.Add("@DisplayName", User.DisplayName);

                var UserData = SqlMapper.Query<AppSetting>(con, "AddAppSetting", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (UserData == null) return null;

                con.Close();
                return UserData;
            }
        }

        public AppSetting UpdateAppSetting(AppSetting User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@AppSattingId", User.AppSattingId);
                parameters.Add("@ParameterValue", User.ParameterValue);
                parameters.Add("@Category", User.Category);
                parameters.Add("@Description", User.Description);
                parameters.Add("@DisplayOrder", User.DisplayOrder);
                parameters.Add("@DisplayName", User.DisplayName);

                var UserData = SqlMapper.Query<AppSetting>(con, "UpdateAppSetting", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (UserData == null) return null;

                con.Close();
                return UserData;
            }
        }

        public AppSetting AppSettingCategory(AppSetting User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Category", User.Category);
                var UserData = SqlMapper.Query<AppSetting>(con, "AppSettingCategory", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return UserData;
            }
        }




    }
}
