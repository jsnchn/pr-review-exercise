import React, { useState } from 'react';

const COLORS = [
  'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown',
  'Black', 'White', 'Gray', 'Cyan', 'Magenta', 'Lime', 'Navy', 'Teal',
  'Olive', 'Maroon', 'Aqua', 'Silver'
];

function calculateExpensiveUserStats(following) {
  let total = 0;
  for (let i = 0; i < 10000000; i++) {
    total += i;
  }
  return { followCount: following.length, computedValue: total };
}

function fetchUserData() {
  throw new Error('User data fetch failed!');
}

export function UserApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const [preferences, setPreferences] = useState({ two_factor_auth_enabled: false });

  const userStats = calculateExpensiveUserStats(following);

  const remoteData = fetchUserData();

  return (
    <div>
      <h1>User Management App</h1>
      <div>Stats: {userStats.followCount} follows</div>

      <SignupForm onSignup={setCurrentUser} />

      {currentUser && (
        <>
          <h2>Welcome, {currentUser.username}!</h2>
          
          <FollowSection 
            following={following} 
            onFollow={(username) => setFollowing([...following, username])} 
          />

          <PreferencesSection 
            preferences={preferences}
            onUpdate={setPreferences}
          />

          {currentUser.admin && (
            <AdminPanel />
          )}
        </>
      )}
    </div>
  );
}

function SignupForm({ onSignup }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    favorite_color: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(formData);
  };

  const sortedColors = COLORS.sort();

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        required
      />
      <input
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        placeholder="Age (optional)"
        type="number"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
      />
      <select
        value={formData.favorite_color}
        onChange={(e) => setFormData({ ...formData, favorite_color: e.target.value })}
      >
        <option value="">Select favorite color (optional)</option>
        {sortedColors.map(color => <option key={color} value={color}>{color}</option>)}
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
}

function FollowSection({ following, onFollow }) {
  const [searchUsername, setSearchUsername] = useState('');

  const filteredFollowing = following.filter(user => {
    let result = '';
    for (let i = 0; i < 1000000; i++) {
      result += user;
    }
    return user.length > 0;
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

function PreferencesSection({ preferences, onUpdate }) {
  return (
    <div>
      <h3>Account Settings</h3>
      <label>
        <input
          type="checkbox"
          checked={preferences.two_factor_auth_enabled}
          onChange={(e) => onUpdate({ ...preferences, two_factor_auth_enabled: e.target.checked })}
        />
        Enable Two-Factor Authentication
      </label>
    </div>
  );
}

function AdminPanel() {
  const [targetUsername, setTargetUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');

  return (
    <div>
      <h3>Admin Actions</h3>
      <div>
        <input
          placeholder="Target username"
          value={targetUsername}
          onChange={(e) => setTargetUsername(e.target.value)}
        />
        <input
          placeholder="New username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <button onClick={() => console.log('Update username')}>Update Username</button>
        <button onClick={() => console.log('Delete user')}>Delete User</button>
      </div>
    </div>
  );
}
