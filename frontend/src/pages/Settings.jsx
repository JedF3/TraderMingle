import React from 'react';

function Settings() {
  return (
    <div className="profile-tabs">
      <form>
        <h2>Edit Profile</h2>

        <div>
          <label>Profile photo</label>
          <img
            src="https://preview.redd.it/confession-i-though-pain-was-going-to-be-revealed-as-v0-y8xbcb5tiooa1.jpg?width=640&crop=smart&auto=webp&s=f5f28b9d9cb5eff7b6368030181c2ef47be7395d"
            alt=""
          />
          <p>
            Clear frontal face photos are an important way for buyers and
            sellers to learn about each other.
          </p>
          <button>Upload a photo</button>
        </div>
        <div>
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
        </div>

        <div>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            required
          />
        </div>

        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <div>
          <label for="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Mobile phone number"
          />
        </div>

        <div>
          <label for="locations">Meet up locations:</label>
          <input
            type="text"
            id="locations"
            name="locations"
            placeholder="Locations"
          />
        </div>

        <div>
          <button>Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
