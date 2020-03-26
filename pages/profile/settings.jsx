import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useUser } from '../../lib/hooks';

const ProfileSection = () => {
  const [user, { mutate }] = useUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const profilePictureRef = React.createRef();
  const [msg, setMsg] = useState({ message: '', isError: false });

  useEffect(() => {
    setName(user.name);
    setBio(user.bio);
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    const formData = new FormData();
    if (profilePictureRef.current.files[0]) { formData.append('profilePicture', profilePictureRef.current.files[0]); }
    formData.append('name', name);
    formData.append('bio', bio);
    const res = await fetch('/api/user', {
      method: 'PATCH',
      body: formData,
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      setMsg({ message: 'Profile updated' });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    const body = {
      oldPassword: e.currentTarget.oldPassword.value,
      newPassword: e.currentTarget.newPassword.value,
    };
    e.currentTarget.oldPassword.value = '';
    e.currentTarget.newPassword.value = '';

    const res = await fetch('/api/user/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      setMsg({ message: 'Password updated' });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  };

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <section>
        <h2>Edit Profile</h2>
        {msg.message ? <p style={{ color: msg.isError ? 'red' : '#0070f3', textAlign: 'center' }}>{msg.message}</p> : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name
            <input
              required
              id="name"
              name="name"
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
              name="bio"
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
              name="oldPassword"
              id="oldpassword"
              required
            />
          </label>
          <label htmlFor="newpassword">
            New Password
            <input
              type="password"
              name="newPassword"
              id="newpassword"
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
  const [user] = useUser();

  if (!user) {
    return (
      <>
        <p>Please sign in</p>
      </>
    );
  }
  return (
    <>
      <h1>Settings</h1>
      <ProfileSection user={user} />
    </>
  );
};

export default SettingPage;
