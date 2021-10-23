import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useState } from 'react';

export default function CommentEditor({ postId }) {
  const [user] = useCurrentUser();

  const [msg, setMsg] = useState(null);

  if (!user) {
    return (
      <div style={{ color: '#555', textAlign: 'center', marginBottom: 12 }}>
        Please{' '}
        <Link href="/login">
          <a>sign in</a>
        </Link>{' '}
        to comment
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
    const res = await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg('Posted!');
      setTimeout(() => setMsg(null), 5000);
    }
  }

  return (
    <>
      <p style={{ color: '#0070f3', textAlign: 'center' }}>{msg}</p>
      <form
        onSubmit={hanldeSubmit}
        style={{ flexDirection: 'row' }}
        autoComplete="off"
      >
        <label htmlFor="name">
          <input name="content" type="text" placeholder="Comment the post" />
        </label>
        <button type="submit" style={{ marginLeft: '0.5rem' }}>
          Comment
        </button>
      </form>
    </>
  );
}
