import React from 'react';
import { useCurrentUser } from '../../lib/hooks';
import { usePostPages } from './posts';

export default function PostEditor() {
  const [user] = useCurrentUser();
  const { revalidate } = usePostPages();

  if (!user) {
    return (
      <div style={{ color: '#555', textAlign: 'center' }}>
        Please sign in to post
      </div>
    );
  }

  async function hanldeSubmit(e) {
    e.preventDefault();
    const body = {
      content: e.currentTarget.content.value,
    };
    if (!e.currentTarget.content.value) return;
    e.currentTarget.content.value = '';
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    // revalidate the `post-pages` key in usePostPages
    revalidate();
    // Perhaps show a dialog box informing the post has been posted
  }

  return (
    <>
      <form onSubmit={hanldeSubmit} style={{ flexDirection: 'row' }} autoComplete="off">
        <label htmlFor="name">
          <input
            name="content"
            type="text"
            placeholder="Write something..."
          />
        </label>
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Post</button>
      </form>
    </>
  );
}
