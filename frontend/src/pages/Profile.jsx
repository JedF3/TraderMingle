// import { useEffect } from 'react';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';

// components
// import ProfileDetails from '../components/ProfileDetails';
import ProfileTabs from '../components/ProfileTabs';

const Profile = () => {
  return (
    <div className="profile">
      <div className="workout-details">
        <img
          src="https://preview.redd.it/confession-i-though-pain-was-going-to-be-revealed-as-v0-y8xbcb5tiooa1.jpg?width=640&crop=smart&auto=webp&s=f5f28b9d9cb5eff7b6368030181c2ef47be7395d"
          alt=""
        />
        <h2>Pain</h2>
        <p>@edgelord619</p>
        <h4>Meet up locations:</h4>
        <ul>
          <li>Cubao</li>
          <li>Marikina</li>
          <li>Sm North</li>
        </ul>
      </div>
      <ProfileTabs />
    </div>
  );
};

export default Profile;
