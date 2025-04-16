import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiMapPin, FiPhone, FiMail, FiEdit, FiPlus, FiChevronRight, FiLock, FiPackage, FiHeart, FiCreditCard } from 'react-icons/fi';

const AccountPage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    birthday: '',
  });
  const [addresses, setAddresses] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    // Load mock data for the profile
    if (currentUser) {
      setProfile({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: '0912345678',
        gender: 'Nam',
        birthday: '1990-01-01',
      });

      // Load mock addresses
      setAddresses([
        {
          id: 1,
          name: 'Nguyễn Văn A',
          phone: '0912345678',
          address: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1',
          city: 'TP Hồ Chí Minh',
          isDefault: true,
        },
        {
          id: 2,
          name: 'Nguyễn Văn A',
          phone: '0912345678',
          address: '456 Lê Lợi, Phường Bến Thành, Quận 1',
          city: 'TP Hồ Chí Minh',
          isDefault: false,
        },
      ]);
    }
  }, [currentUser]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would call an API to update the profile
    console.log('Updated profile:', profile);
    setIsEditingProfile(false);
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold mb-4">Vui lòng đăng nhập để xem thông tin tài khoản</h2>
        <Link to="/login" className="inline-block px-4 py-2 bg-primary text-white rounded">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center space-x-3 pb-4 border-b">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="text-xl font-bold">{profile.name[0]?.toUpperCase()}</span>
              </div>
              <div>
                <h3 className="font-medium">{profile.name}</h3>
                <Link to="/account" className="text-sm text-gray-500 flex items-center">
                  <FiEdit className="mr-1" size={12} />
                  Sửa hồ sơ
                </Link>
              </div>
            </div>

            <div className="mt-4">
              <div className={`flex items-center px-3 py-2 rounded cursor-pointer ${activeTab === 'profile' ? 'text-primary bg-orange-50' : 'hover:bg-gray-100'}`} onClick={() => setActiveTab('profile')}>
                <FiUser className="mr-2" />
                <span>Thông tin tài khoản</span>
              </div>
              <div className={`flex items-center px-3 py-2 rounded cursor-pointer ${activeTab === 'address' ? 'text-primary bg-orange-50' : 'hover:bg-gray-100'}`} onClick={() => setActiveTab('address')}>
                <FiMapPin className="mr-2" />
                <span>Địa chỉ của tôi</span>
              </div>
              <Link to="/orders" className="flex items-center px-3 py-2 rounded hover:bg-gray-100">
                <FiPackage className="mr-2" />
                <span>Đơn mua</span>
              </Link>
              <div className="flex items-center px-3 py-2 rounded cursor-pointer hover:bg-gray-100">
                <FiHeart className="mr-2" />
                <span>Sản phẩm yêu thích</span>
              </div>
              <div className="flex items-center px-3 py-2 rounded cursor-pointer hover:bg-gray-100">
                <FiCreditCard className="mr-2" />
                <span>Thẻ tín dụng/Ghi nợ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg shadow">
            {activeTab === 'profile' && (
              <div>
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold">Hồ Sơ Của Tôi</h2>
                  <p className="text-sm text-gray-500">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>

                <div className="p-6">
                  <form onSubmit={handleProfileSubmit}>
                    <div className="border-b pb-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="text-right text-gray-500">Tên đăng nhập</div>
                          <div className="md:col-span-2">{profile.name}</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="text-right text-gray-500">Tên</div>
                          <div className="md:col-span-2">
                            {isEditingProfile ? (
                              <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleProfileChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                              />
                            ) : (
                              profile.name
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="text-right text-gray-500">Email</div>
                          <div className="md:col-span-2 flex items-center">
                            {profile.email}
                            <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Đã xác thực</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="text-right text-gray-500">Số điện thoại</div>
                          <div className="md:col-span-2">
                            {isEditingProfile ? (
                              <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleProfileChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                              />
                            ) : (
                              profile.phone || 'Chưa có thông tin'
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="text-right text-gray-500">Giới tính</div>
                          <div className="md:col-span-2">
                            {isEditingProfile ? (
                              <div className="flex space-x-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="gender"
                                    value="Nam"
                                    checked={profile.gender === 'Nam'}
                                    onChange={handleProfileChange}
                                    className="mr-2"
                                  />
                                  Nam
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="gender"
                                    value="Nữ"
                                    checked={profile.gender === 'Nữ'}
                                    onChange={handleProfileChange}
                                    className="mr-2"
                                  />
                                  Nữ
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="gender"
                                    value="Khác"
                                    checked={profile.gender === 'Khác'}
                                    onChange={handleProfileChange}
                                    className="mr-2"
                                  />
                                  Khác
                                </label>
                              </div>
                            ) : (
                              profile.gender || 'Chưa có thông tin'
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="text-right text-gray-500">Ngày sinh</div>
                          <div className="md:col-span-2">
                            {isEditingProfile ? (
                              <input
                                type="date"
                                name="birthday"
                                value={profile.birthday}
                                onChange={handleProfileChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                              />
                            ) : (
                              profile.birthday || 'Chưa có thông tin'
                            )}
                          </div>
                        </div>

                        {isEditingProfile && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="md:col-start-2 md:col-span-2">
                              <button
                                type="submit"
                                className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary"
                              >
                                Lưu
                              </button>
                              <button
                                type="button"
                                className="ml-2 px-6 py-2 rounded border border-gray-300 hover:bg-gray-100"
                                onClick={() => setIsEditingProfile(false)}
                              >
                                Hủy
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="md:col-span-1 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center mb-2 overflow-hidden">
                          {profile.photoURL ? (
                            <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-4xl font-bold text-gray-300">{profile.name[0]?.toUpperCase()}</span>
                          )}
                        </div>
                        <button className="text-sm text-primary border border-primary rounded px-4 py-1 hover:bg-orange-50">
                          Chọn ảnh
                        </button>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          Dụng lượng file tối đa 1 MB
                          <br />
                          Định dạng: .JPEG, .PNG
                        </p>
                      </div>
                    </div>

                    {!isEditingProfile && (
                      <div className="text-center">
                        <button
                          type="button"
                          className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary"
                          onClick={() => setIsEditingProfile(true)}
                        >
                          Sửa thông tin
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <div>
                <div className="p-4 border-b">
                  <h2 className="text-xl font-bold">Địa Chỉ Của Tôi</h2>
                </div>

                <div className="p-6">
                  <button className="w-full border border-dashed border-primary text-primary rounded-md p-4 mb-6 flex items-center justify-center hover:bg-orange-50">
                    <FiPlus className="mr-2" />
                    Thêm địa chỉ mới
                  </button>

                  {addresses.map((address) => (
                    <div key={address.id} className="border rounded-md p-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{address.name}</span>
                          <span className="text-gray-500">|</span>
                          <span className="text-gray-500 ml-2">{address.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-primary hover:underline">Sửa</button>
                          <span className="text-gray-300">|</span>
                          <button className="text-primary hover:underline">Xóa</button>
                        </div>
                      </div>
                      <div className="text-gray-600 mb-2">{address.address}</div>
                      <div className="text-gray-600 mb-2">{address.city}</div>
                      {address.isDefault && (
                        <div className="inline-block border border-red-500 text-red-500 text-xs px-2 py-1 rounded">
                          Mặc định
                        </div>
                      )}
                      {!address.isDefault && (
                        <button className="text-primary text-sm hover:underline">Thiết lập mặc định</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;