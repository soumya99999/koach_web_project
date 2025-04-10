import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers } from '../api/fetchData';
import { User } from '../types/user';
import { getInitials } from '../types/user';
import ContentLoader from 'react-content-loader';
import '../styles.css';

const UserListSkeleton = () => (
  <div className="user-list">
    <h2>Users</h2>
    <div className="user-grid">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="user-card">
            <ContentLoader
              speed={2}
              width={250}
              height={200}
              viewBox="0 0 250 200"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="85" y="10" rx="40" ry="40" width="80" height="80" />
              <rect x="50" y="100" rx="4" ry="4" width="150" height="20" />
              <rect x="50" y="130" rx="4" ry="4" width="120" height="15" />
              <rect x="50" y="155" rx="4" ry="4" width="100" height="15" />
              <rect x="75" y="175" rx="4" ry="4" width="100" height="20" />
            </ContentLoader>
          </div>
        ))}
    </div>
  </div>
);

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (loading) return <UserListSkeleton />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="user-list">
      <h2 className="subheader">Users</h2>
      <div className="user-grid">
        {users.map((user) => (
          <div
            key={user.id}
            className="user-card fade-in"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <div className="avatar">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} />
              ) : (
                <span className="initials">{getInitials(user.name)}</span>
              )}
            </div>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>
            <button className="view-posts-btn">Posts</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;