import React, { useContext, useState } from 'react';
import Head from 'next/head';
import fetchSwal from '../../lib/fetchSwal';
import { UserContext } from '../../components/UserContext';
import Layout from '../../components/layout';

const ProfileSection = ({
  user: { name: initialName, bio: initialBio },
  dispatch,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const profilePictureRef = React.createRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    const formData = new FormData();
    if (profilePictureRef.current.files[0]) { formData.append('profilePicture', profilePictureRef.current.files[0]); }
    formData.append('name', name);
    formData.append('bio', bio);
    fetchSwal.patch('/api/user', formData, null, true).then(() => {
      dispatch({ type: 'fetch' });
      setIsUpdating(false);
    });
  };

  const handleSubmitPasswordChange = (event) => {
    event.preventDefault();
    fetchSwal
      .put('/api/user/password', { oldPassword, newPassword })
      .then((data) => {
        if (data.ok !== false) {
          setNewPassword('');
          setOldPassword('');
        }
      });
  };

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <section>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name
            <input
              required
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="bio">
            Bio
            <textarea
              id="bio"
              type="text"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </label>
          <label htmlFor="avatar">
            Profile picture
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              ref={profilePictureRef}
            />
          </label>
          <button disabled={isUpdating} type="submit">Save</button>
        </form>
        <form onSubmit={handleSubmitPasswordChange}>
          <label htmlFor="oldpassword">
            Old Password
            <input
              type="password"
              id="oldpassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </label>
          <label htmlFor="newpassword">
            New Password
            <input
              type="password"
              id="newpassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Change Password</button>
        </form>
      </section>
    </>
  );
};

const SettingPage = () => {
  const {
    state: { isLoggedIn, user },
    dispatch,
  } = useContext(UserContext);

  if (!isLoggedIn) {
    return (
      <Layout>
        <p>Please sign in</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>Settings</h1>
      <ProfileSection user={user} dispatch={dispatch} />
    </Layout>
  );
};

export default SettingPage;
