using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;


namespace TimeTrackerMt.Business.Abstract
{
    public interface IMenuBusiness
    {
        IEnumerable<Menu> GetRolesList();
        IEnumerable<Menu> GetMenuList(MenuParameters MenuParameters);
        Menu ActiveDeactiveMenu(Menu Detail);
    }
}
