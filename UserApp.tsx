import React, { useState } from 'react';

export function UserApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const [preferences, setPreferences] = useState({ two_factor_auth_enabled: false });

  return (
    <div>
      <h1>User Management App</h1>

      {/* SignupForm */}

      {currentUser && (
        <>
          <h2>Welcome, {currentUser.username}!</h2>
          
          <FollowSection 
            following={following} 
            onFollow={(username) => setFollowing([...following, username])} 
          />

          {/* PreferencesSection */}

          {currentUser.admin && (
            <>{/* AdminPanel */}</>
          )}
        </>
      )}
    </div>
  );
}

function FollowSection({ following, onFollow }) {
  const [searchUsername, setSearchUsername] = useState('');

  const filteredFollowing = following.filter(user => {
    /* expensive procedure */
  });

  return (
    <div>
      <h3>Following</h3>
      <ul>
        {filteredFollowing.map(user => <li key={user}>{user}</li>)}
      </ul>
      <input
        placeholder="Username to follow"
        value={searchUsername}
        onChange={(e) => setSearchUsername(e.target.value)}
      />
      <button onClick={() => {
        onFollow(searchUsername);
        setSearchUsername('');
      }}>Follow</button>
    </div>
  );
}
