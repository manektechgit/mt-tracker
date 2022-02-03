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
    public class DynamicMenuRepository : IDynamicMenuRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;
        public IConfiguration _configuration { get; }
        public DynamicMenuRepository(IGeneralGenericFunction generalGenericFunction, IConfiguration configuration)
        {
            _generalGenericFunction = generalGenericFunction;
            _configuration = configuration;
        }

        public IEnumerable<DynamicMenu> GetDynamicMenuList(DynamicMenu DynamicMenu)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@RoleId", DynamicMenu.RoleId);
                var result = SqlMapper.Query<DynamicMenu>(con, "RoleMenuControl", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }
       
    }
}
