import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
const argon2 = require("argon2-browser");

export default function Home() {
  const [pass, setPass] = useState("");
  const [salt, setSalt] = useState("");
  const [result, setResult] = useState({});

  const argonization = async () => {
    argon2
      .hash({
        pass,
        salt,
      })
      .then((hash) => {
        console.log(`Encoded: ${hash.encoded}`);
        console.log(`Hex: ${hash.hashHex}`);
        setResult(hash);
      })
      .catch((e) => {
        setResult(e);
        console.error("Error: ", e);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App with Argon2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js</a> with Argon2!
        </h1>
        <div className={styles.grid}>
          <input
            value={pass}
            placeholder="pass"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
        <div className={styles.grid}>
          <input
            value={salt}
            placeholder="salt"
            onChange={(e) => {
              setSalt(e.target.value);
            }}
          />
        </div>
        <div className={styles.grid}>
          <button onClick={argonization}>Start Argon2</button>
        </div>
        <div
          className={styles.grid}
          style={{ border: "solid red 1px", padding: "1em" }}
        >
          <pre>Result :{JSON.stringify(result, null, 2)}</pre>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
