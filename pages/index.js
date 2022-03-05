import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import absoluteUrl from "next-absolute-url";

const Home = (langkey) => {
  const [url, setUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const checkUrl = async (e) => {
    e.preventDefault();

    const { data: short_url } = await axios.post("/api/url", { long_url: url });
    setNewUrl(`${langkey.langkey}api/${short_url.short_url}`);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Url shortener</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Url Shortener</h1>

        <form onSubmit={checkUrl}>
          <input
            type='text'
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder='Enter url to shorten'
            pattern='https://.*'
          />

          <button type='submit'>Shorten</button>
        </form>
        <div>{newUrl}</div>
      </main>
    </div>
  );
};

// Home.getInitialProps = async ({ req }) => {
//   const subdomain = req.headers.host.split(".")[0];
//   return { langkey: subdomain };
// };
Home.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}/`;
  return { langkey: apiURL };
};

export default Home;
