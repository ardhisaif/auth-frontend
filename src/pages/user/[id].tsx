// pages/user/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from '@/components/ui/card';

interface User {
  id: number;
  username: string;
  email: string;
  // Tambahkan properti lainnya sesuai kebutuhan
}

function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      try {
        const response = await fetch(`http://localhost:3001/user/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        console.log(data.data);
        
        setUser(data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Card>
      <h1>User Details</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
    </Card>
  );
}

export default UserDetail;
