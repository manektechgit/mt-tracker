using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.Business.Abstract
{
    public interface IDynamicMenuBusiness
    {
        IEnumerable<DynamicMenu> GetDynamicMenuList(DynamicMenu DynamicMenu);
    }
}
