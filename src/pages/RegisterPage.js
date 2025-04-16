import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeTos, setAgreeTos] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const navigate = useNavigate();
  const { register, currentUser } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    // Vietnam phone number validation
    // Accepts formats like: 0912345678, 84912345678, +84912345678
    const re = /^(\+84|84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    return re.test(phone);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one letter and one number
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate fullname
    if (!formData.fullname.trim()) {
      errors.fullname = 'Vui lòng nhập họ tên';
    } else if (formData.fullname.trim().length < 2) {
      errors.fullname = 'Họ tên phải có ít nhất 2 ký tự';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập email';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    // Validate password
    if (!formData.password) {
      errors.password = 'Vui lòng nhập mật khẩu';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    // Validate phone
    if (!formData.mobile.trim()) {
      errors.mobile = 'Vui lòng nhập số điện thoại';
    } else if (!validatePhone(formData.mobile)) {
      errors.mobile = 'Số điện thoại không hợp lệ';
    }
    
    // Validate terms agreement
    if (!agreeTos) {
      errors.agreeTos = 'Bạn phải đồng ý với điều khoản dịch vụ';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear the specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await register(formData);
      
      if (response.success) {
        // Registration successful
        // In a real app, you might want to send a verification email/OTP here
        // and redirect to a verification page
        
        // For this demo, we'll just redirect to the home page
        navigate('/');
      } else {
        setGeneralError(response.message || 'Đăng ký không thành công, vui lòng thử lại');
      }
    } catch (error) {
      setGeneralError('Đã xảy ra lỗi, vui lòng thử lại sau');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary">FashionStore</h2>
          <p className="mt-2 text-gray-600">Đăng ký tài khoản mới</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Fullname Field */}
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                value={formData.fullname}
                onChange={handleChange}
                className={`appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border ${
                  formErrors.fullname ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary`}
                placeholder="Nhập họ và tên"
              />
            </div>
            {formErrors.fullname && (
              <p className="mt-1 text-sm text-red-500">{formErrors.fullname}</p>
            )}
          </div>
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary`}
                placeholder="Nhập địa chỉ email"
              />
            </div>
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>
          
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-md relative block w-full pl-10 pr-10 py-3 border ${
                  formErrors.password ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary`}
                placeholder="Nhập mật khẩu"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            {formErrors.password ? (
              <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">
                Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ và số
              </p>
            )}
          </div>
          
          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none rounded-md relative block w-full pl-10 pr-10 py-3 border ${
                  formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary`}
                placeholder="Xác nhận mật khẩu"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            {formErrors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>
            )}
          </div>
          
          {/* Mobile Field */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-gray-400" />
              </div>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={handleChange}
                className={`appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border ${
                  formErrors.mobile ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary`}
                placeholder="Nhập số điện thoại"
              />
            </div>
            {formErrors.mobile ? (
              <p className="mt-1 text-sm text-red-500">{formErrors.mobile}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">
                Ví dụ: 0912345678
              </p>
            )}
          </div>
          
          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeTos"
                name="agreeTos"
                type="checkbox"
                checked={agreeTos}
                onChange={() => setAgreeTos(!agreeTos)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeTos" className="text-gray-700">
                Tôi đồng ý với <Link to="/terms" className="text-primary hover:underline">Điều khoản dịch vụ</Link> và <Link to="/privacy" className="text-primary hover:underline">Chính sách bảo mật</Link>
              </label>
              {formErrors.agreeTos && (
                <p className="mt-1 text-sm text-red-500">{formErrors.agreeTos}</p>
              )}
            </div>
          </div>
          
          {/* General Error Message */}
          {generalError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {generalError}
            </div>
          )}
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản? <Link to="/login" className="font-medium text-primary hover:underline">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;