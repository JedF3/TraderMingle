import React, { useState } from 'react';

function ProfileTabs() {
  const [toggleState, setToggleState] = useState(1); // Initialize to a default value

  function handleTabToggle(index) {
    setToggleState(index);
  }

  return (
    <div className="profile-tabs">
      <div className="header-tabs">
        <div
          onClick={() => handleTabToggle(1)}
          className={toggleState === 1 ? 'tab active' : 'tab'}
        >
          Listings
        </div>
        <div
          onClick={() => handleTabToggle(2)}
          className={toggleState === 2 ? 'tab active' : 'tab'}
        >
          Reviews
        </div>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? 'content active' : 'content'}>
          <h2>Listings</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            repudiandae itaque praesentium, minima, provident tempora quos quas
            error amet sunt corporis asperiores esse vero vitae obcaecati minus
            laudantium rerum molestiae.
          </p>
        </div>

        <div className={toggleState === 2 ? 'content active' : 'content'}>
          <h2>Reviews</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            repudiandae itaque praesentium, minima, provident tempora quos quas
            error amet sunt corporis asperiores esse vero vitae obcaecati minus
            laudantium rerum molestiae.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileTabs;


// references for creating tabs:
// logic: https://www.youtube.com/watch?v=WkREeDy2WQ4
// design: https://www.youtube.com/watch?v=6aABomFC99o
// bugfix: https://stackoverflow.com/questions/21979185/disable-text-cursor-within-a-div