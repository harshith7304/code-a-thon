// src/hooks/useLogout.js

import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return handleLogout;
};

export default useLogout;
