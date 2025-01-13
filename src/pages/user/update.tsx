// pages/user/update/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from './user.module.css';

interface User {
  id: number;
  username: string;
  email: string;
}

function UpdateUser() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      
      // if (!id) return;

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
        setFormData({
          username: data.data.username,
          email: data.data.email,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/user/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth_security: token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Update failed');
      }

      router.push(`/user/profile`);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  const handleCancel = () => {
    router.push(`/user`);
  };

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
          <h1 className={styles.cardTitle}>Update Profile</h1>
          <p className={styles.cardDescription}>Update your profile information</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.cardContent}>
            <div className={styles.detailGroup}>
              <label className={styles.label} htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className={styles.input}
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                required
              />
            </div>
            
            <div className={styles.detailGroup}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.updateButton}>
                Save Changes
              </button>
              <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;