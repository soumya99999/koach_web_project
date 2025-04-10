import React from 'react';
import { User, getInitials } from '../types/user';
import './UserProfile.css';

interface UserProfileProps {
  user: User | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) return <p>No user data available</p>;

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
