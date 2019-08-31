import React, { useState } from "react";
import axios from "axios";
import to from "await-to-js";

const Index = () => {
  const [tiaLink, setTiaLink] = useState("");
  const [content, setContent] = useState(null);

  const getWPContent = async post => {
    const url = `https://www.techinasia.com/wp-json/techinasia/2.0/posts/${post}`;
    const [err, res] = await to(axios.get(url));
    if (err || res.status !== 200 || !res.data.posts.length) {
      alert(`failed to get post ${post}`);
      return;
    }

    const { content, title } = res.data.posts[0];
    setContent({ __html: content, title });
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    let url;
    try {
      url = new URL(tiaLink);
    } catch (e) {
      alert(e);
      return;
    }
    // this should be already caught in URL constructor above
    if (!url || !url.pathname) {
      alert("Invalid URL");
      return;
    }
    getWPContent(url.pathname.slice(1));
  };

  return (
    <div className="index-root">
      <form onSubmit={handleSubmit}>
        <div>TIA Link Here</div>
        <input
          type="text"
          value={tiaLink}
          onChange={ev => setTiaLink(ev.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {content && (
        <article>
          <h2>{content.title}</h2>
          <div dangerouslySetInnerHTML={content} />
        </article>
      )}
      <style global jsx>
        {`
          body {
            margin: 5% auto;
            background: #f2f2f2;
            color: #444444;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 1.8;
            text-shadow: 0 1px 0 #ffffff;
            max-width: 73%;
          }
          code {
            background: white;
          }
          a {
            border-bottom: 1px solid #444444;
            color: #444444;
            text-decoration: none;
          }
          a:hover {
            border-bottom: 0;
          }
          input {
            display: block;
            width: 100%;
          }
          button {
            border: 1px solid #444444;
          }
        `}
      </style>
    </div>
  );
};

export default Index;
