import React from 'react';
import { Post } from '../types/post';
import ContentLoader from 'react-content-loader';
import '../styles.css';

interface UserPostsProps {
  posts: Post[];
}

const UserPostsSkeleton = () => (
  <div className="user-posts">
    <h3 className="subheader">Posts</h3>
    <ContentLoader
      speed={2}
      width={800}
      height={300}
      viewBox="0 0 800 300"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="4" ry="4" width="200" height="20" />
      <rect x="0" y="30" rx="4" ry="4" width="700" height="15" />
      <rect x="0" y="55" rx="4" ry="4" width="600" height="15" />
      <rect x="0" y="90" rx="4" ry="4" width="200" height="20" />
      <rect x="0" y="120" rx="4" ry="4" width="700" height="15" />
    </ContentLoader>
  </div>
);

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return <UserPostsSkeleton />;

  return (
    <div className="user-posts">
      <h3 className="subheader">Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="post-item fade-in">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;