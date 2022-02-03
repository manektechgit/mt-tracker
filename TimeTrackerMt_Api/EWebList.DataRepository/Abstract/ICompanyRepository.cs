using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.DataRepository.Abstract
{
    public interface ICompanyRepository
    {

        IEnumerable<Company> GetCompanypaginationDatalist(CompanyPagination CompanyPagination);
        IEnumerable<Company> GetCompanyList();

        //IEnumerable<Company> GetCompanyList(CompanyPagination CompanyPagination);
        //IEnumerable<Company> getCompanydropdown();

        Company AddCompany(Company Detail);
        Company UpdateCompany(Company Detail);
        Company ActiveDeactiveCompany(Company Detail);
        bool IsCompanyExist(string CompanyName);
    }
}
