import React from 'react';

export default ({ children }) => (
  <>
    <style jsx global>
      {`
        * {
          box-sizing: border-box;
        }
        body {
          color: #4a4a4a;
          background-color: #f8f8f8;
        }
        input {
          width: 100%;
          margin-top: 1rem;
          padding: 1rem;
          border: none;
          background-color: rgba(0, 0, 0, 0.05);
        }
        button {
          color: #ecf0f1;
          margin-top: 1rem;
          background: #009688;
          border: none;
          padding: 1rem;
        }
      `}

    </style>
    { children }
  </>
);
