import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import UserPosts from '../components/UserPosts';
import { fetchUser, fetchUserPosts } from '../api/fetchData';
import { User } from '../types/user';
import { Post } from '../types/post';
import { ThreeDots } from 'react-loader-spinner';
import '../styles.css';

const DashboardLoader = () => (
  <div className="loading-spinner">
    <ThreeDots
      height="50"
      width="50"
      radius="9"
      color="#7c3aed"
      ariaLabel="three-dots-loading"
      visible={true}
    />
    <p>Loading...</p>
  </div>
);

const Dashboard: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await fetchUser(Number(userId));
        const postsData = await fetchUserPosts(Number(userId));
        setUser(userData);
        setPosts(postsData);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [userId]);

  if (loading) return <DashboardLoader />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="dashboard fade-in">
      <UserProfile user={user} />
      <UserPosts posts={posts} />
    </div>
  );
};

export default Dashboard;