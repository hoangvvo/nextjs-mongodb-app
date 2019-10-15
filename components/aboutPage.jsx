import React from 'react';

export default function () {
  return (
    <section>
      <style jsx>
        {`
          h2 {
            color: #00ad9f;
          }
          p {
            color: #555;
            line-height: 2;
          }
          section {
            margin-top: 14rem;
            border-top: 6px solid #00ad9f;
            background: #ffffff82;
            padding: 1rem;
          }
          iframe {
            max-width: 100%;
            border-radius: 8px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.5);
          }
        `}
      </style>
      <h2>A full-fledged app made with Next.JS and MongoDB.</h2>
      <p>
        <strong>nextjs-mongodb-app</strong>
        {' '}
        is a
        {' '}
        <em>continously developed</em>
        {' '}
        app built with Next.JS and MongoDB.
        This project goes further and attempts to integrate top features as seen in real-life apps.
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
      <br />
      <br />
      <iframe
        title="Never gonna give you up"
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </section>
  );
}
