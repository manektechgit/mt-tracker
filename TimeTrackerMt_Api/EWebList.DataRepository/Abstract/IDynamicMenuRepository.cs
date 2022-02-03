using System;
using System.Collections.Generic;
using System.Text;
using TimeTrackerMt.DataRepository.Model;

namespace TimeTrackerMt.DataRepository.Abstract
{
    public interface IDynamicMenuRepository
    {
        IEnumerable<DynamicMenu> GetDynamicMenuList(DynamicMenu DynamicMenu);
    }
}
