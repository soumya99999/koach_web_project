import React from 'react';
import { Activity } from '../types/activity';

interface UserActivitiesProps {
  activities: Activity[];
}

const UserActivities: React.FC<UserActivitiesProps> = ({ activities }) => {
  return (
    <div className="user-activities">
      <h3>Recent Activities</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <strong>{activity.title}</strong>: {activity.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserActivities;