// import { useEffect } from 'react';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';
import no_avatar from "../images/no-avatar.svg"

// components
// import ProfileDetails from '../components/ProfileDetails';
import ProfileTabs from '../components/ProfileTabs';

const Profile = () => {
  return (
    <div className="profile">
      <div className="details">
        <img
          src={no_avatar}
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
