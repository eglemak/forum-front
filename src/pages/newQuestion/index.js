import React, { useState } from "react";
import styles from "./styles.module.css";
import PageHeader from "../../components/pageHeader/PageHeader";
import axios from "axios";
import { useRouter } from "next/router";
import PageFooter from "../../components/pageFooter/PageFooter";

const NewQuestionPage = () => {
  const router = useRouter();

  const [question, setQuestion] = useState("");

  const userToken = localStorage.getItem("token");
  const headers = {
    'Authorization': userToken
  }

  const addNewQuestion = async () => {
    
    console.log(userToken);
    const response = await axios.post("http://localhost:8081/question", 
        {questionText: question},
        {headers: headers}
    );

    console.log("response", response);
    router.push("/");
  };

  return (
    <>
      <PageHeader/>
      <div className={styles.contentWrapper}>
        <div className={styles.form}>
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Your question"
          />

          <button onClick={() => addNewQuestion()}>Add</button>
        </div>
      </div>
      <PageFooter/>
    </>
  );
};

export default NewQuestionPage;
