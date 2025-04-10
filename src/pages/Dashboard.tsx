import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import UserPosts from '../components/UserPosts';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchUser, fetchUserPosts } from '../api/fetchData';
import { User } from '../types/user';
import { Post } from '../types/post';

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

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard">
      <UserProfile user={user} />
      <UserPosts posts={posts} />
    </div>
  );
};

export default Dashboard;