import React from 'react';
import { User, getInitials } from '../types/user';
import '../styles.css';
import ContentLoader from 'react-content-loader';

interface UserProfileProps {
  user: User | null;
}

const UserProfileSkeleton = () => (
  <div className="user-profile">
    <ContentLoader
      speed={2}
      width={400}
      height={100}
      viewBox="0 0 400 100"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="20" rx="50" ry="50" width="60" height="60" />
      <rect x="80" y="20" rx="4" ry="4" width="200" height="20" />
      <rect x="80" y="50" rx="4" ry="4" width="150" height="15" />
      <rect x="80" y="75" rx="4" ry="4" width="100" height="15" />
    </ContentLoader>
  </div>
);

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) return <UserProfileSkeleton />;

  return (
    <div className="user-profile">
      <div className="avatar">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} />
        ) : (
          <span className="initials">{getInitials(user.name)}</span>
        )}
      </div>
      <div className="user-info">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
    </div>
  );
};

export default UserProfile;