
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new auth page
    navigate('/auth');
  }, [navigate]);

  return null;
};

export default Register;
