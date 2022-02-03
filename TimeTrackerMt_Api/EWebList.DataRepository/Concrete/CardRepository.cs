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
   public class CardRepository : ICardRepository
    {
        private readonly IGeneralGenericFunction _generalGenericFunction;

        public CardRepository(IConfiguration configuration, IGeneralGenericFunction generalGenericFunction)
        {
            _configuration = configuration;
            _generalGenericFunction = generalGenericFunction;
        }

        public IConfiguration _configuration { get; }

        public CardMaster InsertCard(CardMaster Details)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@FullName", Details.FullName);
                parameters.Add("@CompanyId", Details.CompanyId);
                parameters.Add("@CardNumber", Details.CardNumber);
                parameters.Add("@CardCVC", Details.CardCVC);
                parameters.Add("@CardExpiryDate", Details.CardExpiryDate);
                parameters.Add("@PostalCode", Details.PostalCode);
                parameters.Add("@CreatedBy", Details.CreatedBy);
                
                var Data = SqlMapper.Query<CardMaster>(con, "InsertCard", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();

                if (Data == null) return null;

                con.Close();
                return Data;
            }
        }

        public IEnumerable<CardMaster> CardDataTableList(PaginationModel paginationModel)
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

                var result = SqlMapper.Query<CardMaster>(con, "CardDataTableList", param: parameters, commandType: CommandType.StoredProcedure);
                con.Close();
                return result;
            }
        }

        public int UpdateCardDetail(CardMaster Details)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CardId", Details.CardId);
                parameters.Add("@FullName", Details.FullName);
                parameters.Add("@CardNumber", Details.CardNumber);
                parameters.Add("@CardCVC", Details.CardCVC);
                parameters.Add("@CardExpiryDate", Details.CardExpiryDate);
                parameters.Add("@PostalCode", Details.PostalCode);
                parameters.Add("@UpdatedBy", Details.CreatedBy);

                var result = Convert.ToInt32(con.ExecuteScalar("UpdateCardDetails", param: parameters, commandType: CommandType.StoredProcedure));
                con.Close();
                return result;
            }
        }

        public CardMaster SoftDeleteCard(CardMaster Details)
        {
            string connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@CardId", Details.CardId);
                parameters.Add("@IsDelete", Details.IsDelete);
                var result = SqlMapper.Query<CardMaster>(con, "SoftDeleteCard", param: parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                con.Close();
                return result;
            }
        }
    }
}
