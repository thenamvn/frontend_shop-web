import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  FiMenu, FiX, FiShoppingBag, FiGrid, FiPackage,
  FiTruck, FiUsers, FiLogOut, FiBarChart2, FiFileText,
  FiSettings, FiChevronDown, FiChevronRight, FiHome
} from 'react-icons/fi';

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    products: false,
    orders: false
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = (section) => {
    setDropdownOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      title: 'Tổng quan',
      path: '/admin/dashboard',
      icon: <FiGrid className="mr-3 h-5 w-5" />
    },
    {
      title: 'Sản phẩm',
      path: '/admin/products',
      icon: <FiPackage className="mr-3 h-5 w-5" />,
      submenu: true,
      section: 'products',
      submenuItems: [
        { title: 'Danh sách sản phẩm', path: '/admin/products' },
        { title: 'Thêm sản phẩm mới', path: '/admin/products/add' }
      ]
    },
    {
      title: 'Đơn hàng',
      path: '/admin/orders',
      icon: <FiTruck className="mr-3 h-5 w-5" />,
      submenu: true,
      section: 'orders',
      submenuItems: [
        { title: 'Tất cả đơn hàng', path: '/admin/orders' },
        { title: 'Đơn hàng mới', path: '/admin/orders?status=processing' },
        { title: 'Đơn đang giao', path: '/admin/orders?status=shipping' }
      ]
    }
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${sidebarOpen ? 'ease-out duration-300 opacity-100' : 'ease-in duration-200 opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white transition transform ${sidebarOpen ? 'ease-out duration-300 translate-x-0' : 'ease-in duration-200 -translate-x-full'}`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <FiX className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center px-4">
            <Link to="/admin/dashboard" className="flex items-center text-xl font-bold text-primary">
              <FiShoppingBag className="mr-2 h-6 w-6" />
              <span>Shop Admin</span>
            </Link>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <div key={item.title}>
                  {item.submenu ? (
                    <div>
                      <button 
                        onClick={() => toggleDropdown(item.section)}
                        className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          isActive(item.path) 
                            ? 'bg-primary text-white' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {item.icon}
                        {item.title}
                        {dropdownOpen[item.section] ? (
                          <FiChevronDown className="ml-auto h-5 w-5" />
                        ) : (
                          <FiChevronRight className="ml-auto h-5 w-5" />
                        )}
                      </button>
                      {dropdownOpen[item.section] && (
                        <div className="mt-1 pl-4 space-y-1">
                          {item.submenuItems.map((subitem) => (
                            <Link
                              key={subitem.title}
                              to={subitem.path}
                              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                location.pathname === subitem.path
                                  ? 'bg-gray-100 text-primary'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <span className="truncate">{subitem.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive(item.path)
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <Link to="/" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <FiHome className="inline-block h-9 w-9 rounded-full text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700">Về trang chủ</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white border-b border-gray-200">
              <Link to="/admin/dashboard" className="flex items-center text-xl font-bold text-primary">
                <FiShoppingBag className="mr-2 h-6 w-6" />
                <span>Shop Admin</span>
              </Link>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto bg-white">
              <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.title}>
                    {item.submenu ? (
                      <div className="space-y-1">
                        <button 
                          onClick={() => toggleDropdown(item.section)}
                          className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                            isActive(item.path) 
                              ? 'bg-primary text-white' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {item.icon}
                          {item.title}
                          {dropdownOpen[item.section] ? (
                            <FiChevronDown className="ml-auto h-5 w-5" />
                          ) : (
                            <FiChevronRight className="ml-auto h-5 w-5" />
                          )}
                        </button>
                        {dropdownOpen[item.section] && (
                          <div className="mt-1 pl-8 space-y-1">
                            {item.submenuItems.map((subitem) => (
                              <Link
                                key={subitem.title}
                                to={subitem.path}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                  location.pathname === subitem.path
                                    ? 'text-primary font-medium'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                              >
                                <span className="truncate">{subitem.title}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          isActive(item.path)
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4 bg-white">
              <Link to="/" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <FiHome className="inline-block h-9 w-9 rounded-full text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Về trang chủ
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <FiMenu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-lg font-semibold text-gray-800">
                {location.pathname.includes('/admin/dashboard') && 'Tổng quan'}
                {location.pathname.includes('/admin/products') && !location.pathname.includes('/add') && !location.pathname.includes('/edit') && 'Quản lý sản phẩm'}
                {location.pathname.includes('/admin/products/add') && 'Thêm sản phẩm mới'}
                {location.pathname.includes('/admin/products/edit') && 'Chỉnh sửa sản phẩm'}
                {location.pathname.includes('/admin/orders') && !location.pathname.includes('/admin/orders/') && 'Quản lý đơn hàng'}
                {location.pathname.match(/\/admin\/orders\/[^/]+/) && 'Chi tiết đơn hàng'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center">
                <span className="hidden md:inline-block text-sm text-gray-500 mr-2">Admin</span>
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary">
                  <span className="text-sm font-medium leading-none text-white">A</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-100">
          <div className="py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;