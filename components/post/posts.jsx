import React, { useState } from "react";
import { useSWRInfinite } from "swr";
import Link from "next/link";
import { useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";
import { useCurrentUser } from "@/hooks/index";
import { defaultProfilePicture } from "@/lib/default";

function Post({ post }) {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(post.content);
  const [msg, setMsg] = useState("");
  const user = useUser(post.creatorId);
  const [currUser] = useCurrentUser();
  async function hanldeSubmit(e) {
    e.preventDefault();
    const body = {
      content: e.currentTarget.content.value,
      postId: post._id,
    };
    if (!e.currentTarget.content.value) return;
    const res = await fetch("/api/posts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg("Edited!");
      setTimeout(() => setMsg(null), 1);
      setContent(body.content);
      setEdit(false);
    } else {
      setTimeout(async () => setMsg(await res.text()), 1);
    }
  }
  return (
    <>
      <style jsx>
        {`
          div {
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
            padding: 1.5rem;
            margin-bottom: 0.5rem;
            transition: box-shadow 0.2s ease 0s;
          }
          div:hover {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }
          small {
            color: #777;
          }
        `}
      </style>
      <p style={{ color: "#0070f3", textAlign: "center" }}>{msg}</p>
      <div style={{ position: "relative" }}>
        {user && (
          <Link href={`/user/${user._id}`}>
            <a style={{ display: "inline-flex", alignItems: "center" }}>
              <img
                width="27"
                height="27"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "0.3rem",
                }}
                src={user.profilePicture || defaultProfilePicture(user._id)}
                alt={user.name}
              />
              <b>{user.name}</b>
            </a>
          </Link>
        )}
        {edit === true ? (
          <>
            <form
              onSubmit={hanldeSubmit}
              onReset={() => {
                setEdit(false);
              }}
              style={{ flexDirection: "row" }}
              autoComplete="off"
            >
              <label htmlFor="name">
                <input name="content" type="text" defaultValue={post.content} />
              </label>
              <button type="submit" style={{ marginLeft: "0.5rem" }}>
                Update
              </button>
              <button
                name="discard"
                type="reset"
                style={{
                  marginLeft: "0.5rem",
                  backgroundColor: "white",
                  border: "1px solid black",
                  color: "black",
                }}
              >
                Discard
              </button>
            </form>
          </>
        ) : (
          <p>{content}</p>
        )}
        <small>{new Date(post.createdAt).toLocaleString()}</small>
        {user?._id === currUser?._id && edit === false && (
          <button
            className="edit"
            style={{
              backgroundColor: "white",
              boxShadow: "none",
              position: "absolute",
              top: "10px",
              right: "7px",
            }}
            onClick={() => {
              setEdit(true);
            }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              height="16"
              width="16"
              className="octicon octicon-pencil"
            >
              <path
                fillRule="evenodd"
                d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </>
  );
}

const PAGE_SIZE = 10;

export function usePostPages({ creatorId } = {}) {
  return useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.posts.length === 0) return null;

      // first page, previousPageData is null
      if (index === 0) {
        return `/api/posts?limit=${PAGE_SIZE}${
          creatorId ? `&by=${creatorId}` : ""
        }`;
      }

      // using oldest posts createdAt date as cursor
      // We want to fetch posts which has a datethat is
      // before (hence the .getTime() - 1) the last post's createdAt
      const from = new Date(
        new Date(
          previousPageData.posts[previousPageData.posts.length - 1].createdAt
        ).getTime() - 1
      ).toJSON();

      return `/api/posts?from=${from}&limit=${PAGE_SIZE}${
        creatorId ? `&by=${creatorId}` : ""
      }`;
    },
    fetcher,
    {
      refreshInterval: 10000, // Refresh every 10 seconds
    }
  );
}

export default function Posts({ creatorId }) {
  const { data, error, size, setSize } = usePostPages({ creatorId });

  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0].posts?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.posts.length < PAGE_SIZE);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      {!isReachingEnd && (
        <button
          type="button"
          style={{
            background: "transparent",
            color: "#000",
          }}
          onClick={() => setSize(size + 1)}
          disabled={isReachingEnd || isLoadingMore}
        >
          {isLoadingMore ? ". . ." : "load more"}
        </button>
      )}
    </div>
  );
}
