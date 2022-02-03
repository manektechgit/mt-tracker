using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Concrete
{
    public class CompanyBusiness : ICompanyBusiness
    {
        private readonly ICompanyRepository _companyRepository;

        public CompanyBusiness(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;
        }
        public IEnumerable<Company> GetCompanyList()
        {
            return _companyRepository.GetCompanyList();
        }

        public IEnumerable<Company> GetCompanypaginationDatalist(CompanyPagination CompanyPagination)
        {
            return _companyRepository.GetCompanypaginationDatalist(CompanyPagination);
        }

        //public IEnumerable<Company> getCompanydropdown()
        //{
        //    return _companyRepository.getCompanydropdown();
        //}
        public Company AddCompany(Company Detail)
        {

            var result = _companyRepository.AddCompany(Detail);

            return result;
        }

        public Company UpdateCompany(Company Detail)
        {

            var result = _companyRepository.UpdateCompany(Detail);

            return result;
        }

        public Company ActiveDeactiveCompany(Company Detail)
        {

            var result = _companyRepository.ActiveDeactiveCompany(Detail);

            return result;
        }

        public bool IsCompanyExist(string CompanyName)
        {
            return _companyRepository.IsCompanyExist(CompanyName);
        }
    }
}
