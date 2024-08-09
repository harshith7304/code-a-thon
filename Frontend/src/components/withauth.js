import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/admin/login');
      }
    }, [navigate]);

    return localStorage.getItem('user') ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;
