import React from 'react';
import Layout from '../components/layout';

export default function () {
  return (
    <Layout>
      <style jsx>
        {`
          h2 {
            color: #00ad9f;
          }
          p {
            color: #555;
            line-height: 2;
          }
          div {
            display: inline-block;
            padding: 1rem 2rem;
            background: #f7f7f7;
            border-radius: 8px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          }
        `}
      </style>
      <h2>A full-fledged app made with Next.JS and MongoDB.</h2>
      <p>
        <strong>nextjs-mongodb-app</strong>
        {' '}
        is a full-fledged app built with
        Next.JS and MongoDB. Most tutorials on the Internet are either
        half-baked or not production-ready.
        This project aims to fix that. This project goes even further and
        attempts to integrate top features as seen in real-life apps, making it
        a full-fledged app.
      </p>
      <div>
        <h4>
          Find it helpful? Give it a big ol&apos;
          {' '}
          <span role="img" aria-label="star">🌟</span>
          {' '}
          star.
        </h4>
        <iframe src="https://ghbtns.com/github-btn.html?user=hoangvvo&repo=nextjs-mongodb-app&type=star&count=true&size=large" title="star" frameBorder="0" scrolling="0" width="120px" height="30px" />
      </div>
    </Layout>
  );
}
