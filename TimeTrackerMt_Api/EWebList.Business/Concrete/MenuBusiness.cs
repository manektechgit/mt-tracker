using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using TimeTrackerMt.Business.Abstract;
using TimeTrackerMt.DataRepository.Abstract;
using TimeTrackerMt.DataRepository.Model;
using TimeTrackerMt.DataRepository.ViewModel;

namespace TimeTrackerMt.Business.Concrete
{
    public class MenuBusiness : IMenuBusiness
    {
        private readonly IMenuRepository _menuRepository;
        public MenuBusiness(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }


        public IEnumerable<Menu> GetRolesList()
        {
            return _menuRepository.GetRolesList();
        }

        public IEnumerable<Menu> GetMenuList(MenuParameters MenuParameters)
        {
            return _menuRepository.GetMenuList(MenuParameters);
        }

        public Menu ActiveDeactiveMenu(Menu Detail)
        {

            var result = _menuRepository.ActiveDeactiveMenu(Detail);

            return result;
        }

    }
}
