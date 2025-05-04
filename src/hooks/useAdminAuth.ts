import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export const useAdminAuth = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.user.role !== 'admin') {
          router.push('/unauthorized'); // create this page
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        router.push('/login');
      });
  }, []);

  return { loading };
};
