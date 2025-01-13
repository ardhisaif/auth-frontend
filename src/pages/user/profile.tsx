// pages/user/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from './user.module.css';

interface User {
  id: number;
  username: string;
  email: string;
}

function UserDetail() {
  const url = process.env.REACT_APP_API_URL
  console.log(url);
  
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleUpdate = () => {
    router.push(`/user/update/`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/user/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth_security: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  if (!user) {
    return <div className={styles.errorContainer}>User not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>User Details</h1>
          <p className={styles.cardDescription}>View your profile information</p>
        </div>
        
        <div className={styles.cardContent}>
          <div className={styles.detailGroup}>
            <label className={styles.label}>ID: {user.id}</label>
          </div>
          
          <div className={styles.detailGroup}>
            <label className={styles.label}>Username</label>
            <p className={styles.value}>{user.username}</p>
          </div>
          
          <div className={styles.detailGroup}>
            <label className={styles.label}>Email</label>
            <p className={styles.value}>{user.email}</p>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.buttonGroup}>
            <button onClick={handleUpdate} className={styles.updateButton}>
              Update
            </button>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;