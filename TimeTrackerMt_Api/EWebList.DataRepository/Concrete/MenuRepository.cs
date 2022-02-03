using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Concrete
{
    public class MenuRepository : IMenuRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;
        public IConfiguration _configuration { get; }

        public MenuRepository(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
        }


        public IEnumerable<Menu> GetRolesList()
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();

                var result = SqlMapper.Query<Menu>(con, "SelectedRolesList", null, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public IEnumerable<Menu> GetMenuList(MenuParameters MenuParameters)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@RoleId", MenuParameters.RoleId);
                var result = SqlMapper.Query<Menu>(con, "ActiveMenuControl", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;

            }
        }


        public Menu ActiveDeactiveMenu(Menu User)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@Id", User.id);

                if (User.is_active)
                {
                    parameters.Add("@TypeStatusId", 1);
                }
                else
                {
                    parameters.Add("@TypeStatusId", 0);
                }

                var result = SqlMapper.Query<Menu>(con, "ActiveDeactiveMenu", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }



    }
}
