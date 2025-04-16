import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  
  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
      }
    }
    setLoading(false);
  }, []);

  // Send OTP to email
  const sendOTP = async (email) => {
    setAuthError(null);
    try {
      // In a real app, you would call your API endpoint here
      // For now, we'll simulate the API response
      console.log(`Sending OTP to ${email}`);
      
      // Mock API call successful
      return { success: true, message: 'OTP sent successfully' };
      
    } catch (error) {
      setAuthError('Không thể gửi mã OTP. Vui lòng thử lại sau.');
      return { success: false, message: error.message };
    }
  };

  // Verify OTP
  const verifyOTP = async (email, otp) => {
    setAuthError(null);
    try {
      // In a real app, this would verify with your backend
      // For this demo, we'll simulate a successful verification
      console.log(`Verifying OTP ${otp} for ${email}`);
      
      // Mock successful verification (in production, verify with your API)
      const userData = {
        email,
        name: email.split('@')[0],
        phone: '0912345678',
        gender: 'Nam',
        birthday: '1990-01-01',
        isAuthenticated: true,
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser(userData);
      
      return { success: true };
      
    } catch (error) {
      setAuthError('Mã OTP không hợp lệ hoặc đã hết hạn.');
      return { success: false, message: error.message };
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    setAuthError(null);
    try {
      // In a real app, this would update the profile in the backend
      // For this demo, we'll just update the local state
      const updatedUser = {
        ...currentUser,
        ...profileData
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      return { success: true };
      
    } catch (error) {
      setAuthError('Không thể cập nhật thông tin. Vui lòng thử lại sau.');
      return { success: false, message: error.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    authError,
    sendOTP,
    verifyOTP,
    updateProfile,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};