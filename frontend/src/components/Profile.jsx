import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styles from './Profile.module.css';
import axios from 'axios';

const Profile = () => {
  const { user, logout, login } = useContext(AuthContext); // Assuming you have a login method in context
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      // Make an API request to update the password
      const response = await axios.put('/api/user/change-password', {
        userId: user.id,   // Assuming you have the user ID
        newPassword: newPassword,
      });

      if (response.status === 200) {
        setSuccess('Password changed successfully');
        setNewPassword('');
        setConfirmPassword('');
        
        // Logout the user after successful password change
        logout(); // This assumes you have a logout function that clears user data

        // Optional: Automatically login with the new password
        // login(user.email, newPassword); // You can trigger a login attempt after password change
      }
    } catch (err) {
      setError('An error occurred while updating your password.');
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h2 className={styles.profileTitle}>Profile</h2>
        <p className={styles.profileSubtitle}>Manage your account settings</p>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p className={styles.successMessage}>{success}</p>}

      <div className={styles.userInfo}>
        <div className={styles.userInfoSection}>
          <p className={styles.userLabel}>Username</p>
          <p className={styles.userValue}>{user?.username}</p>
        </div>
        <div className={styles.userInfoSection}>
          <p className={styles.userLabel}>Email</p>
          <p className={styles.userValue}>{user?.email}</p>
        </div>
      </div>
{/* 
      <div className={styles.passwordSection}>
        <h3 className={styles.sectionTitle}>Change Password</h3>
        <div className={styles.passwordWrapper}>
          <label htmlFor="newPassword" className={styles.passwordLabel}>New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.passwordInput}
          />
        </div>
        <div className={styles.passwordWrapper}>
          <label htmlFor="confirmPassword" className={styles.passwordLabel}>Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.passwordInput}
          />
        </div>
        <button onClick={handlePasswordChange} className={styles.changePasswordButton}>
          Change Password
        </button>
      </div> */}

      <div className={styles.logoutSection}>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
