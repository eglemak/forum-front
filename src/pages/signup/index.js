import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import PageHeader from "@/components/pageHeader/PageHeader";

const SignUpPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccsess, setSuccess] = useState(false);

  const createUser = async () => {
    const response = await axios.post("http://localhost:8081/user", {
      name: name,
      email: email,
      password: password,
    });

    console.log("response", response);

    if (response.status === 200) {
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        router.push("/login");
      }, 4000);
    }
  };

  return (
    <>
      <PageHeader/>

      <div className={styles.form}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
        />

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

        <button onClick={createUser} className={styles.button}>
          Create Account
        </button>

        {isSuccsess && <div>User was created successfully</div>}
      </div>
    </>
  );
};

export default SignUpPage;
