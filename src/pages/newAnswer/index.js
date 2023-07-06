import React, { useState } from "react";
import styles from "./styles.module.css";
import PageHeader from "../../components/pageHeader/PageHeader";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const NewAnswerPage = () => {
  const router = useRouter();
  const questionData = router.query.id;
  console.log("data", questionData);

  const [answer, setAnswer] = useState("");

  const userToken = localStorage.getItem("token");
  const headers = {
    'Authorization': userToken
  }

  const addNewAnswer = async () => {
    
    console.log(userToken);
    const response = await axios.post(`http://localhost:8081/question/${questionData}/answer`, 
        {answerText: answer},
        {headers: headers}
    );

    console.log("response", response);
    router.push(`/question/${questionData}`);
  };

  return (
    <div>
      <PageHeader/>
      <div className={styles.form}>
        <input
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Your answer"
        />

        <button onClick={() => addNewAnswer()}>Add</button>
      </div>
    </div>
  );
};

export default NewAnswerPage;
