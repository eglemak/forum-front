import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import PageHeader from "@/components/pageHeader/PageHeader";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccsess, setSuccess] = useState(false);

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:8081/logIn", {
        email: email,
        password: password,
      });

      console.log("response", response);
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("userId", response.data.userId);

      if (response.status === 200) {
        setSuccess(true);
  
        setTimeout(() => {
          setSuccess(false);
          router.push("/");
        }, 2000);
      }

    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <PageHeader/>
      <h3 className={styles.title}>Login</h3>

      <div className={styles.form}>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />

        <input
          // type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        <button onClick={login} className={styles.button}>
          Login
        </button>

      </div>
    </>
  );
};

export default LoginPage;
