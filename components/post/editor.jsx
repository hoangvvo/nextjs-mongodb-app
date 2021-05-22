import React, { useState } from 'react';
import { useCurrentUser } from '@/hooks/index';

export default function PostEditor({ edit, makeEdit, text, Id }) {
  const [user] = useCurrentUser();

  const [msg, setMsg] = useState(null);

  if (!user) {
    return <div style={{ color: '#555', textAlign: 'center' }}>Please sign in to post</div>;
  }

  const discard = () => {
    makeEdit();
  };

  async function hanldeSubmit(e) {
    e.preventDefault();
    if (edit === true) {
      const body = {
        content: e.currentTarget.content.value,
        postId: Id,
      };
      // if (!e.currentTarget.content.value) return;
      const res = await fetch('/api/posts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        makeEdit('Edited!', body.content);
      } else {
        makeEdit(res.text(), text);
      }
    } else {
      const body = {
        content: e.currentTarget.content.value,
      };
      if (!e.currentTarget.content.value) return;
      e.currentTarget.content.value = '';
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setMsg('Posted!');
        setTimeout(() => setMsg(null), 5000);
      }
    }
  }

  return (
    <>
      <p style={{ color: '#0070f3', textAlign: 'center' }}>{msg}</p>
      <form
        onSubmit={hanldeSubmit}
        onReset={discard}
        style={{ flexDirection: 'row' }}
        autoComplete="off">
        <label htmlFor="name">
          {edit === true ? (
            <input name="content" type="text" placeholder={text} defaultValue={text} />
          ) : (
            <input
              name="content"
              type="text"
              placeholder="Say something, I'm giving up on you..."
            />
          )}
        </label>
        <button type="submit" style={{ marginLeft: '0.5rem' }}>
          {edit === true ? 'Update' : 'Post'}
        </button>
        {edit === true ? (
          <button
            type="reset"
            style={{
              marginLeft: '0.5rem',
              backgroundColor: 'white',
              color: 'black',
            }}>
            Discard
          </button>
        ) : null}
      </form>
    </>
  );
}
