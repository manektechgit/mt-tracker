using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Concrete
{
    public class DynamicMenuBusiness : IDynamicMenuBusiness
    {
        private readonly IDynamicMenuRepository _dynamicMenuRepository;

        public DynamicMenuBusiness(IDynamicMenuRepository dynamicMenuRepository)
        {
            _dynamicMenuRepository = dynamicMenuRepository;
        }
        public IEnumerable<DynamicMenu> GetDynamicMenuList(DynamicMenu DynamicMenu)
        {
            return _dynamicMenuRepository.GetDynamicMenuList(DynamicMenu);
        }

    }
}
